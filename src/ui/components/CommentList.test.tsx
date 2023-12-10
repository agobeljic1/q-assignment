import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { useFetchComments } from "../../hooks/useFetchComments";

import CommentList from "./CommentList";

const COMMENTS = [
  {
    postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  },
];

const ERROR_TEXT = "Error";

vi.mock("../../hooks/useFetchComments");

describe("CommentList", () => {
  it("renders comment list", () => {
    vi.mocked(useFetchComments).mockReturnValue({
      loading: false,
      error: null,
      data: [],
    });
    render(<CommentList />);
  });

  it("should show error message", () => {
    vi.mocked(useFetchComments).mockReturnValue({
      loading: false,
      error: "Error",
      data: [],
    });
    render(<CommentList />);
    const labelElements = screen.getAllByText(ERROR_TEXT);
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });

  it("should display loading message", () => {
    vi.mocked(useFetchComments).mockReturnValue({
      loading: true,
      error: null,
      data: [],
    });
    render(<CommentList />);
    const labelElements = screen.getAllByText("Loading comments...");
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });

  it("should display elements", () => {
    vi.mocked(useFetchComments).mockReturnValue({
      loading: false,
      error: null,
      data: COMMENTS,
    });
    const { container } = render(<CommentList />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBe(1 + COMMENTS.length * 2);

    for (let i = 1; i < divs.length; i += 2) {
      const comment = COMMENTS[(i - 1) / 2];
      const labels = divs[i].querySelectorAll("label");
      const paragraphs = divs[i].querySelectorAll("p");
      expect(labels.length).toBe(2);
      expect(paragraphs.length).toBe(1);
      expect(paragraphs[0].textContent).toBe(comment.body);
      expect(labels[0].textContent).toBe(comment.name);
      expect(labels[1].textContent).toBe(comment.email);
    }
  });
});
