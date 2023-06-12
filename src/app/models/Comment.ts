import { User } from "./User";

export interface Comment {
  id: number;
  content: string;
  date: Date;
  isModified: boolean;
  isDeleted: boolean;
  user: User;
}

export interface CommentRequest {
  content: string;
  dateTime: Date;
  userId: number;
  productId: number;
}
