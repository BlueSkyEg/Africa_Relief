import {
  Component,
  Inject,
  inject,
  PLATFORM_ID,
  Type,
  ViewChild,
} from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { IconIslamComponent } from '../../shared/icons/donation-page/islam/icon-islam.component';
import { IconEarthComponent } from '../../shared/icons/donation-page/earth/icon-earth.component';
import { IconHeartComponent } from '../../shared/icons/donation-page/heart/icon-heart.component';
import { IconOrphanComponent } from '../../shared/icons/projects/orphan/icon-orphan.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FieldComponent } from '../../shared/components/form/field/field.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import {
  MatStepperModule,
  StepperOrientation,
} from '@angular/material/stepper';
import { StringValidator } from '../../core/validators/string.validator';
import { EmailValidator } from '../../core/validators/email.validator';
import { PhoneValidator } from '../../core/validators/phone.validator';
import { ErrorComponent } from '../../shared/components/form/error/error.component';
import { IUser } from '../../shared/interfaces/auth/user.interface';
import { AuthService } from '../../core/services/auth/auth.service';
import { CardElementsComponent } from '../donation-pages/donation/card-elements/card-elements.component';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment/payment.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StripeService } from 'ngx-stripe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { PaymentMethodResult } from '@stripe/stripe-js';
import { IStripeIntent } from '../../shared/interfaces/payment/stripe-intent.interface';
import { IApiResponse } from '../../shared/interfaces/api-response-interface';
import * as countryCodes from 'country-codes-list';
import { IBillingDetails } from '../../shared/interfaces/payment/billing-details.interface';
import { IconHandHeartComponent } from '../../shared/icons/donation-page/hand-heart/icon-hand-heart.component';
import { IconHelpComponent } from '../../shared/icons/donation-page/help/icon-help.component';
import { IconRightComponent } from '../../shared/icons/right/icon-right.component';
import { ProjectService } from '../../core/services/projects/project.service';
import { ICategory } from '../../shared/interfaces/category-interface';
import { IProject } from '../../shared/interfaces/project/project-interface';
import { MatSelect, MatOption, MatFormField } from '@angular/material/select';
import { IconExpandMoreComponent } from '../../shared/icons/expand-more/icon-eye.component';

@Component({
  selector: 'app-donation-page',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    FieldComponent,
    LabelComponent,
    MatAutocompleteModule,
    MatStepperModule,
    ErrorComponent,
    CardElementsComponent,
    IconHandHeartComponent,
    IconHelpComponent,
    IconRightComponent,
    IconOrphanComponent,
    MatSelect,
    IconExpandMoreComponent,
    MatFormField,
  ],
  templateUrl: './donation-page.component.html',
})
export class DonationPageComponent {
  // Display projects
  Categories: any[] = [
    {
      id: 1,
      name: 'Help where most needed',
      imageSrc: 'assets/images/donationPages/image01.webp',
      iconName: 'app-icon-heart',
      slug: 'help-where-it-is-most-needed',
    },
    {
      id: 2,
      name: 'Sponsor an orphan',
      imageSrc: 'assets/images/donationPages/image02.webp',
      iconName: 'app-icon-orphan',
      slug: 'orphans-sponsorship',
    },
    {
      id: 3,
      name: 'Wells, health, Food, Education',
      imageSrc: 'assets/images/donationPages/image03.webp',
      iconName: 'app-icon-earth',
    },
    {
      id: 4,
      name: 'Islamic giving',
      imageSrc: 'assets/images/donationPages/image04.webp',
      iconName: 'app-icon-islam',
    },
  ];

