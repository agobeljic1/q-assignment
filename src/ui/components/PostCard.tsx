import { Post } from "../../model/Post";

function PostCard({ post }: { post: Post }) {
  return <div>{post.body}</div>;
}

export default PostCard;
