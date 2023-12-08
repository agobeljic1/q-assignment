import { css } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useFetchSinglePost } from "../../hooks/useFetchSinglePost";

const Card = css`
  background-color: white;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  width: 100%;
  padding: 1rem;
  height: 100%;
`;

const CardTitle = css`
  margin: 0;
  margin-bottom: 1rem;
`;

const Fields = css`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const FieldName = css`
  font-weight: bold;
  margin-right: 0.5rem;
`;
function PostDetailsPage() {
  const { id } = useParams();
  const { data: post, loading, error } = useFetchSinglePost(id as string, !id);

  return (
    <>
      {loading && <label>Loading...</label>}
      {!loading && error && <label>{error}</label>}
      {!loading && !error && !post && <label>No post</label>}

      {!loading && !error && post && (
        <div css={Card}>
          <h2 css={CardTitle}>Post details</h2>
          <div css={Fields}>
            <div>
              <label css={FieldName}>Title:</label>
              <label>{post.title}</label>
            </div>
            <div>
              <label css={FieldName}>Body:</label>
              <label>{post.body}</label>
            </div>
            <div>
              <label css={FieldName}>User name:</label>
              <label>{post.user.name}</label>
            </div>
            <div>
              <label css={FieldName}>User email:</label>
              <label>{post.user.email}</label>
            </div>
            <div>
              <label css={FieldName}>Username:</label>
              <label>{post.user.username}</label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetailsPage;
