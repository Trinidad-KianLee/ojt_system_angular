import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TermsConditionsComponent } from './pages/user-dashboard/terms-conditions/terms-conditions.component';
import { WarehouseRegistrationComponent } from './pages/user-dashboard/warehouse-registration/warehouse-registration.component';
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
import { AdminLogsComponent } from './pages/admin-logs/admin-logs.component';
import { PsLicenseRegistrationComponent } from './pages/user-dashboard/ps-license-application/ps-license-registration.component';
import { AgeGatingRegistrationComponent } from './pages/user-dashboard/age-gating-registration/age-gating-registration.component';

import { AdminGuard } from './guards/admin.guard';
import { NewLandingpageComponent } from './pages/user-dashboard/new-landingpage/new-landingpage.component';
import { NewLoginComponent } from './pages/new-login/new-login.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { FaqsIndustryComponent } from './pages/faqs-industry/faqs-industry.component';
import { FaqsSupportComponent } from './pages/faqs-support/faqs-support.component';
import { FaqsGeneralComponent } from './pages/faqs-general/faqs-general.component';
import { OsmvComponent } from './pages/user-dashboard/osmv/osmv.component';
import { VapingAreaComponent } from './pages/vaping-area/vaping-area.component';
import { PromoEventsComponent } from './pages/user-dashboard/promo-events/promo-events.component';
import { PslicenseLandingComponent } from './pages/user-dashboard/pslicense-landing/pslicense-landing.component';
import { SocCcrLandingComponent } from './pages/user-dashboard/soc-ccr-landing/soc-ccr-landing.component';
import { SocCcrRegisterComponent } from './pages/user-dashboard/soc-ccr-register/soc-ccr-register.component';
import { FinalLandingPageComponent } from './pages/user-dashboard/final-landing-page/final-landing-page.component';
import { SitemapComponent } from './pages/user-dashboard/sitemap/sitemap.component';
import { ComplaintComponent } from './pages/user-dashboard/complaint/complaint.component';
import { CcsReportComponent } from './pages/user-dashboard/ccs-report/ccs-report.component';
import { CcsDashboardComponent } from './pages/ccs-dashboard/ccs-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'final-landing-page', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, canActivate: [loginRedirectGuard] },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'landing-registration', component: LandingRegistrationComponent },
  { path: 'landing-page-retailer', component: LandingPageRetailerComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'updated-landingpage', component: UpdatedLandingpageComponent },
  { path: 'new-landingpage', component: NewLandingpageComponent },
  { path: 'new-login', component: NewLoginComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'faqs-industry', component: FaqsIndustryComponent },
  { path: 'faqs-support', component: FaqsSupportComponent},
  { path: 'faqs-general', component: FaqsGeneralComponent},
  { path: 'osmv', component: OsmvComponent},
  { path: 'vaping-area', component: VapingAreaComponent},
  { path: 'promo-events', component: PromoEventsComponent},
  { path: 'pslicense-landing', component: PslicenseLandingComponent},
  { path: 'soc-ccr-landing', component: SocCcrLandingComponent},
  { path: 'final-landing-page', component: FinalLandingPageComponent},
  { path: 'sitemap', component: SitemapComponent},
  { path: 'complaint', component: ComplaintComponent},

  { path: 'age-gating', component: AgeGatingComponent},
  { path: 'age-gating-registration', component: AgeGatingRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'warehouse-registration', component: WarehouseRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'retailer-regis', component: RetailerRegisComponent, canActivate: [AuthGuard] },
  { path: 'vape-regis', component: VapeRegisComponent },
  { path: 'warehouse-reg', component: WarehouseRegComponent},
  { path: 'user-registration', component: WarehouseRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'ps-license-registration', component: PsLicenseRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'soc-ccr-registration', component: SocCcrRegisterComponent, canActivate: [AuthGuard] },
  { path: 'ccs-report', component: CcsReportComponent, canActivate: [AuthGuard] },
  { path: 'ccs-dashboard', component: CcsDashboardComponent, canActivate: [AuthGuard] },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  {
    path: 'admin-logs',
    component: AdminLogsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  { path: '**', redirectTo: 'new-landingpage' }
];
