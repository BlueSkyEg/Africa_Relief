import { Routes } from '@angular/router';
import { GuestGuard } from './core/Guards/guest.guard';
import { AuthGuard } from './core/Guards/auth.guard';
import { YoussefAbdallahComponent } from './components/about/youssef-abdallah/youssef-abdallah.component';
import { StockDonationsComponent } from './components/get-involved/stock-donations/stock-donations.component';
import { GiftMatchingComponent } from './components/get-involved/gift-matching/gift-matching.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'blogs',
    title: 'Blogs',
    loadComponent: () =>
      import('./components/blogs-pages/blogs/blogs.component').then(
        (m) => m.BlogsComponent
      ),
  },
  {
    path: 'search/:term',
    title: 'Result Search Page',
    loadComponent: () =>
      import('./components/search-results/search-results.component').then(
        (m) => m.SearchResultsComponent
      ),
  },
  {
    path: 'blogs',
    title: 'Blogs',
    children: [
      {
        path: 'category/:slug',
        loadComponent: () =>
          import('./components/blogs-pages/blogs/blogs.component').then(
            (m) => m.BlogsComponent
          ),
      },
      {
        path: ':slug',
        loadComponent: () =>
          import(
            './components/blogs-pages/single-blog/single-blog.component'
          ).then((m) => m.SingleBlogComponent),
      },
    ],
  },
  {
    path: 'projects',
    title: 'Projects',
    loadComponent: () =>
      import('./components/projects-pages/projects/projects.component').then(
        (m) => m.ProjectsComponent
      ),
  },
  {
    path: 'projects',
    title: 'projects',
    children: [
      {
        path: 'category/:slug',
        loadComponent: () =>
          import(
            './components/projects-pages/projects/projects.component'
          ).then((m) => m.ProjectsComponent),
      },
      {
        path: ':slug',
        loadComponent: () =>
          import(
            './components/projects-pages/single-project/single-project.component'
          ).then((m) => m.SingleProjectComponent),
      },
    ],
  },
  {
    path: 'get-involved',
    title: 'Get Involved',
    loadComponent: () =>
      import('./components/get-involved/get-involved.component').then(
        (m) => m.GetInvolvedComponent
      ),
  },
  {
    path: 'get-involved/stock-donations',
    component: StockDonationsComponent,
  },
  {
    path: 'get-involved/gift-matching',
    component: GiftMatchingComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'contact',
    title: 'Contact Us',
    loadComponent: () =>
      import('./components/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: 'emergency',
    title: 'Emergency Response',
    loadComponent: () =>
      import('./components/emergency/emergency.component').then(
        (m) => m.EmergencyComponent
      ),
    children: [
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      {
        path: 'projects',
        title: 'Crisis Projects',
        loadComponent: () =>
          import('./components/emergency/projects/projects.component').then(
            (m) => m.ProjectsComponent
          ),
      },
      // Uncomment when needed
      // {
      //   path: 'blogs',
      //   title: 'Crisis Blogs',
      //   loadComponent: () =>
      //     import('./components/emergency/blogs/blogs.component').then(
      //       (m) => m.BlogsEmergeny
      //     ),
      // },
    ],
  },
  {
    path: 'about',
    title: 'About Us',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  { path: 'about/executive-director', component: YoussefAbdallahComponent },

  {
    path: 'login',
    title: 'Login',
    canActivate: [GuestGuard],
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'sign-up',
    title: 'Sign Up',
    canActivate: [GuestGuard],
    loadComponent: () =>
      import('./components/auth/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
  },
  {
    path: 'forgot-password',
    title: 'Forgot Password',
    canActivate: [GuestGuard],
    loadComponent: () =>
      import(
        './components/auth/forget-password/forgot-password.component'
      ).then((m) => m.ForgotPasswordComponent),
  },
  {
    path: 'reset-password',
    title: 'Reset Password',
    canActivate: [GuestGuard],
    loadComponent: () =>
      import('./components/auth/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: 'verify-email',
    title: 'Verify Email',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/auth/verify-email/verify-email.component').then(
        (m) => m.VerifyEmailComponent
      ),
  },
  {
    path: 'gallery',
    title: 'Gallery',
    loadComponent: () =>
      import('./components/gallery/gallery.component').then(
        (m) => m.GalleryComponent
      ),
  },
  {
    path: 'careers',
    title: 'Careers',
    loadComponent: () =>
      import('./components/careers-pages/careers/careers.component').then(
        (m) => m.CareersComponent
      ),
  },
  {
    path: 'careers',
    children: [
      {
        path: ':slug',
        loadComponent: () =>
          import(
            './components/careers-pages/single-career/single-career.component'
          ).then((m) => m.SingleCareerComponent),
      },
    ],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    children: [
      {
        path: '',
        title: 'Account',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './components/profile/profile-settings/profile-settings.component'
          ).then((m) => m.ProfileSettingsComponent),
      },
      {
        path: 'donations',
        title: 'Donations',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './components/profile/profile-donations/profile-donations.component'
          ).then((m) => m.ProfileDonationsComponent),
      },
      {
        path: 'subscriptions',
        title: 'Subscriptions',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './components/profile/profile-subscriptions/profile-subscriptions.component'
          ).then((m) => m.ProfileSubscriptionsComponent),
      },
    ],
  },
  {
    path: 'donation',
    title: 'Donation',
    loadComponent: () =>
      import('./components/donation-pages/donation/donation.component').then(
        (m) => m.DonationComponent
      ),
  },
  {
    path: 'donation-confirmation',
    title: 'Donation Confirmation',
    loadComponent: () =>
      import(
        './components/donation-pages/donation-confirmation/donation-confirmation.component'
      ).then((m) => m.DonationConfirmationComponent),
  },
  {
    path: 'donation-failed',
    title: 'Donation Failed',
    loadComponent: () =>
      import(
        './components/donation-pages/donation-failed/donation-failed.component'
      ).then((m) => m.DonationFailedComponent),
  },
  {
    path: '404',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./components/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
  { path: '**', redirectTo: '404' },
];
