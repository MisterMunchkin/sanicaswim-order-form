import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class DateObject {
  @JsonProperty()
  start: string;

  @JsonProperty()
  end?: string;

  @JsonProperty({name: 'time_zone'})
  time_zone?: string;

  constructor(start: string) {
    this.start = start;
  }
}