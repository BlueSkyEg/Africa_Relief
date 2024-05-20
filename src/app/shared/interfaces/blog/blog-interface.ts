import { ICategory } from "../category-interface"
import { IContent } from "../content-interface"
import { IDonationForm } from "../donation/donation-form.interface"
import { IImage } from "../image-interface"

export interface IBlog {
  title: string
  slug: string
  excerpt: string
  location: string
  implementation_date: string
  categories: ICategory[]
  featured_image: IImage
  gallery: IImage[]
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