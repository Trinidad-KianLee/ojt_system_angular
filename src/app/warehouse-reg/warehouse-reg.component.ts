import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PocketBaseService } from '../services/pocketbase.service'; // or your AuthService

@Component({
  selector: 'app-warehouse-reg',
  templateUrl: './warehouse-reg.component.html'
})
export class WarehouseRegComponent {
  constructor(
    private pbService: PocketBaseService, // or your AuthService
    private router: Router
  ) {}

  goToRegister() {
    if (!this.pbService.isLoggedIn()) {
      alert('You must log in first!');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/registration-form']);
  }
  
}
