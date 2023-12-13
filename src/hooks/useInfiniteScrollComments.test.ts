import { renderHook } from "@testing-library/react";
import { useInfiniteScrollComments } from "./useInfiniteScrollComments";
import { useInfiniteScroll } from "./useInfiniteScroll";

const POST_ID = 1;
const FAKE_ELEMENT = {} as HTMLElement;
vi.mock("./useInfiniteScroll");
describe("useInfiniteScrollComments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useInfiniteScroll);
  });

  it("should call the useInfiniteScroll", async () => {
    renderHook(() => useInfiniteScrollComments(POST_ID, FAKE_ELEMENT));

    expect(useInfiniteScroll).toHaveBeenCalledOnce();
  });
});
