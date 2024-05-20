import {ICategory} from "../category-interface";
import {IImage} from "../image-interface";

export interface IBlogCard {
  title: string
  slug: string
  excerpt: string
  categories: ICategory[]
  created_at: string
  featured_image: IImage
}
