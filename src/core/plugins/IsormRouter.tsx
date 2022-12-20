import { useCallback, useEffect, useState } from "react";
import { Isorm } from "../../types";

const IsormRouter = ({ pages }: Isorm.ReactRouter) => {
  const [Component, setComponent] = useState(null) as any;
  const [query, setQuery] = useState({ params: [], all: "" } as any);
  const [params, setParams] = useState({});

  const componentRunner = useCallback(async () => {
    const path = window.location.pathname.replace(/^\//, "");

    const page = ((window as any)?.__IMPORTS__?.page || "").replace(/\\/g, "");

    const pageName = ((window as any)?.__IMPORTS__?.pageName || "").replace(
      /\\/g,
      "",
    );

    const component = pages.filter((_page: any) => _page.name === page)?.[0];

    const sanitizedQueryStr = (str: string) => ({
      name: str.split("=")[0],
      value: str.split("=")[1],
    });

    if (window.location?.search) {
      const q = window.location.search.replace(/\?/, "");
      setQuery({
        params: q.split("&").map((item) => sanitizedQueryStr(item)),
        all: q,
      });
    }

    const keys =
      pageName
        .match(/\[[\w\d]{1,}\]/g)
        ?.map((item: any) => item.replace(/[\[\]]/g, "")) || [];

    if (keys.length > 0) {
      const pageNameChunks = pageName.replace(/[\[\]]/g, "/").split("/");

      const values = path
        .split("/")
        .map((item: any, i: number) => {
          if (pageNameChunks[i]?.toLowerCase() !== item?.toLowerCase())
            return item;
        })
        .filter((item: string) => item);

      let data = {};

      keys.map((item: string, i: number) =>
        Object.assign(data, { [item]: values[i] || "" }),
      );

      setParams(data);
    }

    setComponent(() => component);
  }, [Component]);

  useEffect(() => {
    componentRunner();
  }, [componentRunner]);

  if (!Component) return null;
  return (
    <Component
      {...((window as any)?.__PROPS__ || {})}
      $query={query}
      $params={params}
    />
  );
};

export default IsormRouter;
