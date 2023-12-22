export interface Category {
  _id: string;
  Name: string;
  Description: string;
  createdAt: string;
  updatedAt: string;
  Image: string;
}

export interface CategoryWithChildren {
  _id: string;
  children: Children[];
  parent: Category;
}

export interface Children {
  _id: string;
  Name: string;
  Parent: string;
  createdAt: string;
  updatedAt: string;
}
