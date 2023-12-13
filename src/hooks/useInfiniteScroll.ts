import {
  INFINITE_SCROLL_LIMIT,
  INFINITE_SCROLL_OFFSET,
} from "../shared/constants";
import React from "react";

export const useInfiniteScroll = <T>(
  useFetchDataPage: (
    page: number,
    disabled: boolean
  ) => {
    data: T[] | null;
    loading: boolean;
    error: null | string;
  },
  element: HTMLElement | Window | null
) => {
  const [reachedEnd, setReachedEnd] = React.useState(false);
  const [fullData, setFullData] = React.useState<T[]>([]);
  const [page, setPage] = React.useState(1);
  const { data, loading, error } = useFetchDataPage(page, reachedEnd);

  React.useEffect(() => {
    if (loading || reachedEnd || !element) return;

    const handleScroll = () => {
      const targetElement =
        element === window
          ? document.documentElement
          : (element as HTMLElement);
      const { scrollHeight, offsetHeight } = targetElement;

      if (
        offsetHeight + window.scrollY >=
        scrollHeight - INFINITE_SCROLL_OFFSET
      ) {
        setPage((page) => page + 1);
      }
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [loading, reachedEnd, element]);

  React.useEffect(() => {
    if (!data) return;

    setFullData((fullData: T[]) => [...fullData, ...data]);

    if (data.length < INFINITE_SCROLL_LIMIT) {
      setReachedEnd(true);
    }
  }, [data]);

  return { data: fullData, loading, error };
};
