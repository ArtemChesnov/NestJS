export interface Comment {
  id?: number | string;
  message: string;
  author: string;
  cover?: string;
}

export type Comments = Record<string | number, Comment[]>;

export type CommentEdit = Partial<Comment>;
