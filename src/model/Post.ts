import { User } from "./User";

export interface Post {
  id: number;
  userId: string;
  title: string;
  body: string;
}

export type PostWithUserName = Post & { userName: string };

export type PostWithUser = Post & { user: User };
