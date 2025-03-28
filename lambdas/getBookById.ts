import { APIGatewayProxyHandlerV2 } from "aws-lambda";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = createDDbDocClient();

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {     // Note change
  try {
    console.log("[EVENT]", JSON.stringify(event));
    const pathParameters  = event?.pathParameters;
    const bookId = pathParameters?.bookId ? parseInt(pathParameters.bookId) : undefined;
    const queryParams = event?.queryStringParameters;
    const includeCast = queryParams?.cast === "true";

    if (!bookId) {
      return {
        statusCode: 404,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ Message: "Missing book Id" }),
      };
    }

    const commandOutput = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id: bookId },
      })
    );
    console.log("GetCommand response: ", commandOutput);
    if (!commandOutput.Item) {
      return {
        statusCode: 404,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ Message: "Invalid book Id" }),
      };
    }

    const body: { data: Record<string, any>; cast?: any[]} = {
      data: commandOutput.Item,
    };

    if (includeCast){
      const castResponse = await ddbDocClient.send(
        new QueryCommand({
          TableName: process.env.CAST_TABLE_NAME,
          KeyConditionExpression: "bookId = :m",
          ExpressionAttributeValues:{
            ":m": bookId
          },
        })
      );
      body.cast =castResponse.Items || [];
    }

    // Return Response
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    };
  } catch (error: any) {
    console.log(JSON.stringify(error));
    return {
      statusCode: 500,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ error }),
    };
  }
};

function createDDbDocClient() {
  const ddbClient = new DynamoDBClient({ region: process.env.REGION });
  const marshallOptions = {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  };
  const unmarshallOptions = {
    wrapNumbers: false,
  };
  const translateConfig = { marshallOptions, unmarshallOptions };
  return DynamoDBDocumentClient.from(ddbClient, translateConfig);
}
