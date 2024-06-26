import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    const regex = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?]).{8,}$/);

    if(password) {
      if(!regex.test(password)) {
        return { pattern: 'Invalid password, Please follow the hint.' }
      }
    }

    return null;
  }
}