import React from "react";

export const useFetch = <T>(key: string, url: string) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      const signal = controller.signal;
      setLoading(true);
      fetch(url, { signal })
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          setError(null);
        })
        .catch(() => {
          setError(`Failed to fetch ${key}`);
        })
        .finally(() => setLoading(false));
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
};
