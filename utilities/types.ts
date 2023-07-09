export type PostInfoType = {
  limit: number;
  posts: PostType[]
  skip: number;
  total: number
}

export type PostType = {
  body: string,
  id: number,
  reactions: number,
  tags: string[],
  title: string,
  userId: number
}

export type SelectorType = {
  post: {
    postList: PostType[]
  }
}