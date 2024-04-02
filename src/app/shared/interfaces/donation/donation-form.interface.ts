import { IDonationLevel } from "./donation-level-inteface";

export interface IDonationForm {
  id: number,
  title: string,
  fullyFundLevel: number,
  levels: IDonationLevel[],
  recurringPeriods: string[]
}
