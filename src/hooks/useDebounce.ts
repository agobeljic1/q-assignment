import React from "react";
import { INPUT_DELAY_MS } from "../shared/constants";

export const useDebounce = <T>(value: T, delay: number = INPUT_DELAY_MS) => {
  const [val, setVal] = React.useState(value);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      setVal(value);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [value, delay]);

  return val;
};
