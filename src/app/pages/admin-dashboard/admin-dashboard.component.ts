import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PocketBaseService } from '../../services/pocketbase.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  firstName: string = '';
  showLogoutModal: boolean = false;
  showWelcomeOverlay: boolean = true;

  vapeRegisRecords: any[] = [];
  showVapeRegis: boolean = false;
  loadingVape: boolean = false;
  errorMsg: string = '';

  constructor(
    public pb: PocketBaseService,
    private router: Router
  ) {
    const userData = this.pb.getUserData();
    this.firstName = userData ? userData['firstName'] : '';
  }

  closeWelcomeOverlay(): void {
    this.showWelcomeOverlay = false;
  }

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  cancelLogout() {
    this.showLogoutModal = false;
  }

  confirmLogout() {
    this.showLogoutModal = false;
    this.pb.logout();
    this.router.navigate(['login']);
  }

  toggleVapeRegis() {
    // If the table is hidden, load records. Otherwise, just toggle off.
    if (!this.showVapeRegis) {
      this.loadVapeRegisRecords();
    }
    this.showVapeRegis = !this.showVapeRegis;
  }

  async loadVapeRegisRecords() {
    try {
      this.loadingVape = true;
   
      // Fetch the vape_regis data
      const data = await this.pb.getAllVapeRegisRecords();

 

      // Assign to local array
      this.vapeRegisRecords = data;

      // Optional: if data is empty, show a message
      if (!data.length) {
        this.errorMsg = 'No records found in vape_regis.';
      } else {
        this.errorMsg = '';
      }
    } catch (error) {
      this.errorMsg = 'Failed to load vape_regis records.';
      console.error('Error fetching vape_regis records:', error);
    } finally {
      this.loadingVape = false;
    }
  }
}
