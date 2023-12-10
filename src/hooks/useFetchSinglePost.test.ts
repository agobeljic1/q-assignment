import { renderHook, waitFor } from "@testing-library/react";
import { useFetchSinglePost } from "./useFetchSinglePost";
import { POSTS_URL, USERS_URL } from "../shared/constants";
import * as useFetchModule from "./useFetch";

const POST = {
  userId: 1,
  id: 1,
  title: "Title",
  body: "Body",
};

const USER = {
  id: 1,
  name: "Name",
  username: "Username",
  email: "Email",
};

const POST_WITH_USER = {
  ...POST,
  user: USER,
};

const MOCK_ERROR = "MockError";

const results: { [key: string]: any } = {
  [`${POSTS_URL}/1`]: POST,
  [`${USERS_URL}/1`]: USER,
};

describe("useFetchSinglePost", () => {
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
    const spyUseFetch = vi.spyOn(useFetchModule, "useFetch");

    const { result } = renderHook(() => useFetchSinglePost(POST.id.toString()));
    const { data, error, loading } = result.current;

    expect(data).toBe(null);
    expect(error).toBe(null);
    expect(loading).toBe(true);

    await waitFor(() => {
      expect(result.current).toEqual({
        data: POST_WITH_USER,
        error: null,
        loading: false,
      });
      expect(spyUseFetch).toHaveBeenCalled();
    });
  });
});
