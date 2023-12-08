import { css } from "@emotion/react";
import { PostWithUsername } from "../../model/Post";
import React from "react";
import CommentList from "./CommentList";

const CardWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const Card = css`
  padding: 1rem;
  padding-bottom: 0;
  width: 100%;
`;

const TitleBar = css`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Title = css`
  margin: 0;
  width: 100%;
  color: #5252c9;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Username = css`
  width: fit-content;
  color: brown;
`;

const CommentsBar = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  user-select: none;
`;

const ToggleCommentsBar = css`
  font-weight: bold;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.6;
  }
`;
function PostCard({ post }: { post: PostWithUsername }) {
  const [showComments, setShowComments] = React.useState(false);
  const toggleCommentsVisibility = () => {
    setShowComments((show) => !show);
  };

  return (
    <div css={CardWrapper}>
      <div css={Card}>
        <div css={TitleBar}>
          <h2 css={Title}>{post.title}</h2>
          <label css={Username}>@{post.username}</label>
        </div>
        <p>{post.body}</p>
      </div>
      <div css={CommentsBar}>
        {showComments && <CommentList postId={post.id} />}
        <p onClick={toggleCommentsVisibility} css={ToggleCommentsBar}>
          {showComments ? "Hide comments" : "Show comments"}
        </p>
      </div>
    </div>
  );
}

export default PostCard;
