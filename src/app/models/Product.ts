import { User } from "./User";
import { Category } from "./Category";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  isNew: boolean;
  isDeleted: boolean;
  image: string;
  sellerUser: User;
  category: Category;
}
