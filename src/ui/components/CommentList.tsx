import { css } from "@emotion/react";
import { Comment } from "../../model/Comment";

interface CommentListProps {
  comments: Comment[] | null;
  loading: boolean;
  error: string | null;
}

const List = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  row-gap: 0.5rem;
  padding: 1rem;
`;

const CommentItem = css`
  padding: 1rem;
  color: black;
  font-weight: normal;
  border-radius: 8px;
  background-color: #e8e8e8;
  width: 100%;
`;

function CommentList({ comments, loading, error }: CommentListProps) {
  return (
    <div css={List}>
      {loading && <label>Loading comments...</label>}
      {!loading && error && <label>{error}</label>}
      {!loading &&
        !error &&
        !!comments &&
        comments.map((comment) => {
          return (
            <div css={CommentItem} key={comment.id}>
              {comment.body}
            </div>
          );
        })}
    </div>
  );
}

export default CommentList;
