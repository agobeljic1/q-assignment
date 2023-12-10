import { describe, it } from "vitest";
import { render } from "@testing-library/react";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  it("renders app", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
