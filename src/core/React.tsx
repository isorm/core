import { AppMetadata } from "../libs/metadata";

export const Render =
  (Component: Function) =>
  (target: any, key: string, descriptor: PropertyDescriptor) => {
    const data = AppMetadata.get(target.constructor);

    const routeIndex = data.route.findIndex(
      (item: any) => item.constructorMethodName === key,
    );

    const route = data.route[routeIndex];

    const components = route?.components || [];

    components.push(Component);

    data.route[routeIndex].components = components;

    AppMetadata.set(target.constructor, data);
  };

// export const renderer = (
//   res: Response,
//   props: unknown[],
//   components: Function[],
//   htmlPath?: string,
// ) => {
//   const data = fs.readFileSync(
//     path.resolve(htmlPath || "./public/index.html"),
//     "utf8",
//   );

//   const Component = components[0];

//   return res.send(
//     data.replace(
//       '<div id="root"></div>',
//       `<div id="root">${ReactDOMServer.renderToString(
//         <Component {...props} />,
//       )}</div>`,
//     ),
//   );
// };
