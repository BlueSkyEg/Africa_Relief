import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { BlogsComponent } from './components/blogs/blogs.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SingleProjectComponent } from './components/single-project/single-project.component';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { GetInvolvedComponent } from './components/get-involved/get-involved.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { ForgotPasswordComponent } from './components/user/forget-password/forgot-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CareersComponent } from './components/careers-pages/careers/careers.component';
import { SingleCareerComponent } from './components/careers-pages/single-career/single-career.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDonationsComponent } from './components/profile/profile-donations/profile-donations.component';
import { ProfileSubscriptionsComponent } from './components/profile/profile-subscriptions/profile-subscriptions.component';
import { ProfileSettingsComponent } from './components/profile/profile-settings/profile-settings.component';
import { VerifyEmailComponent } from './components/user/verify-email/verify-email.component';
import { AuthGuard } from './core/Guards/auth.guard';
import { GuestGuard } from './core/Guards/guest.guard';
import { DonationComponent } from './components/donation/donation.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', title: 'Home', component: HomeComponent},
  {path: 'blogs', title: 'Blogs', component: BlogsComponent},
  {path: 'blogs', title: 'Blogs', children: [
    {path: 'category/:slug', component: BlogsComponent},
    {path: ':slug', component: SingleBlogComponent}
  ]},
  {path: 'projects', title: 'Project', component: ProjectsComponent},
  {path: 'projects', children: [
    {path: 'category/:slug', component: ProjectsComponent},
    {path: ':slug', component: SingleProjectComponent}
  ]},
  {path: 'get-involved', title: 'Get Involved', component: GetInvolvedComponent},
  {path: 'contact', title: 'Contact Us', component: ContactComponent},
  {path: 'about', title: 'About Us', component: AboutComponent},
  {path: 'login', title: 'Login', canActivate: [GuestGuard], component: LoginComponent},
  {path: 'sign-up', title: 'Sign Up', canActivate: [GuestGuard], component: SignupComponent},
  {path: 'forgot-password', title: 'Forgot Password', canActivate: [GuestGuard], component: ForgotPasswordComponent},
  {path: 'reset-password', title: 'Reset Password', canActivate: [GuestGuard], component: ResetPasswordComponent},
  {path: 'verify-email', title: 'Verify Email', canActivate: [AuthGuard], component: VerifyEmailComponent},
  {path: 'gallery', title: 'Gallery', component: GalleryComponent},
  {path: 'careers', title: 'Careers', component: CareersComponent},
  {path: 'careers', children: [
    {path: ':slug', component: SingleCareerComponent}
  ]},
  {path: 'profile', component: ProfileComponent, children: [
    {path: '', title: 'Profile Donations', canActivate: [AuthGuard], component: ProfileDonationsComponent},
    {path: 'subscriptions', title: 'Profile Subscription', canActivate: [AuthGuard], component: ProfileSubscriptionsComponent},
    {path: 'settings', title: 'Account Settings', canActivate: [AuthGuard], component: ProfileSettingsComponent}
  ]},
  {path: 'donation', title: 'Donation', component: DonationComponent}
];
