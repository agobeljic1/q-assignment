import { renderHook } from "@testing-library/react";
import { useInfiniteScrollPosts } from "./useInfiniteScrollPosts";
import { useInfiniteScroll } from "./useInfiniteScroll";

const QUERY = "";
const FAKE_ELEMENT = {} as HTMLElement;
vi.mock("./useInfiniteScroll");
describe("useInfiniteScrollPosts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useInfiniteScroll);
  });

  it("should call the useInfiniteScroll", async () => {
    renderHook(() => useInfiniteScrollPosts(FAKE_ELEMENT, QUERY));

    expect(useInfiniteScroll).toHaveBeenCalledOnce();
  });
});
