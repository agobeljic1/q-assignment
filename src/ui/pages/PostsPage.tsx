import { css } from "@emotion/react";
import React, { ChangeEvent } from "react";
import { useFetchPosts } from "../../hooks/useFetchPosts";
import PostCard from "../components/PostCard";
import { useDebounce } from "../../hooks/useDebounce";
import withLogging from "../../hocs/loggerHoc";

const PostList = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  row-gap: 2rem;
`;

const InputWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const Input = css`
  font-size: 18px;
  padding: 10px;
  width: 300px;
  border-radius: 0.5rem;
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
