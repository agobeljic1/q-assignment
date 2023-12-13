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

describe("useInfiniteScroll", () => {
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
  });
});
