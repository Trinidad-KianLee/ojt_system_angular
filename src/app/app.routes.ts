import { Routes } from '@angular/router';
import { LandingpageOrigComponent } from './landingpage-orig/landingpage-orig.component';
import { LoginComponent } from './login/login.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { WarehouseRegComponent } from './warehouse-reg/warehouse-reg.component';
import { LandingRegistrationComponent } from './landing-registration/landing-registration.component';
import { LandingPageRetailerComponent } from './landing-page-retailer/landing-page-retailer.component';
import { AuthGuard } from './guards/auth.guard';
import { loginRedirectGuard } from './guards/login-redirect.guard';
import { AgeGatingComponent } from './age-gating/age-gating.component';
import { RetailerRegisComponent } from './retailer-regis/retailer-regis.component';
import { UpdatedLandingpageComponent } from './updated-landingpage/updated-landingpage.component';


export const routes: Routes = [
  { path: '', redirectTo: 'landingpage-orig', pathMatch: 'full' },
  { path: 'landingpage-orig', component: LandingpageOrigComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginRedirectGuard]},
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'landing-registration', component: LandingRegistrationComponent},
  { path: 'age-gating', component: AgeGatingComponent, canActivate: [AuthGuard]},
  { path: 'landing-page-retailer', component: LandingPageRetailerComponent},
  { path: 'registration-form', component: RegistrationFormComponent, canActivate: [AuthGuard] },
  { path: 'retailer-regis', component: RetailerRegisComponent, canActivate: [AuthGuard]},
  { path: 'warehouse-reg', component: WarehouseRegComponent },
  { path: 'user-registration', component: RegistrationFormComponent, canActivate: [AuthGuard] },
  { path: 'warehouse-reg', component: WarehouseRegComponent, canActivate: [AuthGuard] },
  { path: 'updated-landingpage', component: UpdatedLandingpageComponent},
  { path: '**', redirectTo: 'landingpage-orig' }
];
