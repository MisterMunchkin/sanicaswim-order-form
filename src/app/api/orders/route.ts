import { NextRequest, NextResponse } from "next/server";
import { notion } from "@/notion";
import { OrderFormInterface } from "@/features/order-form/order-form";
import { RouteApiError } from "@/classes/route-api-error";
import { NotionPageRequest, NotionProperty } from "@/classes/notion-classes/notion-request";
import { RichTextObject, TextObject } from "@/classes/notion-classes/notion-objects/rich-text";
import { StatusObject } from "@/classes/notion-classes/notion-objects/status";
import { DateObject } from "@/classes/notion-classes/notion-objects/date";
import { JsonSerializer } from "typescript-json-serializer";

//https://developers.notion.com/reference/property-object
//https://developers.notion.com/reference/property-value-object
//We can create a notion interface of all db properties so we can send data easier.

const database = process.env.NOTION_ORDERS_DB_ID ?? '';

const serializer = new JsonSerializer({
  additionalPropertiesPolicy: 'remove'
});

const GetErrorMessage = (error: unknown) => {
  let message = error;
  if (error instanceof Error) message = error.message;

  return String(message);
}

const GetNotionPropertiesArray = (data: OrderFormInterface): Array<NotionProperty> => {
  const propertyArray: Array<NotionProperty> = [];
  
  let titleProperty = new NotionProperty('Name', 'title');
  let title = new RichTextObject();
  title.text.content = data.fullName;
  title.text.link = data.instagramLink;
  titleProperty.title?.push(title);
  propertyArray.push(titleProperty);

  let statusProperty = new NotionProperty('Status', 'status', 'Not started');
  propertyArray.push(statusProperty);

  //future: need to concatenate multiple address fields and put into one notion property
  let addressProperty = new NotionProperty('Address', 'richText');
  let address = new RichTextObject();
  address.text.content = data.address;
  addressProperty.rich_text?.push(address);
  propertyArray.push(addressProperty);

  let contactProperty = new NotionProperty('Contact Number');
  contactProperty.phone_number = data.phoneNumber;
  propertyArray.push(contactProperty);

  let dateProperty = new NotionProperty('Date', 'date');
  propertyArray.push(dateProperty);

  let instagramLinkProperty = new NotionProperty('Instagram Link');
  instagramLinkProperty.url = data.instagramLink;
  propertyArray.push(instagramLinkProperty);

  return propertyArray;
}

export async function POST(request: NextRequest) {
  debugger;
  try {
    var body: OrderFormInterface;

    body = await getJsonBody(request);
    
    const notionProperties = GetNotionPropertiesArray(body);
    const notionPageRequest = new NotionPageRequest(
      {
        type: 'database_id',
        database_id: database
      },
      notionProperties
    );

    const serialized = serializer.serializeObject(notionPageRequest);
    if (!serialized) {
      throw new RouteApiError('Error during serialization for Notion request', 'Error during serialization for Notion request', 500);
    }

    console.log(serialized);
    const response = await notion.pages.create(serialized);

    return NextResponse.json(response, {status: 200});
  } catch (error) {
    if (error instanceof RouteApiError) return NextResponse.json({errorMessage: error.message, friendlyMessage: error.friendlyMsg, stack: error.stack}, {status: error.statusCode});
    return NextResponse.json(error, {status: 500});
  }
}

export async function GET() {
  const response = await notion.databases.retrieve({database_id: database});
  return NextResponse.json(response, {status: 200});
}

async function getJsonBody(request: NextRequest): Promise<OrderFormInterface> {
  try { //checks if request body is json valid
   let body = await request.json() as OrderFormInterface;
   return body;
  } catch (error) {
    throw new RouteApiError(GetErrorMessage(error), 'Request body must not be null', 400);
  }
}