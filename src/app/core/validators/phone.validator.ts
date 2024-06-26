import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phone = control.value;
    const regex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

    if(phone) {
      if(!regex.test(phone)) {
        return {pattern: 'Phone number is invalid.'}
      }
    }

    return null;
  }
}