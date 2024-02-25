import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const PasswordValidator = (control: AbstractControl): void => {
  let password = control.get('password');

  if(!password?.value) {
    return password?.setErrors({ required: true })
  }
  else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?]).{8,}$/.test(password?.value)) {
    password?.setErrors({ regex: true })
  }
}
