import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class StatusObject {
  @JsonProperty({name: 'name'})
  name: string

  constructor(statusName: string) {
    this.name = statusName;
  }
}