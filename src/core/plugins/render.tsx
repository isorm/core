import React from "react";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import getAllNestedFiles from "../../libs/getAllNestedFiles";
import { cwd } from "process";
import { join } from "path";

export function render<T extends React.FC<any>>(Component: T) {
  return (args: any, req: Request, res: Response, next: NextFunction) => {
    const data = fs.readFileSync(join(cwd(), "public/index.html"), "utf8");

    const files = [
      ...(getAllNestedFiles("pages", ".tsx") || []),
      ...(getAllNestedFiles("pages", ".jsx") || []),
    ];

    let i = files.length;

    let fileName = "";

    while (i--) {
      const file = files[i];

      const componentExists = fs
        .readFileSync(file)
        .includes(`export default ${Component.name}`);
      if (componentExists) {
        fileName = file;
        break;
      }
    }

    const page = Component.name
      .split("")
      .map((i: any) => i.replace(/\$/, "\\$"))
      .join("");

    return res.send(
      data.replace(
        `<div id="root"></div>`,
        `<script>
          window.__PROPS__=${JSON.stringify(args.props)}
          window.__IMPORTS__=${JSON.stringify({
            page,
            pageName: fileName
              .split("\\")
              .slice(-1)[0]
              .split(".")[0]
              .split("")
              .map((i: any) => i.replace(/\$/, "\\$"))
              .join(""),
          })}
          </script>
          <div id="root"></div>
          <script src="/bundle.js"></script>`,
      ),
    );
  };
}
