import { IBlogCard } from "./blog-card-interface"
import { ICategory } from "./category-interface"
import { IContent } from "./content-interface"
import { IDonationLevel } from "./donation-level-inteface"
import { IImage } from "./image-interface"

export interface IProject {
  title: string
  slug: string
  category: ICategory
  summary: string
  featuredImage: IImage
  content: IContent[]
  donationLevels: IDonationLevel[]
  fullyFundLevel: number
  recurringPeriod: string[]
  latestUpdates: IBlogCard[]
}
