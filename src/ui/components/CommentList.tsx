import { css } from "@emotion/react";
import { useFetchComments } from "../../hooks/useFetchComments";

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
  padding-top: 1.75rem;
  color: black;
  font-weight: normal;
  border-radius: 8px;
  background-color: #e8e8e8;
  width: 100%;
  position: relative;
`;

const CommentEmail = css`
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  color: #5252c9;
`;

function CommentList({ postId }: { postId: number }) {
  const { data: comments, loading, error } = useFetchComments(postId);

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
              <label css={CommentEmail}>{comment.email}</label>
            </div>
          );
        })}
    </div>
  );
}

export default CommentList;
