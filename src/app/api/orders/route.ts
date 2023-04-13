import { NextRequest, NextResponse } from "next/server";
import { notion } from "@/notion";
import { OrderFormInterface } from "@/features/order-form/order-form";
import { RouteApiError } from "@/classes/route-api-error";
import { NotionOrderPageRequest } from "@/classes/notion-classes/notion-order-page-request";
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

export async function POST(request: NextRequest) {
  debugger;
  try {
    var body: OrderFormInterface;

    body = await getJsonBody(request);
    
    const notionPageRequest = new NotionOrderPageRequest(body);

    const serialized = serializer.serializeObject(notionPageRequest);
    if (!serialized) {
      throw new RouteApiError('Error during serialization for Notion request', 'Error during serialization for Notion request', 500);
    }

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