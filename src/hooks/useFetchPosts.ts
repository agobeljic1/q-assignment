import React from "react";
import { useFetch } from "./useFetch";
import { Post, PostWithUserName } from "../model/Post";
import { User } from "../model/User";
import {
  POSTS_KEY,
  POSTS_URL,
  USERS_KEY,
  USERS_URL,
} from "../shared/constants";

export const useFetchPosts = (query: string = "") => {
  const [data, setData] = React.useState<PostWithUserName[] | null>(null);

  const {
    data: postsData,
    loading: loadingPosts,
    error: errorPosts,
  } = useFetch<Post[]>(POSTS_KEY, POSTS_URL);
  const {
    data: usersData,
    loading: loadingUsers,
    error: errorUsers,
  } = useFetch<User[]>(USERS_KEY, USERS_URL);

  React.useEffect(() => {
    if (!postsData || !usersData) return;

    const mappedPosts = postsData.map((post: Post) => {
      const user = usersData.find((usr) => usr.id === post.userId);
      return {
        ...post,
        userName: user?.name || "",
      };
    });
    const filteredPosts = mappedPosts.filter((post: PostWithUserName) =>
      post.userName.toLowerCase().includes(query.toLowerCase())
    );

    setData(filteredPosts);
  }, [postsData, usersData, query]);

  return {
    data,
    loading: loadingPosts || loadingUsers,
    error: errorPosts || errorUsers,
  };
};
