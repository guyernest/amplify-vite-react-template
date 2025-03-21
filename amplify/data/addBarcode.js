import { util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  const item = { ...ctx.arguments, version: 1 };
  const key = { barcode: ctx.args.barcode ?? util.autoId() };
  return ddb.put({ key, item });
}

export function response(ctx) {
  return ctx.result;
}