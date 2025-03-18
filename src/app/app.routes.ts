import { Routes } from '@angular/router';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import {  WarehouseRegComponent } from './warehouse-reg/warehouse-reg.component';
import { BusinessScopeComponent } from './business-scope/business-scope.component';
import { LandingpageOrigComponent } from './landingpage-orig/landingpage-orig.component';
import { RetailerComponent } from './retailer/retailer.component';
import { LandingPageRetailerComponent } from './landing-page-retailer/landing-page-retailer.component';

export const routes: Routes = [
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'registration-form', component: RegistrationFormComponent },
  { path: '', component: LandingpageOrigComponent },
  { path: 'warehouse-reg', component: WarehouseRegComponent },
  { path: 'business-scope', component: BusinessScopeComponent },
  { path: 'landingpage-orig', component: LandingpageOrigComponent },
  { path: 'retailer', component: RetailerComponent},
  { path: 'landing-page-retailer', component: LandingPageRetailerComponent},
  { path: '**', redirectTo: '/landingpage-orig' }
  
];

