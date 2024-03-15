import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatchPasswordValidator } from '../../../core/validators/match-password.validator';
import { PasswordValidator } from '../../../core/validators/password.validator';
import { FieldComponent } from "../../../shared/components/form/field/field.component";
import { LabelComponent } from "../../../shared/components/form/label/label.component";
import { FormElementDirective } from '../../../shared/directives/form-element.directive';
import { ErrorComponent } from "../../../shared/components/form/error/error.component";
import { ButtonComponent } from "../../../shared/components/form/button/button.component";
import { CommonModule } from '@angular/common';
import { IconEyeComponent } from "../../../shared/icons/eye/icon-eye.component";
import { IconEyeOffComponent } from "../../../shared/icons/eye-off/icon-eye-off.component";
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser } from '../../../shared/interfaces/auth/user.interface';
import { IconEditComponent } from "../../../shared/icons/edit/icon-edit.component";
import { IconSpinnerComponent } from "../../../shared/icons/spinner/icon-spinner.component";
import { IApiResponse } from '../../../shared/interfaces/api-response-interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModalComponent } from "../../../shared/components/modal/modal.component";

@Component({
    selector: 'app-profile-settings',
    standalone: true,
    templateUrl: './profile-settings.component.html',
    styles: ``,
    imports: [ReactiveFormsModule, CommonModule, FormElementDirective, FieldComponent, LabelComponent, ErrorComponent, ButtonComponent, IconEyeComponent, IconEyeOffComponent, IconEditComponent, IconSpinnerComponent, ModalComponent]
})
export class ProfileSettingsComponent implements OnInit {

  showPassword: boolean = false;
  user: IUser;
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  _snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.authService.authedUserSubject.asObservable().subscribe({
      next: (value: IUser) => {
        if(value) {
          this.editProfileForm.patchValue({name: value.name, email: value.email});
          this.user = value;
        }
      }
    })
  }


  // Change User Profile Image
  imagePreview: string;
  @ViewChild('imagePreviewModal') imagePreviewModal: ModalComponent;

  changeProfileImgForm = this.fb.group({
    profileImg: ['', [Validators.required]]
  })

  onChangeProfileImg() {
    this.imagePreviewModal.closeModal();
    const formData = new FormData();
    formData.append('img', this.changeProfileImgForm.controls.profileImg.value);
    this.authService.changeUserImage(formData).subscribe({
      next: (res: IApiResponse<IUser>) => {
        if(res.success) {
          this.authService.authedUserSubject.next(res.data);
        }
      }
    })
  }

  onSelectProfileImg(event) {
    const file = event.target.files[0];
    if (file) {
      this.changeProfileImgForm.patchValue({profileImg: file});
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.imagePreviewModal.openModal();
      };
    }
  }


  // Edit User info
  editProfileForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
  });

  onEditProfile() {
    this.editProfileForm.controls.email.setErrors({disabled: true});
    this.authService.updateUserInfo(this.editProfileForm.value).subscribe({
      next: (res: IApiResponse<IUser>) => {
        if(res.success) {
          this._snackBar.open('Profile updated successfully', 'close', {duration: 3000});
        } else if(res.message == 'validation error') {
          this.editProfileForm.controls.email.setErrors({emailTaken: true});
        }
      }
    })
  }


  // Change User Password
  changeProfilePassworedForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    password: [''],
    password_confirmation: ['']
  }, {validator: [PasswordValidator, MatchPasswordValidator]} as AbstractControlOptions)

  OnChangeProfilePasswored() {
    this.changeProfilePassworedForm.controls.currentPassword.setErrors({disabled: true});
    this.authService.changeUserPassword(this.changeProfilePassworedForm.value).subscribe({
      next: (res: IApiResponse<IUser>) => {
        if(res.success) {
          localStorage.clear();
          this.router.navigateByUrl('/login');
          this._snackBar.open('Password changed successfully', 'close');
        } else if(res.message == 'validation error') {
          this.changeProfilePassworedForm.controls.currentPassword.setErrors({inccorect: true});
        }
      }
    })
  }


  // Password Strength Indicator
  passwordStrenth: number = 0;

  onTypePassword() {
    let password = this.changeProfilePassworedForm.controls.password.value;
    let tempPasswordStrenth = 0;

    if (/[a-z]+/.test(password)) tempPasswordStrenth++
    if (/^(?=.*[0-9])(?=.*[A-Z]).+$/.test(password)) tempPasswordStrenth++
    if (/[!@#$%^&*()_+{}|:"<>?]+/.test(password)) tempPasswordStrenth++
    if (password.length > 8) tempPasswordStrenth++

    this.passwordStrenth = tempPasswordStrenth;
  }
}