  @ViewChild(CardElementsComponent) stripeCardElements: CardElementsComponent;
  name: string;
  email: string;
  phone: string;
  contributionType: string;
  contributionName: string;
  city: string;
  country: string;
  donationFormId: number;
  donationFormTitle: string;
  amount: number;
  stepperOrientation: Observable<StepperOrientation>;
  coverFees: boolean = false;
  feePercentage: number = 2.9;
  isChecked: boolean = false;
  selectedCategoryId: number | null = null;
  projectCategories: ICategory[];
  displayedCategories: ICategory[] = [];
  amounts: any[] = [];
  project: IProject = null;
  makeRecurringDonation: boolean = false;
  recurringPeriod: 'day' | 'week' | 'month' | 'year' = 'month';
  recurring_periods: any = [];
  //orphan project
  orphanGeneral: boolean = false;
  orphanSponsorship: boolean = false;
  selectedAmount = 0;
  selectedOrphans = 1;
  totalAmount = 0;

  updateTotal() {
    if (this.orphanSponsorship) {
      this.totalAmount = this.selectedAmount * this.selectedOrphans;
    } else {
      this.selectedAmount = 0;
      this.totalAmount = 0;
    }
  }
  resetAmount() {
    if (!this.orphanGeneral) {
      this.amount = 0;
    }
  }

