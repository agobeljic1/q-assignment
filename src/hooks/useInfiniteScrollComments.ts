import { Comment } from "../model/Comment";
import { useFetchComments } from "./useFetchComments";
import { useInfiniteScroll } from "./useInfiniteScroll";

export const useInfiniteScrollComments = (
  postId: number,
  element: HTMLElement | null
) => {
  const useFetchCommentsFn = (page: number, disabled: boolean) => {
    return useFetchComments(postId, page, disabled);
  };
  return useInfiniteScroll<Comment>(useFetchCommentsFn, element);
};
