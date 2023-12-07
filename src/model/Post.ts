export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
}

export type PostWithUsername = Post & { username: string };
