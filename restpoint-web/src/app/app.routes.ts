import { Routes } from '@angular/router';
import { ClientComponent } from './features/client/client.component';
import { ViewClientComponent } from './features/client/view-client/view-client.component';
import { HomeComponent } from './features/home/home.component';
import { FamilyMemberComponent } from './features/family-member/family-member.component';
import { AddClientComponent } from './features/client/add-client/add-client.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ServerErrorComponent } from './shared/components/server-error/server-error.component';
import { AddFamilyMemberComponent } from './features/family-member/add-family-member/add-family-member.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'client', component: ClientComponent },
  { path: 'client/add-client', component: AddClientComponent },
  { path: 'client/:id', component: ViewClientComponent },
  { path: 'client/:id/add-family-member', component: AddFamilyMemberComponent },
  { path: 'family-member', component: FamilyMemberComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
