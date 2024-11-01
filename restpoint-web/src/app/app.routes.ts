import { Routes } from '@angular/router';
import { ClientComponent } from './features/client/client.component';
import { ViewClientComponent } from './features/client/view-client/view-client.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'client', component: ClientComponent },
  { path: 'client/:id', component: ViewClientComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
