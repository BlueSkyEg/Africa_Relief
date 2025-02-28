import { IMetadata } from "./imetadata";

export interface ICategory {
  name: string;
  slug: string;
  meta_data: IMetadata;
  description:string;
}
