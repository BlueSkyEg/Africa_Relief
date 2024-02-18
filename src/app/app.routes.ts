import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { BlogsComponent } from './components/blogs/blogs.component';
import { ProjectsComponent } from './components/projects/projects.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'blogs/category/:slug', component: BlogsComponent},
  {path: 'blogs', component: BlogsComponent},
  {path: 'projects/category/:slug', component: ProjectsComponent},
  {path: 'projects', component: ProjectsComponent},
];
