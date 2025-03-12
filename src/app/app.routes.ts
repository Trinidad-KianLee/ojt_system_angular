import { Routes } from '@angular/router';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BusinessScopeComponent } from './business-scope/business-scope.component';

export const routes: Routes = [
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'registration-form', component: RegistrationFormComponent },
  { path: '', component: LandingPageComponent },
  { path: 'business-scope', component: BusinessScopeComponent },
  { path: '**', redirectTo: '/landing-page' }
];

