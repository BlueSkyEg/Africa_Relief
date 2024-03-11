import { IDonationForm } from "./donation/donation-form.interface"

export interface ISubscription {
  id: number
  donor_id: number
  period: string
  initial_amount: string
  recurring_amount: string
  stripe_subscription_id: string
  parent_payment_id: number
  created_at: string
  expiration_at: string
  status: string
  notes: string
  donation_form: IDonationForm
}