  resetSponsorship() {
    if (!this.orphanSponsorship) {
      this.selectedAmount = 0;
      this.selectedOrphans = 1;
      this.totalAmount=0; // Reset to default value if needed
    }
  }
  // Injected services
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  fb: FormBuilder = inject(FormBuilder);
  paymentService: PaymentService = inject(PaymentService);
  authService: AuthService = inject(AuthService);
  _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  _stripeService: StripeService = inject(StripeService);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  _gtmService: GoogleTagManagerService = inject(GoogleTagManagerService);
  projectService: ProjectService = inject(ProjectService);

  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.getCategories();
    this.updateContributionValidators();
    this.loadUserData();
    if (this.filteredDedications.length > 0) {
      this.donationForm.controls.contributionType.setValue(
        this.filteredDedications[0]
      );
    }
  }

  donationForm = this.fb.group({
    // Personal Details
    firstName: ['', [Validators.required, StringValidator()]],
    lastName: ['', [Validators.required, StringValidator()]],
    email: ['', [Validators.required, EmailValidator()]],
    phone: ['', [Validators.required, PhoneValidator()]],
    contributionType: ['', [Validators.required]],
    contributionName: ['', [Validators.required]],

    // Billing Details
    country: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}$/)]],
    addressLine1: ['', [Validators.required, StringValidator(2, 100, true)]],
    addressLine2: ['', [StringValidator(0, 100, true)]],
    city: ['', [Validators.required, StringValidator(2, 20, false)]],
    state: ['', [Validators.required, StringValidator(2, 20, true)]],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    anonymousDonation: [''],

    // Checkout Details
    billingComment: ['', [StringValidator(0, 500, true)]],
    coverFees: [false],
  });

  // Load user data
  loadUserData() {
    if (this.isBrowser) {
      this.authService.authedUserSubject.asObservable().subscribe({
        next: (user: IUser) => {
          this.donationForm.patchValue({
            firstName: user?.name.split(' ')[0],
            lastName: user?.name.split(' ')[1],
            email: user?.email,
            phone: user?.phone,
            contributionName: user?.contributionName,
            contributionType: user?.contributionType,
          });
        },
      });
    }
  }

  // Get categories and projects
  getCategories() {
    this.projectService.getProjectCategories().subscribe({
      next: (res: IApiResponse<ICategory[]>) => {
        this.projectCategories = res.data;
      },
    });
  }

  // Get project details
  getProject(slug: string) {
    this.projectService.getProject(slug).subscribe({
      next: (res: IApiResponse<IProject>) => {
        this.project = res.data;
        this.amounts = res.data.donation_form.levels;
        this.recurring_periods = res.data.donation_form.recurring_periods;
        this.donationFormId = res.data.donation_form.id;
        this.donationFormTitle = res.data.title; // Set title from response
        console.log('Project Data:', res.data);
      },
      error: (err) => {
        console.error('Error fetching project:', err);
      },
    });
  }

  // Select category
  selectCategory(categoryId: number) {
    this.amount = 0;
    this.selectedAmount = 0;
    this.selectedOrphans = 1;
    this.totalAmount = 0;
    this.donationForm.reset();
    this.orphanSponsorship = false;
    this.orphanGeneral = false;
    this.isChecked = false;
    this.selectedCategoryId =
      this.selectedCategoryId === categoryId ? null : categoryId;
  }

  // Get icon components
  getComponent(iconName: string): Type<any> | null {
    const iconMap: Record<string, Type<any>> = {
      'app-icon-heart': IconHeartComponent,
      'app-icon-orphan': IconOrphanComponent,
      'app-icon-earth': IconEarthComponent,
      'app-icon-islam': IconIslamComponent,
    };

    return iconMap[iconName] || null;
  }

  // Make donation
  onMakeDonation() {
    console.log('Donation Form:', this.donationForm);
    if (this.donationForm.invalid) {
      console.log(
        'Form is invalid',
        this.donationForm.errors,
        this.donationForm.getRawValue()
      );
      return;
    }
    if (this.donationForm.invalid || !this.stripeCardElements.isCardValid())
      return;

    this.coverFees = this.donationForm.get('coverFees')?.value || false;

    if (this.isBrowser) {
      sessionStorage.setItem('donationStarted', JSON.stringify(true));
    }

    const formData = this.donationForm.getRawValue();
    console.log('Form Data:', formData);

    const {
      firstName,
      lastName,
      email,
      phone,
      contributionType,
      contributionName,
      city,
      country,
      addressLine1,
      addressLine2,
      postalCode,
      state,
    } = formData;

    const billingDetails: any = {
      firstName,
      lastName,
      email,
      phone,
      city,
      country,
      addressLine1,
      addressLine2,
      postalCode,
      state,
    };

    const finalAmount = this.amount + this.totalAmount;
    this.coverFees = this.donationForm.get('coverFees')?.value || false;

    this.stripeCardElements.createPaymentMethod(billingDetails).subscribe({
      next: (res: PaymentMethodResult) => {
        if (res.error) {
          this._snackBar.open(res.error.message, '✖', {
            panelClass: 'failure-snackbar',
          });
          this.pushTagFailedDonationEvent(res.error.message);
          return;
        }

        this.createPayment(
          res.paymentMethod.id,
          finalAmount.toString()
        ).subscribe({
          next: (res: IApiResponse<IStripeIntent>) => {
            console.log(res);
            if (res?.data?.status === 'succeeded') {
              this.pushTagConfirmDonationEvent();
              this.router.navigateByUrl('/donation-confirmation');
            } else if (res?.data?.status === 'requires_action') {
              this.handleCardAction(res.data.client_secret);
            } else {
              this._snackBar.open('Your card was declined.', '✖', {
                panelClass: 'failure-snackbar',
              });
              this.pushTagFailedDonationEvent('Your card was declined.');
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
    });
  }

  // Handle Payment
  createPayment(
    stripePaymentMethodId: string,
    finalAmount: any
  ): Observable<IApiResponse<IStripeIntent>> {
    const {
      firstName,
      lastName,
      email,
      contributionName,
      contributionType,
      billingComment,
      anonymousDonation,
    } = this.donationForm.getRawValue();

    const paymentData = {
      name: `${firstName} ${lastName}`,
      email: email,
      contribution: this.isChecked
        ? [
            {
              contributionName: contributionName,
              contributionType: contributionType,
            },
          ]
        : null,
      amount: finalAmount,
      donationFormId: this.donationFormId.toString(),
      stripePaymentMethodId: stripePaymentMethodId,
      recurringPeriod: this.recurringPeriod,
      anonymousDonation: anonymousDonation || false,
      savePaymentMethod: this.recurringPeriod ? true : false,
      billingComment: billingComment,
      coverFees: this.coverFees,
    };
    console.log('Payment Data:', {
      amount: finalAmount,
      donationFormId: this.donationFormId.toString(),
      formData: this.donationForm.getRawValue(),
      isRecurring: this.recurringPeriod ? true : false,
      contribution: this.isChecked
        ? {
            contributionName: contributionName,
            contributionType: contributionType,
          }
        : null,
    });

    return this.paymentService.createPayment(paymentData);
  }

  // Handle 3D Secure Authentication (OTP)
  handleCardAction(clientSecret: string): void {
    this._stripeService.confirmCardPayment(clientSecret).subscribe({
      next: (res) => {
        if (res.error) {
          this._snackBar.open(res.error.message, '✖', {
            panelClass: 'failure-snackbar',
          });

          this.pushTagFailedDonationEvent(res.error.message);
        } else {
          this.pushTagConfirmDonationEvent();
          this.router.navigateByUrl('/donation-confirmation');
        }
      },
    });
  }

  // Push Google Tag Manager Donation Confirmation Event
  pushTagConfirmDonationEvent(): void {
    const gtmTag = {
      event: 'donationConfirmation',
      donationAmount: this.amount,
      donationFormTitle: this.donationFormTitle,
      userName: this.name,
      userEmail: this.email,
      userPhone: this.phone,
      billingDetails: {
        city: this.city,
        country: this.country,
      },
      recurringPeriod: this.recurringPeriod,
    };
    this._gtmService.pushTag(gtmTag);
  }

  // Push Google Tag Manager Donation Failed Event
  pushTagFailedDonationEvent(donationFaildReason: string): void {
    const gtmTag = {
      event: 'donationFaild',
      faildReason: donationFaildReason,
    };
    this._gtmService.pushTag(gtmTag);
  }

  // Filter Countries by Name
  countries: countryCodes.CountryData[] = countryCodes.all();
  filteredCountries: countryCodes.CountryData[] = this.countries;

  filterCountries(searchTerm: string): void {
    this.filteredCountries = Object.entries(this.countries)
      .map((e) => e[1])
      .filter((el) =>
        el.countryNameEn.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }

  // Filter dedication types
  dedicationTypes = ['In Memory Of', 'In Honor Of'];
  filteredDedications = this.dedicationTypes;

  filterDedication(searchTerm: string): void {
    this.filteredDedications = this.dedicationTypes.filter((dedication) =>
      dedication.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onChangeCountry(country: countryCodes.CountryData) {
    this.donationForm.controls.country.setValue(country.countryCode);
  }
  onChangeDedication(dedication: string): void {
    this.donationForm.controls.contributionType.setValue(dedication);
  }

  getOptionText(option: countryCodes.CountryData) {
    return option ? option.countryNameEn : null;
  }

  getOptionTextDetection(option: string): string {
    return option ? option : null;
  }

  // DataLayer
  onFillPersonalDetails() {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'UserFilledPersonalDetailsForm(firstStage)',
      });
    }
  }

  onFillBillingAddress() {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'UserFilledBillingAddressForm(SecondStage)',
      });
    }
  }

  onCheckboxChange() {
    this.updateContributionValidators();
  }

  updateContributionValidators() {
    if (this.isChecked) {
      // Make fields required
      this.donationForm
        .get('contributionType')
        ?.setValidators([Validators.required]);
      this.donationForm
        .get('contributionName')
        ?.setValidators([Validators.required]);
    } else {
      // Make fields optional
      this.donationForm.get('contributionType')?.clearValidators();
      this.donationForm.get('contributionName')?.clearValidators();
      this.donationForm.get('contributionType')?.setValue(null);
      this.donationForm.get('contributionName')?.setValue(null);
    }
    // Update the form validation status after modifying validators
    this.donationForm.get('contributionType')?.updateValueAndValidity();
    this.donationForm.get('contributionName')?.updateValueAndValidity();
  }

  //amounts
  validateKeyPress(event: KeyboardEvent): void {
    // Allow only digits and prevent the negative symbol
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Replace any non-digit character and ensure positive values
    input.value = input.value.replace(/[^0-9]/g, '');
  }
}
