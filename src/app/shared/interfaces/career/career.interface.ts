import { IContent } from "../content-interface";
import { IMetadata } from "../imetadata";

export interface ICareer {
  title: string;
  slug: string;
  excerpt: string;
  contents: IContent[];
  meta_data: IMetadata;
  created_at: string;
  updated_at: string;
}
