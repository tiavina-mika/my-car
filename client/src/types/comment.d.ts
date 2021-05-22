import { User } from './user';
export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  postedBy: User;
}
export interface CommentState {
  car?: Comment | null;
  cars: Comment[];
  count?: number | null;
}

export interface CommentAction {
  type: string;
  car: Comment;
  cars: Comment[];
  count?: number;
}

export interface CommentFormValues {
  text: string;
}

export type PartialCommentFormValues = Partial<CommentFormValues>;
// export interface CommentFormInitialValues extends Omit<PartialCommentFormValues, 'descLong'> {
//   descLong?: any;
// }

export type CommentTypes = CommentAction;