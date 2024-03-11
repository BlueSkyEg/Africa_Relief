import { IDonationLevel } from "./donation-level-inteface";

export interface IDonationForm {
  id: number,
  title: string,
  status: string,
  fully_fund_level: number,
  levels: IDonationLevel[],
  created_at: string,
  updated_at: string
}
