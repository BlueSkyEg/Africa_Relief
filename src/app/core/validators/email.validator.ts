import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function EmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    const regex = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

    if(email) {
      if(!regex.test(email)) {
        return {pattern: 'Email is invalid.'}
      }
    }

    return null;
  }
}