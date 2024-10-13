import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function MatchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password').value;
    let confirmPassword = control.get('password_confirmation').value;

    if(password && confirmPassword && password != confirmPassword) {
      return { mismatch: 'Password and Confirm Password must match.' };
    }

    return null;
  }
}