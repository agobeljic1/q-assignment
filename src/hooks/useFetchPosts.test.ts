import { renderHook, waitFor } from "@testing-library/react";
import { useFetchPosts } from "./useFetchPosts";
import { POSTS_URL, USERS_URL } from "../shared/constants";

const POSTS = [
  {
    userId: 1,
    id: 1,
    title: "Title",
    body: "Body",
  },
];

const USERS = [
  {
    id: 1,
    name: "Name",
    username: "Username",
    email: "Email",
  },
];

const POSTS_WITH_USER_NAME = [
  {
    userId: 1,
    id: 1,
    title: "Title",
    body: "Body",
    userName: "Name",
  },
];

const results: { [key: string]: any } = {
  [POSTS_URL]: POSTS,
  [USERS_URL]: USERS,
};

const MOCK_ERROR = "MockError";
const SEARCH_QUERY_SUCCESS = "Nam";
const SEARCH_QUERY_FAIL = "Fail";

describe("useFetchPosts", () => {
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
    const { result } = renderHook(() => useFetchPosts());
    const { data, error, loading } = result.current;

    expect(data).toBe(null);
    expect(error).toBe(null);
    expect(loading).toBe(true);

    await waitFor(() => {
      expect(result.current).toEqual({
        data: POSTS_WITH_USER_NAME,
        error: null,
        loading: false,
      });
    });
  });

  it("should return empty array after failing query search", async () => {
    const { result } = renderHook(() => useFetchPosts(SEARCH_QUERY_FAIL));

    await waitFor(() => {
      expect(result.current).toEqual({
        data: [],
        error: null,
        loading: false,
      });
    });
  });

  it("should return array after succeeding query search", async () => {
    const { result } = renderHook(() => useFetchPosts(SEARCH_QUERY_SUCCESS));

    await waitFor(() => {
      expect(result.current).toEqual({
        data: POSTS_WITH_USER_NAME,
        error: null,
        loading: false,
      });
    });
  });
});
