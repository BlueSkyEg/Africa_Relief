import {
  Component,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatchPasswordValidator } from '../../../core/validators/match-password.validator';
import { PasswordValidator } from '../../../core/validators/password.validator';
import { FieldComponent } from '../../../shared/components/form/field/field.component';
import { LabelComponent } from '../../../shared/components/form/label/label.component';
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { ErrorComponent } from '../../../shared/components/form/error/error.component';
import { ButtonComponent } from '../../../shared/components/form/button/button.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconEyeComponent } from '../../../shared/icons/eye/icon-eye.component';
import { IconEyeOffComponent } from '../../../shared/icons/eye-off/icon-eye-off.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser } from '../../../shared/interfaces/auth/user.interface';
import { IconEditComponent } from '../../../shared/icons/edit/icon-edit.component';
import { IconSpinnerComponent } from '../../../shared/icons/spinner/icon-spinner.component';
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { FileValidator } from '../../../core/validators/file.validator';
import { EmailValidator } from '../../../core/validators/email.validator';
import { StringValidator } from '../../../core/validators/string.validator';
import { PhoneValidator } from '../../../core/validators/phone.validator';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MetaService } from '../../../core/services/meta-data/meta.service';
@Component({
  selector: 'app-profile-settings',
  standalone: true,
  templateUrl: './profile-settings.component.html',
  styles: ``,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormElementDirective,
    FieldComponent,
    LabelComponent,
    ErrorComponent,
    ButtonComponent,
    IconEyeComponent,
    IconEyeOffComponent,
    IconEditComponent,
    ModalComponent,
  ],
})
export class ProfileSettingsComponent implements OnInit {
  user: IUser;
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  _MetaService: MetaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId); // Determine if running on browser
  ngOnInit(): void {
    if (this.isBrowser) {
      this._MetaService.setCanonicalURL(window.location.href);

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this._MetaService.setCanonicalURL(window.location.href);
        });
    }

    this.setAuthUserInfoToEditProfileForm();
  }

  /*
    -----------------------------
    -- Change User Profile Image
    -----------------------------
  */
  imagePreview: string;
  @ViewChild('imagePreviewModal') imagePreviewModal: ModalComponent;

  changeProfileImgForm = this.fb.group({
    profileImg: [
      '',
      [
        Validators.required,
        FileValidator(['image/png', 'image/jpeg', 'image/webp']),
      ],
    ],
  });

  onChangeProfileImg(): void {
    this.imagePreviewModal.closeModal();
    const formData = new FormData();
    formData.append('img', this.changeProfileImgForm.controls.profileImg.value);
    this.authService.changeUserImage(formData).subscribe({
      next: (res: IApiResponse<IUser>) => {
        if (res.success) {
          this.authService.authedUserSubject.next(res.data);
        }
      },
    });
  }

  onSelectProfileImg(event): void {
    const file = event.target.files[0];
    if (file) {
      this.displayProfileImgErrors();

      this.changeProfileImgForm.patchValue({ profileImg: file });

      if (this.changeProfileImgForm.valid) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imagePreview = reader.result as string;
          this.imagePreviewModal.openModal();
        };
      }
    }
  }

  displayProfileImgErrors(): void {
    this.changeProfileImgForm.controls.profileImg.valueChanges.subscribe({
      next: () => {
        const errors = this.changeProfileImgForm.controls.profileImg.errors;
        if (errors) {
          this._snackBar.open(Object.values(errors)[0], '✖', {
            panelClass: 'failure-snackbar',
          });
        }
      },
    });
  }

  /*
    -------------------
    -- Edit User info
    -------------------
  */
  editProfileFormDisabled: boolean = true;

  editProfileForm = this.fb.group({
    name: ['', [Validators.required, StringValidator()]],
    email: ['', [Validators.required, EmailValidator()]],
    username: ['', [StringValidator(3, 50, true)]],
    phone: ['', [PhoneValidator()]],
  });

  onEditProfile() {
    this.editProfileFormDisabled = true;
    this.authService.updateUserInfo(this.editProfileForm.value).subscribe({
      next: (res: IApiResponse<IUser>) => {
        if (res.success) {
          this._snackBar.open('Profile updated Successfully.', '✖', {
            panelClass: 'success-snackbar',
          });
        } else if (res.message == 'validation error') {
          for (const control in res.errors) {
            this.editProfileForm
              .get(control)
              .setErrors({ serverError: res.errors[control][0] });
          }
        } else {
          this._snackBar.open(res.message, '✖', {
            panelClass: 'failure-snackbar',
          });
        }
      },
    });
  }

  setAuthUserInfoToEditProfileForm(): void {
    this.authService.authedUserSubject.asObservable().subscribe({
      next: (value: IUser) => {
        if (value) {
          this.editProfileForm.patchValue({
            name: value.name,
            email: value.email,
            username: value.username,
            phone: value.phone,
          });
          this.user = value;
          this.trackChnagesToEditProfileForm(value);
        }
      },
    });
  }

  /*
    - Track changes to the edit profile page controls.
    - If the email or name is defferent from the current values the form will be enabled.
  */
  trackChnagesToEditProfileForm(user: IUser): void {
    this.editProfileForm.valueChanges.subscribe({
      next: (newValue) => {
        if (
          newValue.email != user.email ||
          newValue.name.trim() != user.name ||
          newValue.username != user.username ||
          newValue.phone != user.phone
        ) {
          this.editProfileFormDisabled = false;
        } else {
          this.editProfileFormDisabled = true;
        }
      },
    });
  }

  /*
    -------------------------
    -- Change User Password
    -------------------------
  */
  changeProfilePassworedFormDisabled: boolean = false;
  showPassword: boolean = false;

  changeProfilePassworedForm = this.fb.group(
    {
      currentPassword: ['', [Validators.required]],
      password: ['', [Validators.required, PasswordValidator()]],
      password_confirmation: ['', [Validators.required]],
    },
    { validator: [MatchPasswordValidator()] } as AbstractControlOptions
  );

  onChangeProfilePasswored() {
    this.changeProfilePassworedFormDisabled = true;
    this.authService
      .changeUserPassword(this.changeProfilePassworedForm.value)
      .subscribe({
        next: (res: IApiResponse<IUser>) => {
          if (res.success) {
            if (this.isBrowser) {
              localStorage.clear();
            }
            this.router.navigateByUrl('/login');
            this._snackBar.open('Password changed successfully.', '✖', {
              panelClass: 'success-snackbar',
            });
          } else if (res.message == 'validation error') {
            for (const control in res.errors) {
              this.changeProfilePassworedForm
                .get(control)
                .setErrors({ serverError: res.errors[control][0] });
            }
          } else {
            this._snackBar.open(res.message, '✖', {
              panelClass: 'failure-snackbar',
            });
          }
          this.changeProfilePassworedFormDisabled = false;
        },
      });
  }

  /*
    -------------------------------
    -- Password Strength Indicator
    -------------------------------
  */
  passwordStrenth: number = 0;

  onTypePassword() {
    let password = this.changeProfilePassworedForm.controls.password.value;
    let tempPasswordStrenth = 0;

    if (/[a-z]+/.test(password)) tempPasswordStrenth++;
    if (/^(?=.*[0-9])(?=.*[A-Z]).+$/.test(password)) tempPasswordStrenth++;
    if (/[!@#$%^&*()_+{}|:"<>?]+/.test(password)) tempPasswordStrenth++;
    if (password.length > 8) tempPasswordStrenth++;

    this.passwordStrenth = tempPasswordStrenth;
  }
}
