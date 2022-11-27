import { restPropDecorHandler } from "../libs/restPropDecorHandler";

export const Req = (target: any, propKey: string, paramIndex: number) => {
  restPropDecorHandler({
    propType: "req",
    paramIndex,
    target,
  });
};

export const Res = (target: any, propKey: string, paramIndex: number) => {
  restPropDecorHandler({
    propType: "res",
    paramIndex,
    target,
  });
};

export const Next = (target: any, propKey: string, paramIndex: number) => {
  restPropDecorHandler({
    propType: "next",
    paramIndex,
    target,
  });
};
