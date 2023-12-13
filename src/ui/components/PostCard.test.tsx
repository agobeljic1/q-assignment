import { describe, it } from "vitest";
import { render, screen, act } from "@testing-library/react";

import PostCard from "./PostCard";
import { BrowserRouter } from "react-router-dom";

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

const SHOW_COMMENTS = "Show comments";
const HIDE_COMMENTS = "Hide comments";

describe("PostCard", () => {
  it("renders post card", () => {
    render(
      <BrowserRouter>
        <PostCard post={POST} />
      </BrowserRouter>
    );
  });

  it("renders post card elements properly", () => {
    const { container } = render(
      <BrowserRouter>
        <PostCard post={POST} />
      </BrowserRouter>
    );

    const divs = container.querySelectorAll("h2");
    expect(divs.length).toBe(1);
    expect(divs[0].textContent).toBe(POST.title);

    const links = screen.getAllByRole("link") as HTMLLinkElement[];
    expect(links.length).toBe(1);
    expect(links[0].tagName).toBe("A");
    expect(links[0].href).toBe(`${window.location.href}post/${POST.id}`);

    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0].textContent).toBe(POST.body);
    expect(paragraphs[1].textContent).toBe("Show comments");

    const labelElements = container.querySelectorAll("label");
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].textContent).toBe(POST.user.name);
  });

  it("toggle show/hide comments section", () => {
    const { container } = render(
      <BrowserRouter>
        <PostCard post={POST} />
      </BrowserRouter>
    );

    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs[1].textContent).toBe(SHOW_COMMENTS);
    act(() => {
      paragraphs[1].click();
    });

    expect(paragraphs[1].textContent).toBe(HIDE_COMMENTS);
    act(() => {
      paragraphs[1].click();
    });
    expect(paragraphs[1].textContent).toBe(SHOW_COMMENTS);
  });
});
