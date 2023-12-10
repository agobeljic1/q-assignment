import { describe, it } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";

import PostsPage from "./PostsPage";
import { BrowserRouter } from "react-router-dom";
import { useFetchPosts } from "../../hooks/useFetchPosts";

const POSTS_WITH_USER_NAME = [
  {
    userId: "1",
    id: 1,
    title: "Title",
    body: "Body",
    userName: "Name",
  },
];

const ERROR_TEXT = "Failed to fetch";
const LOADING_MESSAGE = "Loading";
const NO_POST_MESSAGE = "No posts";

const SEARCH_QUERY = "Nam";

vi.mock("../../hooks/useFetchPosts");
vi.useFakeTimers();

describe("PostsPage", () => {
  it("renders posts page", () => {
    vi.mocked(useFetchPosts).mockReturnValue({
      loading: false,
      error: null,
      data: [],
    });
    render(<PostsPage />);
  });

  it("should show error message", () => {
    vi.mocked(useFetchPosts).mockReturnValue({
      loading: false,
      error: ERROR_TEXT,
      data: [],
    });
    render(<PostsPage />);
    const labelElements = screen.getAllByText(ERROR_TEXT);
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });

  it("should display loading message", () => {
    vi.mocked(useFetchPosts).mockReturnValue({
      loading: true,
      error: null,
      data: [],
    });
    render(<PostsPage />);
    const labelElements = screen.getAllByText(LOADING_MESSAGE);
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });

  it("should show no posts message", () => {
    vi.mocked(useFetchPosts).mockReturnValue({
      loading: false,
      error: null,
      data: null,
    });
    render(<PostsPage />);
    const labelElements = screen.getAllByText(NO_POST_MESSAGE);
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });

  it("call function when the query changes", () => {
    const { container } = render(<PostsPage />);

    const inputs = container.querySelectorAll("input");
    expect(inputs.length).toBe(1);
    expect(inputs[0].placeholder).toBe("Search posts...");
    act(() => {
      fireEvent.change(inputs[0], { target: { value: SEARCH_QUERY } });
      vi.runAllTimers();
    });
    expect(useFetchPosts).toBeCalledWith(SEARCH_QUERY);
  });

  it("should render posts effectively", () => {
    vi.mocked(useFetchPosts).mockReturnValue({
      loading: false,
      error: null,
      data: POSTS_WITH_USER_NAME,
    });
    render(
      <BrowserRouter>
        <PostsPage />
      </BrowserRouter>
    );
  });
});
