import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { WarehouseRegistrationComponent } from './pages/user-dashboard/warehouse-registration/warehouse-registration.component';

const routes: Routes = [
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    children: [
      { path: 'warehouse-registration', component: WarehouseRegistrationComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }