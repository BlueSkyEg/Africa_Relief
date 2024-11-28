import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonLinkComponent } from "../../../shared/components/button-link/button-link.component";

@Component({
  selector: 'app-verify-email',
  standalone: true,
  templateUrl: './verify-email.component.html',
  styles: ``,
  imports: [ButtonLinkComponent],
})
export class VerifyEmailComponent implements OnInit {
  emailVerified: boolean = null;
  verifyParamsUri: string = null;
  authService: AuthService = inject(AuthService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.verifyParamsUri =
      this.activeRoute.snapshot.queryParamMap.get('verifyParamsUri');
    if (this.verifyParamsUri) {
      this.authService.verifyEmail(this.verifyParamsUri).subscribe({
        next: (res) => {
          if (res.success) {
            this.emailVerified = true;
          } else {
            this.emailVerified = false;
          }
        },
      });
    }
  }
}
