import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { StarshipComponent } from './components/starship/starship.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'starship/:id', component: StarshipComponent }
];
