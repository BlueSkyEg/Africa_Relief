import { IImage } from "./image-interface"

export interface ICarouselSlide {
  title: string
  description: string
  image: IImage
  carousel_type: string
  destination: IDestination
}

interface IDestination {
  label: string
  type: string
  slug: string
}