export type CommentType = {
  id: number;
  description: string;
  color: string;
};

export type ItemType = {
  id: number;
  text: string;
  comments: Array<CommentType>;
};
