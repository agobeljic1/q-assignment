import { css } from "@emotion/react";
import React, { ChangeEvent } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import withLogging from "../../hocs/loggerHoc";
import PostCardList from "../components/PostCardList";

const InputWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

const Input = css`
  font-size: 18px;
  padding: 0.7rem 1.2rem;
  width: 100%;
  max-width: 300px;
  border-radius: 0.5rem;
  outline: none;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover,
  &:focus {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

function PostsPage() {
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query);

  const onChangeQuery = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  return (
    <div>
      <div css={InputWrapper}>
        <input
          css={Input}
          value={query}
          onChange={onChangeQuery}
          placeholder="Search posts..."
        />
      </div>

      <PostCardList query={debouncedQuery} />
    </div>
  );
}

export default withLogging(PostsPage, PostsPage.name);
