export interface Category {
  id: number;
  name: string;
  parentCategory: Category;
}

//TODO: Check if needed
export interface CategorySideNavItem {
  id: number;
  name: string;
  children: Category[],
  isExtended: boolean;
}
