import {ICategory} from "../category-interface";
import {IImage} from "../image-interface";

export interface IProjectCard {
  title: string
  slug: string
  categories: ICategory[]
  excerpt: string
  featured_image: IImage
}
