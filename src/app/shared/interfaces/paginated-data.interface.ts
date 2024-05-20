import { IPaginationMeta } from "./pagination-meta.interface";

export interface IPaginatedData<T> {
  data: T,
  pagination: IPaginationMeta
}