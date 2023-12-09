import { css } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";
import { PostWithUserName } from "../../model/Post";
import CommentList from "./CommentList";
import withLogging from "../../hocs/loggerHoc";

const Card = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  width: 100%;
`;

const CardContent = css`
  padding: 1rem;
  padding-bottom: 0;
  width: 100%;
`;

const TitleBar = css`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const TitleLink = css`
  text-decoration: none;
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

const UserName = css`
  width: fit-content;
  color: brown;
  white-space: nowrap;
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
function PostCard({ post }: { post: PostWithUserName }) {
  const [showComments, setShowComments] = React.useState(false);
  const toggleCommentsVisibility = () => {
    setShowComments((show) => !show);
  };

  return (
    <div css={Card}>
      <div css={CardContent}>
        <div css={TitleBar}>
          <Link to={`/post/${post.id}`} css={TitleLink}>
            <h2 css={Title}>{post.title}</h2>
          </Link>
          <label css={UserName}>{post.userName}</label>
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

export default withLogging(PostCard, PostCard.name);
