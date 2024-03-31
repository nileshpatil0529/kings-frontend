import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormGroup,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';

const containsCharactersRegex: RegExp = /[a-zA-Z]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function passwordValidator(formGroup: FormGroup) {
  const password = formGroup.get('password');
  const confirmPassword = formGroup.get('confirmPasswordControl');
  if (
    confirmPassword?.errors &&
    !confirmPassword.errors['confirmedValidator']
  ) {
    return;
  }
  return password?.value === confirmPassword?.value
    ? confirmPassword?.setErrors(null)
    : confirmPassword?.setErrors({ passwordNotMatch: true });
}

// export function emailOrPhoneCheck(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value: string = control.value;
//     if (containsCharactersRegex.test(value) && value) {
//       return emailRegex.test(control.value) ? null : { email: true };
//     } else if (!containsCharactersRegex.test(value) && value) {
//       return value.length === 10 ? null : { phone: true };
//     } else {
//       return null;
//     }
//   };
// }

export function emailOrObileExist(): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let dataUser;
    return new Promise((resolve) => {
      setTimeout(() => {
        dataUser = '1212121212';
        resolve (control.value === dataUser ? { exist: true } : null);
      }, 2000); // Resolves after 2 seconds
    });
  };
}
