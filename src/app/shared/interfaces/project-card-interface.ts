import {ICategory} from "./category-interface";
import {IImage} from "./image-interface";

export interface IProjectCard {
  title: string
  slug: string
  category: ICategory
  summary: string
  featuredImage: IImage
}
