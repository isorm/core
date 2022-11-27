import { Request, Response, Router, NextFunction } from "express";
import { join } from "path";
import { Container } from "../libs/DI";
import { AppMetadata } from "../libs/metadata";
import app from "./app";
import { APP_DATA } from "./defaults";

const Isorm = ({
  controllers,
  configs,
}: {
  controllers: { new (...args: any): unknown }[];
  configs?: Partial<{
    port: number; // default : 3000
    autolisten: boolean; // default : true
  }>;
}) => {
  let routes = [];
  let i = 0;
  for (i = 0; i < controllers.length; i++) {
    const controller = controllers[i];
    const info = AppMetadata.get(controller);

    const route = Router() as any;

    (info.route || []).map((item: any, i: number) => {
      const endpoint = join("/", info?.path, item.endpoint)
        .replace(/\\/g, "/")
        .replace(/\:/g, "/:");

      const requestMethod = item.method.toLowerCase();

      route[requestMethod](
        `${endpoint}`,
        ...info.modules,
        (req: Request, res: Response, next: NextFunction) => {
          const props = item.props;

          for (let i in props) {
            const prop = props[i];
            if (prop.type === "req") prop.attach = req;
            if (prop.type === "res") prop.attach = res;
            if (prop.type === "next") prop.attach = next;

            props[i] = prop;
          }

          info.route[i].props = props;

          Reflect.defineMetadata(APP_DATA, info, info.route[i].constructor);

          return next();
        },
        ...(item.modules || []),
        (...data: any[]) => info.instance[item.constructorMethodName](...data),
      );
    });

    routes.push(route);
  }

  app.use(routes);

  if (!configs?.autolisten)
    app.listen(configs?.port || 3000, () => {
      console.log("App Was Successfully Runned In ISORM");
    });

  return app;
};

export default Isorm;
