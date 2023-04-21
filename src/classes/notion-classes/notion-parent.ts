import { JsonObject, JsonProperty } from "typescript-json-serializer";


const notionEnvDBString = process.env.NOTION_ORDERS_DB_ID ?? '';

@JsonObject()
export class NotionParent {
  @JsonProperty()
  type: string = '';

  @JsonProperty({name: 'database_id'})
  databaseId: string = '';

  constructor();
  constructor(database_id: string, type: string)
  constructor(database_id?: string, type?: string) {
    this.type = type ?? 'database_id';
    this.databaseId = database_id ?? notionEnvDBString;
  }
}