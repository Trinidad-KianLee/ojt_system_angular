import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PocketBaseService } from '../../services/pocketbase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  firstName: string = '';
  showLogoutModal: boolean = false;
  showWelcomeOverlay: boolean = true;

  vapeRegisRecords: any[] = [];
  filteredVapeRegis: any[] = [];
  showVapeRegis: boolean = false;
  loadingVape: boolean = false;
  errorMsg: string = '';

  // For search & sort
  searchTerm: string = '';
  sortOrder: 'newest' | 'oldest' = 'newest';

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
    if (!this.showVapeRegis) {
      this.loadVapeRegisRecords();
    }
    this.showVapeRegis = !this.showVapeRegis;
  }

  async loadVapeRegisRecords() {
    try {
      this.loadingVape = true;
      this.errorMsg = '';

      const data = await this.pb.getAllVapeRegisRecords();

      this.vapeRegisRecords = data;
      this.applyFilters();

      if (!data.length) {
        this.errorMsg = 'No records found in vape_regis.';
      }
    } catch (error) {
      this.errorMsg = 'Failed to load vape_regis records.';
      console.error('Error fetching vape_regis records:', error);
    } finally {
      this.loadingVape = false;
    }
  }

  // Filters & sorting
  applyFilters() {
    let filtered = [...this.vapeRegisRecords];

    // 1) Search by sponsorName
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter((r) =>
        r.sponsorName?.toLowerCase().includes(term)
      );
    }

    // 2) Sort by newest or oldest (using "created" field)
    if (this.sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    } else {
      filtered.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
    }

    this.filteredVapeRegis = filtered;
  }
}
