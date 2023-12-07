import { css } from "@emotion/react";
import { useFetchPosts } from "../../hooks/useFetchPosts";
import PostCard from "../components/PostCard";

const PostList = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  row-gap: 2rem;
`;

function Posts() {
  const { data: posts, loading, error } = useFetchPosts();

  return (
    <div css={PostList}>
      {loading && <label>Loading</label>}
      {!loading && error && <label>Error</label>}
      {!loading &&
        !error &&
        posts?.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}

export default Posts;
