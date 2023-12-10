import { useParams } from "react-router-dom";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { useFetchSinglePost } from "../../hooks/useFetchSinglePost";

import PostDetailsPage from "./PostDetailsPage";

const POST = {
  userId: "1",
  id: 1,
  title: "Title",
  body: "Body",
};

const USER = {
  id: "1",
  name: "Name",
  username: "Username",
  email: "Email",
};

const POST_WITH_USER = {
  ...POST,
  user: USER,
};

const ERROR_TEXT = "Failed to fetch";
const LOADING_MESSAGE = "Loading...";
const NO_POST_MESSAGE = "No post";

vi.mock("../../hooks/useFetchSinglePost");
vi.mock("react-router-dom");
vi.useFakeTimers();
describe("PostDetailsPage", () => {
  it("renders post details page and calls useFetchSinglePost", () => {
    vi.mocked(useFetchSinglePost).mockReturnValue({
      loading: false,
      error: null,
      data: POST_WITH_USER,
    });
    vi.mocked(useParams).mockReturnValue({ id: POST_WITH_USER.user.id });
    render(<PostDetailsPage />);

    expect(useFetchSinglePost).toBeCalledWith(
      POST_WITH_USER.user.id,
      !POST_WITH_USER.user.id
    );
  });

  it("renders loading message", () => {
    vi.mocked(useFetchSinglePost).mockReturnValue({
      loading: true,
      error: null,
      data: POST_WITH_USER,
    });
    vi.mocked(useParams).mockReturnValue({ id: POST_WITH_USER.user.id });
    render(<PostDetailsPage />);

    const labelElements = screen.getAllByText(LOADING_MESSAGE);
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });

  it("renders error message", () => {
    vi.mocked(useFetchSinglePost).mockReturnValue({
      loading: false,
      error: ERROR_TEXT,
      data: null,
    });
    vi.mocked(useParams).mockReturnValue({ id: POST_WITH_USER.user.id });
    render(<PostDetailsPage />);

    const labelElements = screen.getAllByText(ERROR_TEXT);
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });

  it("renders no post message", () => {
    vi.mocked(useFetchSinglePost).mockReturnValue({
      loading: false,
      error: null,
      data: null,
    });
    vi.mocked(useParams).mockReturnValue({ id: POST_WITH_USER.user.id });
    render(<PostDetailsPage />);

    const labelElements = screen.getAllByText(NO_POST_MESSAGE);
    expect(labelElements.length).toBe(1);
    expect(labelElements[0].tagName).toBe("LABEL");
  });

  it("renders post details", () => {
    vi.mocked(useFetchSinglePost).mockReturnValue({
      loading: false,
      error: null,
      data: POST_WITH_USER,
    });
    vi.mocked(useParams).mockReturnValue({ id: POST_WITH_USER.user.id });
    const { container } = render(<PostDetailsPage />);

    const titles = container.querySelectorAll("h2");
    expect(titles.length).toBe(1);
    expect(titles[0].textContent).toBe("Post details");

    const labels = container.querySelectorAll("label");
    expect(labels.length).toBe(10);
    expect(labels[0].textContent).toBe("Title:");
    expect(labels[1].textContent).toBe(POST_WITH_USER.title);
    expect(labels[2].textContent).toBe("Body:");
    expect(labels[3].textContent).toBe(POST_WITH_USER.body);
    expect(labels[4].textContent).toBe("User name:");
    expect(labels[5].textContent).toBe(POST_WITH_USER.user.name);
    expect(labels[6].textContent).toBe("User email:");
    expect(labels[7].textContent).toBe(POST_WITH_USER.user.email);
    expect(labels[8].textContent).toBe("Username:");
    expect(labels[9].textContent).toBe(POST_WITH_USER.user.username);
  });
});
