import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";

const SUCCESS_DATA1 = [
  {
    id: 1,
    name: "Name1",
  },
  {
    id: 2,
    name: "Name2",
  },
];

const SUCCESS_DATA2 = {
  id: 1,
  name: "Name1",
};

const MOCK_URL_1 = "Mock1";
const MOCK_URL_2 = "Mock2";
const MOCK_ERROR = "MockError";

const results: { [key: string]: any } = {
  [MOCK_URL_1]: SUCCESS_DATA1,
  [MOCK_URL_2]: SUCCESS_DATA2,
};

describe("useFetch", () => {
  describe("fetching url flow", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      globalThis.fetch = vi.fn().mockImplementation((url) =>
        url === MOCK_ERROR
          ? Promise.reject(MOCK_ERROR)
          : Promise.resolve({
              json: () => results[url],
            })
      );
    });

    it("should return the initial values for `data`, error and loading and then return data", async () => {
      const { result } = renderHook(() => useFetch(MOCK_URL_1, MOCK_URL_1));
      const { data, error, loading } = result.current;

      expect(data).toBe(null);
      expect(error).toBe(null);
      expect(loading).toBe(true);

      await waitFor(() => {
        expect(result.current).toEqual({
          data: SUCCESS_DATA1,
          error: null,
          loading: false,
        });
        expect(fetch).toBeCalledTimes(1);
      });
    });

    it("should return data null", async () => {
      const { result } = renderHook(() => useFetch(MOCK_URL_1, MOCK_URL_1));
      const { data, error, loading } = result.current;

      expect(data).toBe(null);
      expect(error).toBe(null);
      expect(loading).toBe(true);
      expect(fetch).toBeCalledTimes(1);
    });

    it("should return the second data without the cache and trigger the fetch", async () => {
      const { result } = renderHook(() => useFetch(MOCK_URL_2, MOCK_URL_2));
      const { data, error, loading } = result.current;

      expect(data).toBe(null);
      expect(error).toBe(null);
      expect(loading).toBe(true);

      await waitFor(() => {
        expect(result.current).toEqual({
          data: SUCCESS_DATA2,
          error: null,
          loading: false,
        });
        expect(fetch).toBeCalledTimes(1);
      });
    });

    it("should trigger the fetch and return the error", async () => {
      const { result } = renderHook(() => useFetch(MOCK_ERROR, MOCK_ERROR));
      const { data, error, loading } = result.current;

      expect(data).toBe(null);
      expect(error).toBe(null);
      expect(loading).toBe(true);

      await waitFor(() => {
        expect(result.current).toEqual({
          data: null,
          error: `Failed to fetch ${MOCK_ERROR}`,
          loading: false,
        });
        expect(fetch).toBeCalledTimes(1);
      });
    });
  });

  describe("aborting request", () => {
    const mockedAbortController = {
      abort: vi.fn(),
    };

    beforeEach(() => {
      vi.clearAllMocks();
      globalThis.AbortController = vi.fn(() => mockedAbortController) as any;
    });

    it("should abort the fetch request", async () => {
      const { unmount } = renderHook(() =>
        useFetch("MOCK_URL_1", "MOCK_URL_1")
      );
      unmount();
      expect(globalThis.AbortController).toHaveBeenCalled();
      expect(mockedAbortController.abort).toHaveBeenCalled();
    });
  });

  describe("disabled fetch", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("shouldn't change state when disabled", async () => {
      const { result } = renderHook(() =>
        useFetch(MOCK_URL_1, MOCK_URL_1, true)
      );
      const { data, error, loading } = result.current;

      expect(data).toBe(null);
      expect(error).toBe(null);
      expect(loading).toBe(false);

      await waitFor(() => {
        expect(data).toBe(null);
        expect(error).toBe(null);
        expect(loading).toBe(false);
        expect(fetch).toBeCalledTimes(0);
      });
    });
  });
});
