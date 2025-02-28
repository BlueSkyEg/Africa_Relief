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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import {
  MatSelect,
  MatOption,
  MatFormField,
  MatLabel,
} from '@angular/material/select';
import { IconExpandMoreComponent } from '../../shared/icons/expand-more/icon-eye.component';
import { IProjectCard } from '../../shared/interfaces/project/project-card-interface';

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
    IconEarthComponent,
    IconIslamComponent,
    RouterLink,
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
  selectedCategoryIds: number[] = [];
  projectCategories: ICategory[];
  displayedCategories: ICategory[] = [];
  amounts: any[] = [];

  projects: IProjectCard[] = [];
  makeRecurringDonation: boolean = false;
  recurringPeriod: 'day' | 'week' | 'month' | 'year' = 'month';
  recurring_periods: any = [];
  //orphan project
  orphanGeneral: boolean = false;
  orphanSponsorship: boolean = false;
  selectedAmount = 0;
  selectedOrphans = 1;
  totalAmount = 0;
  //categories
  wellsChecked: boolean = false;
  foodChecked: boolean = false;

  // Education Centers Projects
  educationChecked: boolean = false;
  selectedEducationProjectSlug: string | null = null;
  selectedEducationProject: any = null;
  educationAmount: number = 0;

  // Health Care Projects
  healthChecked: boolean = false;
  selectedHealthProjectSlug: string | null = null;
  selectedHealthProject: any = null;
  healthAmount: number = 0;

  selectedProjectSlug: string | null = null;
  selectedProject: any = null; // Stores project details

  wellsAmount: number = 0;
  foodAmount: number = 0;
  selectedWellsProject: any = null;
  selectedFoodProject: any = null;
  selectedFoodSlug: string | null = null;
  selectedEducationSlug: string | null = null;
  selectedHealthSlug: string | null = null;
  selectedWellsSlug: string | null = null;

  iftarMealChecked: boolean = false;
  zakatAlMalChecked: boolean = false;
  zakatAlFitrChecked: boolean = false;
  iftarMealAmounts: any[] = [];
  zakatAlMalAmounts: any[] = [];
  zakatAlFitrAmounts: any[] = [];
  iftarMealAmount: number = 0;
  zakatAlMalAmount: number = 0;
  zakatAlFitrAmount: number = 0;
  totalIftarMealAmount: number = 0;
  totalZakatAlFitrAmount: number = 0;
  selectedMeals: number = 1;
  selectedZakatAlFitrAmount: number = 1;

  amount1: number = 0;
  amount2: number = 0;
  project1: any = [];
  project2: any = [];

  updateIftarMealTotal() {
    this.totalIftarMealAmount =
      this.iftarMealAmounts[0].amount * this.selectedMeals;
    return this.totalIftarMealAmount;
  }
  updateZakatAlFitrTotal() {
    this.totalZakatAlFitrAmount =
      this.zakatAlFitrAmounts[0].amount * this.selectedZakatAlFitrAmount;
    return this.totalZakatAlFitrAmount;
  }

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

  onCategoriesCheckboxChange() {
    if (!this.wellsChecked) {
      this.wellsAmount = 0;
      this.selectedWellsProject = null;
      this.donationFormId = null;
    }
    if (!this.foodChecked) {
      this.foodAmount = 0;
      this.selectedFoodProject = null;

      this.donationFormId = null;
    }
    if (!this.healthChecked) {
      this.healthAmount = 0;
      this.selectedHealthProject = null;
      this.selectedHealthProject = null;

      this.donationFormId = null;
    }
    if (!this.educationChecked) {
      this.selectedEducationProject = null;
      this.educationAmount = 0;
      this.selectedEducationProject = null;

      this.donationFormId = null;
    }
  }
  onIftarMealCheckboxChange() {
    if (this.iftarMealChecked) {
      this.getProject('iftar-meal');
    } else {
      this.donationFormId = null;
    }
    this.selectedProject = null;
    this.selectedProjectSlug = null;
    this.selectedMeals = 1;
    this.totalIftarMealAmount = 0;
  }

  onZakatAlFitrCheckboxChange() {
    if (this.zakatAlFitrChecked) {
      this.getProject('zakat-al-fitr');
    } else {
      this.donationFormId = null;
    }
    this.selectedProject = null;
    this.selectedProjectSlug = null;
    this.selectedZakatAlFitrAmount = 1;
    this.totalZakatAlFitrAmount = 0;
  }
  onZakatAlMalCheckboxChange() {
    this.selectedProject = null;
    this.selectedProjectSlug = null;
    this.zakatAlMalAmount = 0;
  }
  // Component TypeScript
  onEducationProjectSelect(slug: string) {
    if (slug) {
      this.selectedEducationProjectSlug = slug;
      this.projectService.getProject(slug).subscribe({
        next: (res: IApiResponse<IProject>) => {
          this.selectedEducationProject = res.data;
          this.donationFormId = this.selectedEducationProject.donation_form.id;
        },
      });
    } else {
      this.selectedEducationProject = null;
      this.donationFormId = null;
    }
  }

  onHealthProjectSelect(slug: string) {
    if (slug) {
      this.selectedHealthProjectSlug = slug;
      this.projectService.getProject(slug).subscribe({
        next: (res: IApiResponse<IProject>) => {
          this.selectedHealthProject = res.data;
          this.donationFormId = this.selectedHealthProject.donation_form.id;
        },
      });
    } else {
      this.selectedHealthProject = null;
      this.donationFormId = null;
    }
  }
  resetSponsorship() {
    if (!this.orphanSponsorship) {
      this.selectedAmount = 0;
      this.selectedOrphans = 1;
      this.totalAmount = 0; // Reset to default value if needed
    }
  }
  customProjects = [
    { title: 'Sponsorship For African Students', slug: 'students-sponsorship' },
    { title: 'Educational Center', slug: 'educational-center' },
    { title: 'School Bag Donation', slug: 'school-bag-donation' },
  ];
  healthProjects = [
    { title: 'Cataract Surgery', slug: 'cataract-surgery' },
    { title: 'Health Care Initiatives', slug: 'health-care' },
    { title: 'Donate Hearing Aid Device', slug: 'hearing-aid-device' },
  ];
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
  route: ActivatedRoute = inject(ActivatedRoute);
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const categoryId = +params['category'];
      const projectSlug = params['project'];
      const amount = +params['amount'];

      if (categoryId && projectSlug && amount) {
        this.selectCategory(categoryId);
        this.getProject(projectSlug);
        if (projectSlug == 'zakat-al-mal') {
          this.zakatAlMalAmount = amount;
          this.zakatAlMalChecked = true;
        }
      }
    });
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
    if (slug) {
      this.projectService.getProject(slug).subscribe({
        next: (res: IApiResponse<IProject>) => {
          this.selectedProject = res.data;
          // Update the correct amounts array based on the slug
          if (slug === 'iftar-meal') {
            this.iftarMealAmounts = res.data.donation_form.levels;
            this.totalIftarMealAmount = this.iftarMealAmounts[0].amount;
          } else if (slug === 'zakat-al-mal') {
            this.zakatAlMalAmounts = res.data.donation_form.levels;
          } else if (slug === 'zakat-al-fitr') {
            this.zakatAlFitrAmounts = res.data.donation_form.levels;
            this.totalZakatAlFitrAmount = this.zakatAlFitrAmounts[0].amount;
          } else if (slug === 'help-where-it-is-most-needed') {
            this.project1 = res.data;
          } else if (slug === 'orphans-sponsorship') {
            this.project2 = res.data;
          } else if (slug === 'food-basket') {
            this.selectedFoodProject = res.data;
          }
          this.recurring_periods = res.data.donation_form.recurring_periods;
          this.donationFormId = res.data.donation_form.id;
          this.donationFormTitle = res.data.title; // Set title from response
        },
        error: (err) => {
          console.error('Error fetching project:', err);
        },
      });
    } else {
      this.selectedProject = null;
      this.donationFormId = null;
    }
  }
  projectsWithAmounts: any[] = [];

  getProjects(slug: string) {
    this.projectService.getProjects(1, 9, slug).subscribe({
      next: (res) => {
        if (res.data && res.data.data) {
          this.projectsWithAmounts = res.data.data.map((project: any) => ({
            title: project.title,

            slug: project.slug, // Needed to fetch donation amounts
            amounts: [], // Will be populated later
          }));

          // Fetch donation amounts for each project
          this.projectsWithAmounts.forEach((project) => {
            this.getProjectAmounts(project.slug);
          });
        }
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      },
    });
  }

  getProjectAmounts(slug: string) {
    this.projectService.getProject(slug).subscribe({
      next: (res) => {
        // Find project in the list and update its amounts
        const project = this.projectsWithAmounts.find((p) => p.slug === slug);
        if (project && res.data.donation_form) {
          project.amounts = res.data.donation_form.levels || [];
          this.donationFormId = res.data.donation_form.id;
        }
      },
      error: (err) => {
        console.error(`Error fetching donation levels for ${slug}:`, err);
      },
    });
  }

  // Select category
  selectCategory(categoryId: number) {
    const index = this.selectedCategoryIds.indexOf(categoryId);
    if (index === -1) {
      this.selectedCategoryIds.push(categoryId);
    } else {
      this.selectedCategoryIds.splice(index, 1);

      switch (categoryId) {
        case 1:
          this.amount1 = 0;
          this.project1 = null;
          this.donationFormId = null;

          break;

        case 2: // Category 2: Sponsor an orphan
          this.selectedAmount = 0;
          this.selectedOrphans = 1;
          this.totalAmount = 0;
          this.orphanSponsorship = false;
          this.orphanGeneral = false;
          this.amount2 = 0;
          this.project2 = null;
          this.donationFormId = null;

          break;

        case 3: // Category 3: Wells, health, Food, Education
          this.wellsChecked = false;
          this.healthChecked = false;
          this.educationChecked = false;
          this.foodChecked = false;
          this.wellsAmount = 0;
          this.foodAmount = 0;
          this.educationAmount = 0;
          this.healthAmount = 0;
          this.selectedEducationProject = null;
          this.selectedHealthProject = null;
          this.donationFormId = null;

          break;

        case 4: // Category 4: Islamic giving
          this.iftarMealChecked = false;
          this.zakatAlMalChecked = false;
          this.zakatAlFitrChecked = false;
          this.iftarMealAmount = 0;
          this.totalIftarMealAmount = 0;
          this.zakatAlMalAmount = 0;
          this.zakatAlFitrAmount = 0;
          this.totalZakatAlFitrAmount = 0;
          this.donationFormId = null;

          break;

        default:
          break;
      }
    }

    this.donationForm.reset();
    this.isChecked = false;
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
    if (this.donationForm.invalid) {
      return;
    }
    if (this.donationForm.invalid || !this.stripeCardElements.isCardValid())
      return;

    this.coverFees = this.donationForm.get('coverFees')?.value || false;

    if (this.isBrowser) {
      sessionStorage.setItem('donationStarted', JSON.stringify(true));
    }

    const formData = this.donationForm.getRawValue();

    // Get selected projects and amounts
    const selectedProjectsAndAmounts = this.getSelectedProjectsAndAmounts();

    // Concatenate with billing comment
    const billingComment = formData.billingComment
      ? `${formData.billingComment}\n\nSelected Projects:\n${selectedProjectsAndAmounts}`
      : `Selected Projects:\n${selectedProjectsAndAmounts}`;

    const {
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

    const finalAmount =
      this.amount1 +
      this.amount2 +
      this.totalAmount +
      this.totalIftarMealAmount +
      this.totalZakatAlFitrAmount +
      this.zakatAlMalAmount +
      this.healthAmount +
      this.wellsAmount +
      this.educationAmount +
      this.foodAmount;

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
          finalAmount.toString(),
          billingComment // Pass the updated billing comment
        ).subscribe({
          next: (res: IApiResponse<IStripeIntent>) => {
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
          },
        });
      },
    });
  }

  // Handle Payment
  createPayment(
    stripePaymentMethodId: string,
    finalAmount: any,
    billingComment: string
  ): Observable<IApiResponse<IStripeIntent>> {
    const {
      firstName,
      lastName,
      email,
      contributionName,
      contributionType,
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
      recurringPeriod: this.makeRecurringDonation ? this.recurringPeriod : null,
      anonymousDonation: anonymousDonation || false,
      savePaymentMethod: this.recurringPeriod ? true : false,
      billingComment: billingComment, // Use the updated billing comment
      coverFees: this.coverFees,
    };


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
      recurringPeriod: this.makeRecurringDonation ? this.recurringPeriod : null,
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

  //track selected projects
  getSelectedProjectsAndAmounts(): string {
    let selectedProjects = [];

    // Project 1
    if (this.amount1 > 0 && this.project1) {
      selectedProjects.push(`${this.project1.title}: $${this.amount1}`);
    }

    // Project 2 (Orphan Sponsorship)
    if (this.amount2 > 0 && this.project2) {
      selectedProjects.push(`${this.project2.title}: $${this.amount2}`);
    }

    // Orphan Sponsorship
    if (this.totalAmount > 0) {
      selectedProjects.push(`Orphan Sponsorship: $${this.totalAmount}`);
    }

    // Wells
    if (this.wellsAmount > 0) {
      selectedProjects.push(`Wells: $${this.wellsAmount}`);
    }

    // Food Aid
    if (this.foodAmount > 0) {
      selectedProjects.push(`Food Aid: $${this.foodAmount}`);
    }

    // Education
    if (this.educationAmount > 0 && this.selectedEducationProject) {
      selectedProjects.push(
        `${this.selectedEducationProject.title}: $${this.educationAmount}`
      );
    }

    // Health
    if (this.healthAmount > 0 && this.selectedHealthProject) {
      selectedProjects.push(
        `${this.selectedHealthProject.title}: $${this.healthAmount}`
      );
    }

    // Iftar Meal
    if (this.totalIftarMealAmount > 0) {
      selectedProjects.push(`Iftar Meal: $${this.totalIftarMealAmount}`);
    }

    // Zakat Al-Mal
    if (this.zakatAlMalAmount > 0) {
      selectedProjects.push(`Zakat Al-Mal: $${this.zakatAlMalAmount}`);
    }

    // Zakat Al-Fitr
    if (this.totalZakatAlFitrAmount > 0) {
      selectedProjects.push(`Zakat Al-Fitr: $${this.totalZakatAlFitrAmount}`);
    }

    return selectedProjects.join(', ');
  }
}
