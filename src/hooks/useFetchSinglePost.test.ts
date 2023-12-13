import { renderHook, waitFor } from "@testing-library/react";
import { useFetchSinglePost } from "./useFetchSinglePost";
import * as useFetchModule from "./useFetch";

const POST = {
  userId: 1,
  id: 1,
  title: "Title",
  body: "Body",
  user: {
    id: 1,
    name: "Name",
    username: "Username",
    email: "Email",
  },
};

const MOCK_ERROR = "MockError";

describe("useFetchSinglePost", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn().mockImplementation((url) =>
      url === MOCK_ERROR
        ? Promise.reject(MOCK_ERROR)
        : Promise.resolve({
            json: () => POST,
          })
    );
  });

  it("should return the initial values for `data`, error and loading and then return data", async () => {
    const spyUseFetch = vi.spyOn(useFetchModule, "useFetch");

    const { result } = renderHook(() => useFetchSinglePost(POST.id.toString()));
    const { data, error, loading } = result.current;

    expect(data).toBe(null);
    expect(error).toBe(null);
    expect(loading).toBe(true);

    await waitFor(() => {
      expect(result.current).toEqual({
        data: POST,
        error: null,
        loading: false,
      });
      expect(spyUseFetch).toHaveBeenCalled();
    });
  });
});
