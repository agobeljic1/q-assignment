import { BrowserRouter } from "react-router-dom";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("renders not found page", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
  });

  it("renders message", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    const labelElements = screen.getAllByText("Page not found");
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });
});
