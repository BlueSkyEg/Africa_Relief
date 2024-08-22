import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function EmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    const regex = new RegExp(/^[\w._-]+@([\w-]+\.)+[\w-]{2,4}$/);

    if(email) {
      if(!regex.test(email)) {
        return {pattern: 'Email is invalid.'}
      }
    }

    return null;
  }
}