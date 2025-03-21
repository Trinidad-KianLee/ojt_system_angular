import { Routes } from '@angular/router';
import { LandingpageOrigComponent } from './pages/user-dashboard/landingpage-orig/landingpage-orig.component';
import { LoginComponent } from './pages/login/login.component';
import { TermsConditionsComponent } from './pages/user-dashboard/terms-conditions/terms-conditions.component';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { WarehouseRegComponent } from './pages/user-dashboard/warehouse-reg/warehouse-reg.component';
import { LandingRegistrationComponent } from './pages/user-dashboard/landing-registration/landing-registration.component';
import { LandingPageRetailerComponent } from './pages/user-dashboard/landing-page-retailer/landing-page-retailer.component';
import { AuthGuard } from './guards/auth.guard';
import { loginRedirectGuard } from './guards/login-redirect.guard';
import { AgeGatingComponent } from './pages/user-dashboard/age-gating/age-gating.component';
import { RetailerRegisComponent } from './pages/user-dashboard/retailer-regis/retailer-regis.component';
import { UpdatedLandingpageComponent } from './pages/user-dashboard/updated-landingpage/updated-landingpage.component';
import { ForgotPasswordComponent } from './pages/user-dashboard/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { VapeRegisComponent } from './pages/user-dashboard/vape-regis/vape-regis.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'landingpage-orig', pathMatch: 'full' },
  { path: 'landingpage-orig', component: LandingpageOrigComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginRedirectGuard] },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'terms-conditions', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'landing-registration', component: LandingRegistrationComponent},
  { path: 'age-gating', component: AgeGatingComponent, canActivate: [AuthGuard] },
  { path: 'landing-page-retailer', component: LandingPageRetailerComponent },
  { path: 'registration-form', component: RegistrationFormComponent, canActivate: [AuthGuard] },
  { path: 'retailer-regis', component: RetailerRegisComponent, canActivate: [AuthGuard] },
  { path: 'vape-regis', component: VapeRegisComponent, canActivate: [AuthGuard] },
  { path: 'warehouse-reg', component: WarehouseRegComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'user-registration', component: RegistrationFormComponent, canActivate: [AuthGuard] },
  { path: 'warehouse-reg', component: WarehouseRegComponent, canActivate: [AuthGuard] },
  { path: 'updated-landingpage', component: UpdatedLandingpageComponent },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  

  { path: '**', redirectTo: 'landingpage-orig' }
];
