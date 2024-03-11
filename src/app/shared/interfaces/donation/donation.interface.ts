import { IDonationForm } from "./donation-form.interface"

export interface IDonation {
  id: number
  donor_id: number
  subscription_id: string|null
  donation_form: IDonationForm
  stripe_source_id: string
  stripe_transaction_id: string
  payment_amount: string
  payment_currency: string
  donor_billing_phone: string
  donor_billing_country: string
  donor_billing_city: string
  donor_billing_state: string
  donor_billing_name: string
  donor_billing_address_1: string
  donor_billing_address_2: string|null
  donor_billing_zip: string
  donor_billing_comment: string
  completed_date: string|null
  status: string
  anonymous_donation: number|null
  payment_mode: string
  payment_donor_ip: string|null
  cs_exchange_rate: number|null
}
