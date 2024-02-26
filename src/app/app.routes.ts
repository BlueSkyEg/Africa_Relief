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
import { ForgetPasswordComponent } from './components/user/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CareersComponent } from './components/careers-pages/careers/careers.component';

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
  {path: 'login', title: 'Login', component: LoginComponent},
  {path: 'sign-up', title: 'Sign Up', component: SignupComponent},
  {path: 'forget-password', title: 'Forget Password', component: ForgetPasswordComponent},
  {path: 'reset-password', title: 'Reset Password', component: ResetPasswordComponent},
  {path: 'gallery', title: 'Gallery', component: GalleryComponent},
  {path: 'careers', title: 'Careers', component: CareersComponent}
];
