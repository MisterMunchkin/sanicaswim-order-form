import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { RichTextObject } from './notion-objects/rich-text';
import { StatusObject } from './notion-objects/status';
import { DateObject } from './notion-objects/date';

//Converts an array of notion properties to an object of notion property object
//where key property to use to name the new notion property object.
const notionPropertyArrayToObjects = (properties: Array<NotionProperty>) => {
  interface resultObject {
    [key: string]: any;
  }
  var result: resultObject = {};
  const propertyToRemove = 'name';

  properties.forEach(value => {
    const { [propertyToRemove]: _, ...newValue} = value;
    result[value.name] = newValue;
  });

  return result;
}

@JsonObject()
export class NotionParent {
  @JsonProperty()
  type: string = '';

  @JsonProperty({name: 'database_id'})
  database_id: string = '';
}

type PropertyType = 'title' |'richText' | 'status' | 'date';

@JsonObject()
export class NotionProperty {
  @JsonProperty({name: 'title', type: RichTextObject})
  title?: Array<RichTextObject>;

  @JsonProperty({name: 'rich_text', type:RichTextObject})
  rich_text?: Array<RichTextObject>;

  @JsonProperty({type: StatusObject})
  status?: StatusObject;

  @JsonProperty({name: 'phone_number'})
  phone_number?: string;

  @JsonProperty({type: DateObject})
  date?: DateObject;

  @JsonProperty()
  number?: number;

  @JsonProperty()
  url?: string;

  name: string;

  constructor(name: string, type?: PropertyType, statusName?: string, startDate?: string) {
    this.name = name;

    switch (type) {
      case 'title': {
        this.title = []
        break;
      }
      case 'richText': {
        this.rich_text = [];
        break;
      }
      case 'status': {
        this.status = new StatusObject(statusName ?? 'Not started');
        break;
      }
      case 'date': {
        if (!startDate) {
          let dateISOString = new Date().toISOString();
          let dateISOArray = dateISOString.split('T');
          startDate = dateISOArray[0];
        }
        this.date = new DateObject(startDate);
        break;
      }
      default: break;
    }
  }
}

@JsonObject()
export class NotionPageRequest {
  @JsonProperty({type: NotionParent})
  parent: NotionParent;

  @JsonProperty({
    name: 'properties', 
    type: NotionProperty,
    beforeSerialize: notionPropertyArrayToObjects
  })
  properties: Array<NotionProperty> | {[key:string]: NotionProperty};

  constructor(parent: NotionParent, properties: Array<NotionProperty>) {
    this.parent = parent;
    this.properties = properties;
  }
}

  // const response = await notion.pages.create({
  //   "parent": {
  //     "type": "database_id",
  //     "database_id": database
  //   },
  //   "properties": {
  //     "Name": {
  //       "title": [
  //         {
  //           "text": {
  //             "content": "Danica Surima"
  //           }
  //         }
  //       ]
  //     },
  //     "Status": {
  //       "status": {
  //         "name": "Not started"
  //       }
  //     },
  //     "Address": {
  //       "rich_text": [
  //         {
  //           "text": {
  //             "content": "Concatenated address here"
  //           }
  //         }
  //       ]
  //     },
  //     "Contact Number": {
  //       "phone_number": "+63 919 001 1652"
  //     },
  //     "Date": {
  //       "date": {
  //         "start": "2023-04-06" //yyyy-mm-dd
  //       }
  //     },
  //     "Order": {
  //       "rich_text": [
  //         {
  //           "text": {
  //             "content": "concatenated order list of (qty)x (product name) - (price)\n"
  //           }
  //         }
  //       ]
  //     },
  //     "Total": {
  //       "number": 1991
  //     }
  //   }
  // });