import { useParams } from "react-router-dom";
import { useFetchSinglePost } from "../../hooks/useFetchSinglePost";

function PostDetails() {
  const { id } = useParams();
  const { data: post, loading, error } = useFetchSinglePost(id as string, !id);

  return (
    <>
      <label>PostDetails</label>
    </>
  );
}

export default PostDetails;
