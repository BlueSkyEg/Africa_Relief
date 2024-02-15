import {ICategory} from "./category-interface";
import {IImage} from "./image-interface";

export interface IBlog {
  title: string
  slug: string
  categories: ICategory[]
  date: string
  featuredImage: IImage
}
