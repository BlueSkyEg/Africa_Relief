import { IDonationForm } from "./donation/donation-form.interface"

export interface ISubscription {
  id: number
  donation_form: IDonationForm
  stripe_subscription_id: string
  period: string
  initial_amount: string
  recurring_amount: string
  completed_date: string
  expiration_date: string
  status: string
}
