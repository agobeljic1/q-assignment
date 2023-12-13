import { PostWithUser } from "../model/Post";
import { useFetchPosts } from "./useFetchPosts";
import { useInfiniteScroll } from "./useInfiniteScroll";

export const useInfiniteScrollPosts = (
  element: HTMLElement | null | Window,
  query: string = ""
) => {
  const useFetchPostsFn = (page: number, disabled: boolean) => {
    return useFetchPosts(query, page, disabled);
  };
  return useInfiniteScroll<PostWithUser>(useFetchPostsFn, element);
};
