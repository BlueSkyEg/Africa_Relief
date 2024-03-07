import { AbstractControl } from "@angular/forms";

export const MatchPasswordValidator = (control: AbstractControl): void => {

    let password = control.get('password');
    let confirmPassword = control.get('confirm_password');

    if(password && confirmPassword && password?.value != confirmPassword?.value) {
      return confirmPassword?.setErrors({ mismatch: true })
    }
}