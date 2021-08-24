import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { AddClientComponent } from '../app/components/add-client/add-client.component';
import { EditClientComponent } from '../app/components/edit-client/edit-client.component';
import { ClientDetailsComponent } from '../app/components/client-details/client-details.component';
import { SettingsComponent } from '../app/components/settings/settings.component';
import { NotFoundComponent } from '../app/components/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

const routes: Routes = [
  {path:"", component: DashboardComponent, canActivate: [AuthGuard]},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent, canActivate: [RegisterGuard]},
  {path:"client/add", component: AddClientComponent, canActivate: [AuthGuard]},
  {path:"client/edit/:id", component: EditClientComponent, canActivate: [AuthGuard]},
  {path:"client/:id", component: ClientDetailsComponent, canActivate: [AuthGuard]},
  {path:"settings", component: SettingsComponent, canActivate: [AuthGuard]},
  {path:"**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
  providers: [AuthGuard, RegisterGuard]
})
export class AppRoutingModule { }