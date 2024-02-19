import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { BlogsComponent } from './components/blogs/blogs.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SingleProjectComponent } from './components/single-project/single-project.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', title: 'Home', component: HomeComponent},
  {path: 'blogs/category/:slug', title: 'Blogs', component: BlogsComponent},
  {path: 'blogs', title: 'Blogs', component: BlogsComponent},
  {path: 'projects/category/:slug', title: 'Project', component: ProjectsComponent},
  {path: 'projects', title: 'Project', component: ProjectsComponent},
  {path: 'projects/:slug', title: 'Project', component: SingleProjectComponent}
];
