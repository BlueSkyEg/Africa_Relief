import { AbstractControl } from "@angular/forms";

export function MatchPasswordValidator(control: AbstractControl) {
  if(!control.get('confirmPassword')!.value) {
    control.get("confirmPassword")!.setErrors({required: true});
  } else if (control.get('password')!.value !== control.get('confirmPassword')!.value) {
    control.get("confirmPassword")!.setErrors({mismatch: true});
  }
}
