import { ICategory } from "../category-interface"
import { IContent } from "../content-interface"
import { IDonationForm } from "../donation/donation-form.interface"
import { IDonationLevel } from "../donation/donation-level-inteface"
import { IImage } from "../image-interface"
import { IBlogNavigation } from "./blog-navigation"

export interface IBlog {
  title: string
  slug: string
  categories: ICategory[]
  date: string
  featuredImage: IImage
  gallery: IImage[]
  location: string
  implementationDate: string
  content: IContent[]
  nextBlog: IBlogNavigation
  previousBlog: IBlogNavigation
  donationForm: IDonationForm
}