export interface Post {
  id: number;
  userId: string;
  title: string;
  body: string;
}

export type PostWithUserName = Post & { userName: string };
