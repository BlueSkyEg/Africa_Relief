import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { BlogsComponent } from './components/blogs/blogs.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'blogs', component: BlogsComponent}
];
