// import { AbstractControl } from "@angular/forms";

// export const MatchPasswordValidator = (control: AbstractControl): void => {

//     let password = control.get('password');
//     let confirmPassword = control.get('password_confirmation');

//     if(password && confirmPassword && password?.value != confirmPassword?.value) {
//       return confirmPassword?.setErrors({ mismatch: true })
//     }
// }

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