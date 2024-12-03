export interface IUser {
  id: number
  name: string
  email: string
  email_verified_at: string
  username: string
  phone: string
  address: string
  img: string
  created_at: string
  updated_at: string
  contributionType?:string
  contributionName?:string
}
