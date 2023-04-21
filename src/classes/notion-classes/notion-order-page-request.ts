import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import type { OrderFormInterface } from '../../interfaces/order-form';
import { NotionParent } from '@/classes/notion-classes/notion-parent';
import { NotionOrderForm } from './notion-order-form';

@JsonObject()
export class NotionOrderPageRequest {
  @JsonProperty({type: NotionParent})
  parent: NotionParent;

  @JsonProperty({
    name: 'properties', 
    type: NotionOrderForm
  })
  properties: NotionOrderForm;

  constructor(orderForm: OrderFormInterface) {
    this.parent = new NotionParent();

    let properties = new NotionOrderForm(orderForm);
    this.properties = properties;
  }
}