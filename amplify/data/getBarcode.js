import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  return ddb.get({ key: { barcode: ctx.args.barcode } });
}

export const response = (ctx) => ctx.result;