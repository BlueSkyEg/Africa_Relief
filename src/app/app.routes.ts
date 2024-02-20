import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { BlogsComponent } from './components/blogs/blogs.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SingleProjectComponent } from './components/single-project/single-project.component';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { GetInvolvedComponent } from './components/get-involved/get-involved.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', title: 'Home', component: HomeComponent},
  {path: 'blogs', title: 'Blogs', component: BlogsComponent},
  {path: 'blogs', children: [
    {path: 'category/:slug', component: BlogsComponent},
    {path: ':slug', component: SingleBlogComponent}
  ]},
  {path: 'projects', title: 'Project', component: ProjectsComponent},
  {path: 'projects', children: [
    {path: 'category/:slug', title: 'Project', component: ProjectsComponent},
    {path: ':slug', title: 'Project', component: SingleProjectComponent}
  ]},
  {path: 'get-involved', title: 'Get Involved', component: GetInvolvedComponent},
  {path: 'contact', title: 'Contact Us', component: ContactComponent},
  {path: 'about', title: 'About Us', component: AboutComponent}
];
