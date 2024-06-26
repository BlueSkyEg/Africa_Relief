import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function StringValidator(minLength: number = 3, maxLength: number = 50, text: boolean = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if(value) {
      // Build the regular expression pattern dynamically based on parameters
      let pattern = '^[a-zA-Z ]*$';

      if (text) {
        pattern = '^[a-zA-Z 0-9!@#$%^&*()_+\\-=\\[\\];\'"\\|,.\\/\\?`~:]*$';
      }

      // Create the regex from the constructed pattern
      const regex = new RegExp(pattern);

      // Validate the value against the constructed regex
      if(!regex.test(value)) {
        return {string: 'Please enter valid characters.'}
      }

      if(value.length < minLength) {
        return {string: `Please enter at least ${minLength} characters.`}
      }

      if(value.length > maxLength) {
        return {string: `Please enter no more than ${maxLength} characters.`}
      }
    }

    return null;
  }
}