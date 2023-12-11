import { css } from "@emotion/react";
import React, { ChangeEvent } from "react";
import { useFetchPosts } from "../../hooks/useFetchPosts";
import PostCard from "../components/PostCard";
import { useDebounce } from "../../hooks/useDebounce";
import withLogging from "../../hocs/loggerHoc";

const PostList = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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
  const { data: posts, loading, error } = useFetchPosts(debouncedQuery);

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

      <div css={PostList}>
        {loading && <label>Loading</label>}
        {!loading && error && <label>{error}</label>}
        {!loading && !error && !posts?.length && <label>No posts</label>}
        {!loading &&
          !error &&
          posts?.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default withLogging(PostsPage, PostsPage.name);
