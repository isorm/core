import React from "react";
import { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";
import ReactDOMServer from "react-dom/server";

export default function render(Component: any) {
  return (args: any, req: Request, res: Response, next: NextFunction) => {
    const data = fs.readFileSync(path.resolve("./public/index.html"), "utf8");

    const dom = ReactDOMServer.renderToString(
      React.createElement(Component, args.props),
    );

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<script>window.__PROPS__=${JSON.stringify(args.props)}</script>
        <div id="root">${dom}</div>`,
      ),
    );
  };
}
