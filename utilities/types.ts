import { PostStateType } from "../redux/posts/postsSlice";

export type PostInfoType = {
  limit: number;
  posts: PostType[]
  skip: number;
  total: number
}

export type CommentInfoType = {
  limit: number;
  comments: CommentType[]
  skip: number;
  total: number
}

export type PostType = {
  body: string,
  id: number,
  reactions: number,
  tags: string[],
  title: string,
  userId: number;
  comments?: CommentType[];
  author?: AuthorType;
  isSeen?: boolean;
}

export type CommentType = {
  id: number,
  body: string,
  postId: number,
  user: {
    id: number,
    username: string
  }
}

export type AuthorType = {
  firstName: string,
  lastName: string,
  gender: string,
  phone: string,
  username: string,
  email: string,
  age: number,
  image: string,
}

export type SelectorType = {
  post: PostStateType
}

export type AxiosResponseType = {
  status: number,
  statusText: string,
  data: PostInfoType
}