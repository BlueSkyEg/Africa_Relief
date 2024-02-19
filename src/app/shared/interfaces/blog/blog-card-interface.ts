import {ICategory} from "../category-interface";
import {IImage} from "../image-interface";

export interface IBlogCard {
  title: string
  slug: string
  categories: ICategory[]
  date: string
  featuredImage: IImage
}
