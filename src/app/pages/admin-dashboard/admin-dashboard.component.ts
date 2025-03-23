import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PocketBaseService } from '../../services/pocketbase.service';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

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

  searchTerm: string = '';
  sortOrder: 'newest' | 'oldest' = 'newest';

  retailerRegisRecords: any[] = [];
  filteredRetailerRegis: any[] = [];
  showRetailerRegis: boolean = false;
  loadingRetailer: boolean = false;
  retailerErrorMsg: string = '';
  searchTermRetailer: string = '';
  sortOrderRetailer: 'newest' | 'oldest' = 'newest';

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

  applyFilters() {
    let filtered = [...this.vapeRegisRecords];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter((r) =>
        r.sponsorName?.toLowerCase().includes(term)
      );
    }

    if (this.sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    } else {
      filtered.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
    }

    this.filteredVapeRegis = filtered;
  }

  downloadExcel() {
    const dataToExport = this.filteredVapeRegis.length
      ? this.filteredVapeRegis
      : this.vapeRegisRecords;

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'VapeRegis');
    XLSX.writeFile(workbook, 'vape_regis.xlsx');
  }

  toggleRetailerRegis() {
    if (!this.showRetailerRegis) {
      this.loadRetailerRegisRecords();
    }
    this.showRetailerRegis = !this.showRetailerRegis;
  }

  async loadRetailerRegisRecords() {
    try {
      this.loadingRetailer = true;
      this.retailerErrorMsg = '';

      const data = await this.pb.getAllRetailerRegisRecords();

      this.retailerRegisRecords = data;
      this.applyRetailerFilters();

      if (!data.length) {
        this.retailerErrorMsg = 'No records found in retailer_regis.';
      }
    } catch (error) {
      this.retailerErrorMsg = 'Failed to load retailer_regis records.';
      console.error('Error fetching retailer_regis records:', error);
    } finally {
      this.loadingRetailer = false;
    }
  }

  applyRetailerFilters() {
    let filtered = [...this.retailerRegisRecords];

    if (this.searchTermRetailer.trim()) {
      const term = this.searchTermRetailer.toLowerCase();
      filtered = filtered.filter((r) =>
        r.business_name?.toLowerCase().includes(term)
      );
    }

    if (this.sortOrderRetailer === 'newest') {
      filtered.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    } else {
      filtered.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
    }

    this.filteredRetailerRegis = filtered;
  }

  downloadRetailerExcel() {
    const dataToExport = this.filteredRetailerRegis.length
      ? this.filteredRetailerRegis
      : this.retailerRegisRecords;

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'RetailerRegis');
    XLSX.writeFile(workbook, 'retailer_regis.xlsx');
  }
}
