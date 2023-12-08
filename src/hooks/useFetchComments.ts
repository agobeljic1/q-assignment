import { useFetch } from "./useFetch";
import { Comment } from "../model/Comment";
import { COMMENTS_KEY, COMMENTS_URL } from "../shared/constants";

export const useFetchComments = (postId: number, disabled: boolean = false) => {
  const queryParams = `?postId=${postId}`;

  return useFetch<Comment[]>(
    COMMENTS_KEY,
    `${COMMENTS_URL}${queryParams}`,
    disabled
  );
};
