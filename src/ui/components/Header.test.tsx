import { BrowserRouter } from "react-router-dom";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("Header", () => {
  it("renders header", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  it("renders title", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const labelElements = screen.getAllByText("PostsAndComments");
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });

  it("renders posts link properly", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const links = screen.getAllByRole("link") as HTMLLinkElement[];
    expect(links.length).toBe(1);
    expect(links[0].tagName).toBe("A");
    expect(links[0].href).toBe(window.location.href + "posts");
  });
});
