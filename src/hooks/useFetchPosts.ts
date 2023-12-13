import React from "react";
import { useFetch } from "./useFetch";
import { PostWithUser } from "../model/Post";
import {
  INFINITE_SCROLL_LIMIT,
  POSTS_KEY,
  POSTS_URL,
} from "../shared/constants";

export const useFetchPosts = (
  query: string = "",
  page: number = 1,
  disabled: boolean = false
) => {
  const [data, setData] = React.useState<PostWithUser[] | null>(null);
  const {
    data: posts,
    loading,
    error,
  } = useFetch<PostWithUser[]>(
    POSTS_KEY,
    `${POSTS_URL}?_expand=user&_page=${page}&_limit=${INFINITE_SCROLL_LIMIT}`,
    disabled,
    false
  );

  React.useEffect(() => {
    if (!posts) return;
    const filteredPosts = posts.filter(
      (post: PostWithUser) =>
        !!post.user.username.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredPosts);
  }, [posts]);

  return {
    data,
    loading: !data || loading,
    error: error,
  };
};
