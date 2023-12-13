import { css } from "@emotion/react";
import withLogging from "../../hocs/loggerHoc";
import { useInfiniteScrollComments } from "../../hooks/useInfiniteScrollComments";
import React from "react";

const List = css`
  display: flex;
  flex-direction: column;
  background-color: white;
  row-gap: 0.5rem;
  padding: 1rem;
  max-height: 300px;
  overflow-y: scroll;
`;

const CommentItem = css`
  padding: 1rem;
  color: black;
  font-weight: normal;
  border-radius: 0.5rem;
  background-color: #f4f4f4;
  width: 100%;
  position: relative;
`;

const CommentBar = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CommentName = css`
  font-weight: bold;
`;

const CommentEmail = css`
  color: #d90429;
`;

function CommentList({ postId }: { postId: number }) {
  const ref = React.useRef(null);
  const {
    data: comments,
    loading,
    error,
  } = useInfiniteScrollComments(postId, ref.current);

  return (
    <div css={List} ref={ref}>
      {!loading && error && <label>{error}</label>}
      {!error &&
        !!comments &&
        comments.map((comment) => {
          return (
            <div css={CommentItem} key={comment.id}>
              <div css={CommentBar}>
                <label css={CommentName}>{comment.name}</label>
                <label css={CommentEmail}>{comment.email}</label>
              </div>
              <p>{comment.body}</p>
            </div>
          );
        })}
      {loading && <label>Loading comments...</label>}
    </div>
  );
}

export default withLogging(CommentList, CommentList.name);
