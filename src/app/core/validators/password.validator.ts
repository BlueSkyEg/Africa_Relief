import { AbstractControl } from "@angular/forms";

export function PasswordValidator(control: AbstractControl) {
  let password = control.get('password')!.value;
  console.log(password);

  if (!password) {
    control.get('password')!.setErrors({required: true})
  }else if (!/[A-Z]+/.test(password)) {
    control.get('password')!.setErrors({uppercase: true})
  } else if (!/[a-z]+/.test(password)) {
    control.get('password')!.setErrors({lowercase: true})
  } else if (!/[0-9]+/.test(password)) {
    control.get('password')!.setErrors({numeric: true})
  } else if (!/[$@^!%*?&]+/.test(password)) {
    control.get('password')!.setErrors({special: true})
  } else if (password.length < 8) {
    control.get('password')!.setErrors({minLength: true})
  }
}
