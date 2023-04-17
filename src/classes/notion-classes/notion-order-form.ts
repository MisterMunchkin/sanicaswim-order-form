import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { NotionProperty } from '@/classes/notion-classes/notion-property';
import type { OrderFormInterface } from "@/interfaces/order-form";
import { RichTextObject } from '@/classes/notion-classes/notion-objects/rich-text';
import { AddressFormInterface } from "@/interfaces/address-form";

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

  @JsonProperty({name: 'Orders'})
  orders: NotionProperty;

  @JsonProperty({name: 'Shipping Details'})
  shippingDetails: NotionProperty;

  constructor(order: OrderFormInterface) {
    this.name = new NotionProperty('title');
    let nameTitle = new RichTextObject(order.fullName);
    this.name.title?.push(nameTitle);
    
    this.address = new NotionProperty('richText');
    let addressRichText = new RichTextObject(this.getAddressString(order.address));
    this.address.richText?.push(addressRichText);
    
    this.phoneNumber = new NotionProperty();
    this.phoneNumber.phoneNumber = order.phoneNumber;
    
    this.instagramLink = new NotionProperty();
    this.instagramLink.url = order.instagramLink;
    
    this.status = new NotionProperty('status');
    this.date = new NotionProperty('date');

    this.orders = new NotionProperty('richText');
    let ordersRichText = new RichTextObject(order.order);
    this.orders.richText?.push(ordersRichText);

    this.shippingDetails = new NotionProperty('richText');
    let shippingDetailsRichText = new RichTextObject(
      this.getShippingDetailsString(order.fullName, order.phoneNumber, this.getAddressString(order.address))
    );
    this.shippingDetails.richText?.push(shippingDetailsRichText);
  }

  private getAddressString(address: AddressFormInterface): string {
    let addressString = address.addressLine2 ?? '';
    addressString += address.addressLine1 + ', ' + address.barangay + ', ' + address.city + ', ' + address.province + ' ' + address.postCode;
    return addressString;
  }

  private getShippingDetailsString(name: string, contactNumber: string, address: string): string {
    return name + '\n' + contactNumber + '\n' + address;
  }
}