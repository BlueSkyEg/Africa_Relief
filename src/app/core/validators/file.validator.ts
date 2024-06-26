import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function FileValidator(allowedTypes: string[], maxSizeInMb: number = 2): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;

    if (file) {
      const maxSize = maxSizeInMb * 1024 * 1024; // File size in byte

      if (!allowedTypes.includes(file.type)) {
        return { file: `Only ( ${allowedTypes.map(t => t.replace(/^\w+\//, '')).join(', ')} ) format is allowed.` };
      }

      if (file.size > maxSize) {
        return { file: `File size must be less than ${maxSizeInMb}MB.` };
      }
    }

    return null;
  };
}