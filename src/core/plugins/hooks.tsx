import { useEffect, useState } from "react";

export function useProps<T>(initialProps: T) {
  const [props, setProps] = useState(initialProps);

  useEffect(() => {
    const __props__ = (window as any)?.__PROPS__;

    setProps(__props__);
  }, [props]);

  return props;
}
