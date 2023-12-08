import React from "react";

// TODO: Add TTL
const cache: { [key: string]: any } = {};

export const useFetch = <T>(key: string, url: string) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (data) return;

    if (cache[key]) {
      setData(cache[key]);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      const signal = controller.signal;
      setLoading(true);
      fetch(url, { signal })
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          cache[url] = res;
          setError(null);
        })
        .catch(() => {
          setError(`Failed to fetch ${key}`);
        })
        .finally(() => setLoading(false));
    };

    fetchData();

    return () => controller.abort();
  }, [data]);

  return { data, loading, error };
};
