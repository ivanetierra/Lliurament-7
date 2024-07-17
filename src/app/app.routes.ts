import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StarshipsComponent } from './components/starships/starships.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]
