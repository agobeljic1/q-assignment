import React from "react";
import { useFetch } from "./useFetch";
import { Post, PostWithUser } from "../model/Post";
import { User } from "../model/User";
import {
  POSTS_URL,
  SINGLE_POST_KEY,
  USERS_URL,
  SINGLE_USER_KEY,
} from "../shared/constants";

export const useFetchSinglePost = (
  postId: string,
  disabled: boolean = false
) => {
  const [data, setData] = React.useState<PostWithUser | null>(null);

  const {
    data: post,
    loading: loadingPost,
    error: errorPost,
  } = useFetch<Post>(SINGLE_POST_KEY, `${POSTS_URL}/${postId}`, disabled);
  const {
    data: user,
    loading: loadingUser,
    error: errorUser,
  } = useFetch<User>(
    SINGLE_USER_KEY,
    `${USERS_URL}/${post?.userId}`,
    disabled || !post
  );

  React.useEffect(() => {
    if (disabled || !post || !user) return;

    const newPost: PostWithUser = {
      ...post,
      user,
    };
    setData(newPost);
  }, [disabled, post, user]);

  return {
    data,
    loading: loadingPost || loadingUser,
    error: errorPost || errorUser,
  };
};
