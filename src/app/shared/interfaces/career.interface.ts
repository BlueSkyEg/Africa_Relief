import { IContent } from "./content-interface";

export interface ICareer {
  title: string,
  slug: string,
  summary: string,
  content: IContent[]
}
