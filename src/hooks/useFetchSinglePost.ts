import { useFetch } from "./useFetch";
import { PostWithUser } from "../model/Post";
import { POSTS_URL, SINGLE_POST_KEY } from "../shared/constants";

export const useFetchSinglePost = (
  postId: string,
  disabled: boolean = false
) => {
  return useFetch<PostWithUser>(
    SINGLE_POST_KEY,
    `${POSTS_URL}/${postId}?_expand=user`,
    disabled
  );
};
