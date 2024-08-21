import { IImage } from "./image-interface";
export interface IContent {
  heading: string,
  body: string|string[]|IImage;
  order?:number;
}
