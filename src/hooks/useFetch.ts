import React from "react";

export const useFetch = <T>(
  key: string,
  url: string,
  disabled: boolean = false,
  cancellable: boolean = true
) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (disabled) return;

    let controller: AbortController;

    if (cancellable) {
      controller = new AbortController();
    }

    const fetchData = async () => {
      setLoading(true);
      fetch(url, cancellable ? { signal: controller.signal } : {})
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

    if (cancellable) {
      return () => controller.abort();
    }
  }, [disabled, key, url]);

  return { data, loading, error };
};
