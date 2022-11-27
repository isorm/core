import { methodDecorWrapper } from "../../../src/isorm-core";

export const Use = () =>
  methodDecorWrapper(
    (data) => {
      return (req, res, next) => {
        console.log("Runned App Module from", req.url);
        return next();
      };
    },
    {
      type: "MODULE",
    },
  );
