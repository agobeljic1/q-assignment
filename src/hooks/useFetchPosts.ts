import React from "react";
import { useFetch } from "./useFetch";
import { Post, PostWithUsername } from "../model/Post";
import { User } from "../model/User";
import {
  POSTS_KEY,
  POSTS_URL,
  USERS_KEY,
  USERS_URL,
} from "../shared/constants";

export const useFetchPosts = (disabled: boolean = false) => {
  const [data, setData] = React.useState<PostWithUsername[] | null>(null);

  const {
    data: postsData,
    loading: loadingPosts,
    error: errorPosts,
  } = useFetch<Post[]>(POSTS_KEY, POSTS_URL, disabled);
  const {
    data: usersData,
    loading: loadingUsers,
    error: errorUsers,
  } = useFetch<User[]>(USERS_KEY, USERS_URL, disabled);

  React.useEffect(() => {
    if (!postsData || !usersData) return;

    const mappedPosts = postsData.map((post) => {
      const user = usersData.find((usr) => usr.id === post.userId);
      return {
        ...post,
        username: user?.username || "",
      };
    });
    setData(mappedPosts);
  }, [postsData, usersData]);

  return {
    data,
    loading: loadingPosts || loadingUsers,
    error: errorPosts || errorUsers,
  };
};
