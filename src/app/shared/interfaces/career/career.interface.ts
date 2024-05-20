import { IContent } from "../content-interface";

export interface ICareer {
  title: string
  slug: string
  excerpt: string
  contents: IContent[]
  meta_title: string
  meta_keywords: string
  meta_description: string
  meta_robots: string
  meta_og_title: string
  meta_og_type: string
  created_at: string
  updated_at: string
}
