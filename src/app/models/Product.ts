import {User} from "./User";
import {Category} from "./Category";

export interface Product{
    id: number;
    title: string;
    description: string;
    price: number;
    isNew: boolean;
    sellerUser: User;
    category: Category;
}
