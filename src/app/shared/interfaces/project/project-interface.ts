import { IBlogCard } from "../blog/blog-card-interface"
import { ICategory } from "../category-interface"
import { IContent } from "../content-interface"
import { IDonationForm } from "../donation/donation-form.interface"
import { IDonationLevel } from "../donation/donation-level-inteface"
import { IImage } from "../image-interface"
import { IMetadata } from "../imetadata"

export interface IProject {
  title: string;
  slug: string;
  categories: ICategory[];
  excerpt: string;
  featured_image: IImage;
  contents: IContent[];
  donation_form: IDonationForm;
  meta_data: IMetadata;
  created_at: string;
  updated_at: string;
}
