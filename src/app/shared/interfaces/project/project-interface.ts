import { IBlogCard } from "../blog/blog-card-interface"
import { ICategory } from "../category-interface"
import { IContent } from "../content-interface"
import { IDonationForm } from "../donation/donation-form.interface"
import { IDonationLevel } from "../donation/donation-level-inteface"
import { IImage } from "../image-interface"

export interface IProject {
  title: string
  slug: string
  categories: ICategory[]
  excerpt: string
  featured_image: IImage
  contents: IContent[]
  donation_form: IDonationForm
  meta_title: string
  meta_keywords: string
  meta_description: string
  meta_robots: string
  meta_og_title: string
  meta_og_type: string
  created_at: string
  updated_at: string
}
