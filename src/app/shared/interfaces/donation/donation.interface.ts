import { IDonationForm } from "./donation-form.interface"
import { IDonor } from "./donor.interface"
import { IPaymentMethod } from "./payment-method.interface"

export interface IDonation {
  id: number
  subscription_id: number|null
  donation_form: IDonationForm
  payment_method: IPaymentMethod
  stripe_transaction_id: string
  amount: string
  currency: string
  billing_comment: string
  completed_date: string
  status: string
  anonymous_donation: boolean
}
