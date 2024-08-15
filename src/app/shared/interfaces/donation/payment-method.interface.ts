export interface IPaymentMethod {
  id: string
  exp_month: string
  exp_year: string
  last4: string
  brand: string
  wallet: string
  name: string
  email: string
  phone: string
  country: string
  city: string
  state: string
  street_address: string
  postal_code: string
  default: boolean
}
