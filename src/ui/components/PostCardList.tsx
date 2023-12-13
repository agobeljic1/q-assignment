import withLogging from "../../hocs/loggerHoc";
import { css } from "@emotion/react";
import PostCard from "./PostCard";
import { useInfiniteScrollPosts } from "../../hooks/useInfiniteScrollPosts";
import { PostWithUser } from "../../model/Post";

const PostList = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function PostCardList({ query }: { query: string }) {
  const { data: posts, loading, error } = useInfiniteScrollPosts(window, query);

  return (
    <div css={PostList}>
      {posts?.map((post: PostWithUser) => (
        <PostCard key={post.id} post={post} />
      ))}
      {loading && <label>Loading</label>}
      {!loading && error && <label>{error}</label>}
      {!loading && !error && !posts?.length && <label>No posts</label>}
    </div>
  );
}

export default withLogging(PostCardList, PostCardList.name);
