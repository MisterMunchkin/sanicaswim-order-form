interface NotionProperty {
  name: string;
  type: "title" | "rich_text" | "number" | "select" | "multi_select" | "date" | "person" | "file" | "checkbox" | "url" | "email" | "phone_number" | "formula" | "relation" | "rollup" | "created_time" | "created_by" | "last_edited_time" | "last_edited_by";
  title?: {};
  rich_text?: {};
  number?: {
    format?: "number" | "number_with_commas" | "percent" | "dollar" | "euro" | "pound" | "yen" | "ruble" | "rupee" | "won" | "yuan" | "real" | "lira" | "rupiah" | "franc" | "hryvnia" | "shekel" | "baht" | "koruna" | "forint" | "zloty" | "lei" | "krona" | "peso" | "ringgit" | "rand" | "new_zealand_dollar" | "kuna" | "colón" | "leu" | "dirham" | "won" | "tenge" | "kyat" | "cedi" | "peso" | "cordoba" | "lempira" | "quetzal" | "balboa" | "guarani" | "taka" | "bahraini_dinar" | "boliviano" | "platinum" | "oz_troy" | "gram" | "milligram" | "kilogram" | "stone" | "pound" | "ton" | "metric_ton" | "celsius" | "fahrenheit";
  };
  select?: {
    options?: Array<{
      id: string;
      name: string;
      color?: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
    }>;
  };
  multi_select?: {
    options?: Array<{
      id: string;
      name: string;
      color?: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
    }>;
  };
  date?: {
    date?: {};
  };
  person?: {
    people?: {};
  };
  file?: {
    file?: {};
  };
  checkbox?: {
    checkbox?: {};
  };
  url?: {
    url?: {};
  };
  email?: {
    email?: {};
  };
  phone_number?: {
    phone_number?: {};
  };
  formula?: {
    formula?: {};
  };
  relation?: {
    relation?: {};
  };
  rollup?: {
    rollup?: {};
  };
  created_time?: {
    created_time?: {};
  };
  created_by?: {
    created_by?: {};
  };
  last_edited_time?: {
    last_edited_time?: {};
  };
  last_edited_by?: {
    last_edited_by?: {};
  };
}