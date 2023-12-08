import { useFetch } from "./useFetch";
import { Comment } from "../model/Comment";
import { COMMENTS_URL } from "../shared/constants";

export const useFetchComments = (postId: number, disabled: boolean = false) => {
  return useFetch<Comment[]>(
    "comments",
    `${COMMENTS_URL}?postId=${postId}`,
    disabled
  );
};
