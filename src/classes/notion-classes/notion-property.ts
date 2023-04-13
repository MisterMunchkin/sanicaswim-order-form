import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { RichTextObject } from '@/classes/notion-classes/notion-objects/rich-text';
import { StatusObject } from '@/classes/notion-classes/notion-objects/status';
import { DateObject } from '@/classes/notion-classes/notion-objects/date';

type PropertyType = 'title' |'richText' | 'status' | 'date';

@JsonObject()
export class NotionProperty {
  /* The title of the notion page, which is a rich text. */
  @JsonProperty({type: RichTextObject})
  title?: Array<RichTextObject>;

  /* an array of rich text object for general use. */
  @JsonProperty({name: 'rich_text', type:RichTextObject})
  richText?: Array<RichTextObject>;

  @JsonProperty({type: StatusObject})
  status?: StatusObject;

  @JsonProperty({name: 'phone_number'})
  phoneNumber?: string;

  @JsonProperty({type: DateObject})
  date?: DateObject;

  @JsonProperty()
  number?: number;

  @JsonProperty()
  url?: string;

  constructor(type?: PropertyType, statusName?: string, startDate?: string) {
    switch (type) {
      case 'title': {
        this.title = []
        break;
      }
      case 'richText': {
        this.richText = [];
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