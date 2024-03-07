import { Component, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatchPasswordValidator } from '../../../core/validators/match-password.validator';
import { PasswordValidator } from '../../../core/validators/password.validator';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-settings.component.html',
  styles: ``
})
export class ProfileSettingsComponent {
  fb: FormBuilder = inject(FormBuilder);

  changeProfileImgForm = this.fb.group({
    profileImg: ['', [Validators.required]]
  })

  editProfileForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', Validators.required, Validators.email]
  });

  changeProfilePassworedForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    password: [''],
    confirm_password: ['']
  }, {validator: [PasswordValidator, MatchPasswordValidator]} as AbstractControlOptions)

  onChangeProfileImg() {

  }

  onEditProfile() {

  }

  OnChangeProfilePasswored() {

  }
}
