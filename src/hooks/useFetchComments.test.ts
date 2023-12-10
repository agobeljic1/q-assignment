import { renderHook } from "@testing-library/react";
import { useFetchComments } from "./useFetchComments";
import { COMMENTS_KEY, COMMENTS_URL } from "../shared/constants";
import { useFetch } from "./useFetch";

const POST_ID = 1;

describe("useFetchComments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (globalThis as any).useFetch = vi.fn();

    vi.mock("./useFetch", () => ({
      useFetch: vi.fn(),
    }));
  });

  it("should return the initial values for `data`, error and loading and then return data", async () => {
    renderHook(() => useFetchComments(POST_ID));
    const queryParams = `?postId=${POST_ID}`;

    expect(useFetch).toHaveBeenCalledOnce();
    expect(useFetch).toHaveBeenCalledWith(
      COMMENTS_KEY,
      `${COMMENTS_URL}${queryParams}`
    );
  });
});
