import { useFetch } from "./useFetch";
import { Comment } from "../model/Comment";
import {
  COMMENTS_KEY,
  INFINITE_SCROLL_LIMIT,
  POSTS_URL,
} from "../shared/constants";

export const useFetchComments = (
  postId: number,
  page: number = 1,
  disabled: boolean = false
) => {
  return useFetch<Comment[]>(
    COMMENTS_KEY,
    `${POSTS_URL}/${postId}/comments?_page=${page}&_limit=${INFINITE_SCROLL_LIMIT}`,
    disabled,
    false
  );
};
