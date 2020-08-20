import { AuthGuardGuard } from './guards/auth-guard.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingComponent } from './components/setting/setting.component';
import { LoginComponent } from './components/login/login.component';
import { DetailClientComponent } from './components/detail-client/detail-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuardGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "client/add", component: AddClientComponent, canActivate: [AuthGuardGuard] },
  { path: "client/edit/:id", component: EditClientComponent, canActivate: [AuthGuardGuard] },
  { path: "client/show/:id", component: DetailClientComponent, canActivate: [AuthGuardGuard] },
  { path: "Setting", component: SettingComponent, canActivate: [AuthGuardGuard] },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
