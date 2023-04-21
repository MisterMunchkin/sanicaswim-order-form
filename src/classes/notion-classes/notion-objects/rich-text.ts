import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class TextObject {
  @JsonProperty()
  content?: string;
  link?: string;
}

@JsonObject()
export class AnnotationsObject {
  @JsonProperty()
  bold: boolean = false;

  @JsonProperty()
  italic:boolean = false;
  
  @JsonProperty({name: 'strikethrough'})
  strikethrough:boolean = false;
  
  @JsonProperty({name: 'underline'})
  underline:boolean = false;
  
  @JsonProperty()
  code:boolean = false;
  
  @JsonProperty()
  color:string = 'default';

}

@JsonObject()
export class RichTextObject {
  @JsonProperty({type: TextObject})
  text: TextObject

  @JsonProperty({type: AnnotationsObject})
  annotations: AnnotationsObject;

  @JsonProperty({name: 'plain_text'})
  plainText?: string;

  @JsonProperty()
  href?: string;

  constructor();
  constructor(textContent: string);
  constructor(textContent?: string) {
    this.text = new TextObject();
    this.annotations = new AnnotationsObject();

    this.text.content = textContent ?? undefined;
  }
}