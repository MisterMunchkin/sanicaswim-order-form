import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { NotionProperty } from '@/classes/notion-classes/notion-property';
import type { OrderFormInterface } from "@/interfaces/order-form";
import { RichTextObject } from '@/classes/notion-classes/notion-objects/rich-text';

@JsonObject()
export class NotionOrderForm {
  @JsonProperty({name: 'Name'})
  name: NotionProperty;

  @JsonProperty({name: 'Status'})
  status: NotionProperty;

  @JsonProperty({name: 'Address'})
  address: NotionProperty;

  @JsonProperty({name: 'Contact Number'})
  phoneNumber: NotionProperty;

  @JsonProperty({name: 'Date'})
  date: NotionProperty;

  @JsonProperty({name: 'Instagram Link'})
  instagramLink: NotionProperty;

  constructor(order: OrderFormInterface) {
    this.name = new NotionProperty('title');
    let nameTitle = new RichTextObject(order.fullName);
    this.name.title?.push(nameTitle);
    
    this.address = new NotionProperty('richText');
    let addressRichText = new RichTextObject(order.address);
    this.address.richText?.push(addressRichText);
    
    this.phoneNumber = new NotionProperty();
    this.phoneNumber.phoneNumber = order.phoneNumber;
    
    this.instagramLink = new NotionProperty();
    this.instagramLink.url = order.instagramLink;
    
    this.status = new NotionProperty('status');
    this.date = new NotionProperty('date');
  }
}