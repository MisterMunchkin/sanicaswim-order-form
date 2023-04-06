import { NextRequest, NextResponse } from "next/server";
import { notion } from "@/notion";

//https://developers.notion.com/reference/property-object
//https://developers.notion.com/reference/property-value-object
//We can create a notion interface of all db properties so we can send data easier.

const database = process.env.NOTION_ORDERS_DB_ID ?? '';

export async function POST(request: NextRequest) {
  const response = await notion.pages.create({
    "parent": {
      "type": "database_id",
      "database_id": database
    },
    "properties": {
      "Name": {
        "title": [
          {
            "text": {
              "content": "Danica Surima"
            }
          }
        ]
      },
      "Status": {
        "status": {
          "name": "Not started"
        }
      },
      "Address": {
        "rich_text": [
          {
            "text": {
              "content": "Concatenated address here"
            }
          }
        ]
      },
      "Contact Number": {
        "phone_number": "+63 919 001 1652"
      },
      "Date": {
        "date": {
          "start": "2023-04-06" //yyyy-mm-dd
        }
      },
      "Order": {
        "rich_text": [
          {
            "text": {
              "content": "concatenated order list of (qty)x (product name) - (price)\n"
            }
          }
        ]
      },
      "Total": {
        "type": "number",
        "number": 1991
      }
    }
  });

  return NextResponse.json(response, {status: 200});
}