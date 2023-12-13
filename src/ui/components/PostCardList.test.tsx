import { describe, it } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";

import PostCardList from "./PostCardList";
import { BrowserRouter } from "react-router-dom";
import { useInfiniteScrollPosts } from "../../hooks/useInfiniteScrollPosts";

const POSTS_WITH_USER = [
  {
    userId: "1",
    id: 1,
    title: "Title",
    body: "Body",
    user: {
      id: "1",
      name: "Name",
      username: "Username",
      email: "Email",
    },
  },
];

const ERROR_TEXT = "Failed to fetch";
const LOADING_MESSAGE = "Loading";
const NO_POSTS_MESSAGE = "No posts";

vi.mock("../../hooks/useInfiniteScrollPosts");
vi.useFakeTimers();

describe("PostCardList", () => {
  it("renders post card list", () => {
    vi.mocked(useInfiniteScrollPosts).mockReturnValue({
      loading: false,
      error: null,
      data: [],
    });
    render(<PostCardList />);
  });

  it("should show error message", () => {
    vi.mocked(useInfiniteScrollPosts).mockReturnValue({
      loading: false,
      error: ERROR_TEXT,
      data: [],
    });
    render(<PostCardList />);
    const labelElements = screen.getAllByText(ERROR_TEXT);
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });

  it("should display loading message", () => {
    vi.mocked(useInfiniteScrollPosts).mockReturnValue({
      loading: true,
      error: null,
      data: [],
    });
    render(<PostCardList />);
    const labelElements = screen.getAllByText(LOADING_MESSAGE);
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });

  it("should show no posts message", () => {
    vi.mocked(useInfiniteScrollPosts).mockReturnValue({
      loading: false,
      error: null,
      data: [],
    });
    render(<PostCardList />);
    const labelElements = screen.getAllByText(NO_POSTS_MESSAGE);
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });

  it("should render posts effectively", () => {
    vi.mocked(useInfiniteScrollPosts).mockReturnValue({
      loading: false,
      error: null,
      data: POSTS_WITH_USER,
    });
    render(
      <BrowserRouter>
        <PostCardList />
      </BrowserRouter>
    );
  });
});
