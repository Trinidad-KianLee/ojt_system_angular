import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PocketBaseService } from '../../services/pocketbase.service';
import { FormsModule } from '@angular/forms';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { MatMenuModule } from '@angular/material/menu';
import * as XLSX from 'xlsx';
import { LoadingModalComponent } from '../../loading-modal/loading-modal.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DialogModule, MatMenuModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
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

  pendingUsers: any[] = [];
  showPendingUsers: boolean = false;
  loadingPending: boolean = false;
  pendingErrorMsg: string = '';

  approvedUsers: any[] = [];
  showApprovedUsers: boolean = false;
  loadingApproved: boolean = false;
  approvedErrorMsg: string = '';

  psLicenseRecords: any[] = [];
  filteredPsLicense: any[] = [];
  showPsLicense: boolean = false;
  loadingPsLicense: boolean = false;
  psLicenseErrorMsg: string = '';
  searchTermPsLicense: string = '';
  sortOrderPsLicense: 'newest' | 'oldest' = 'newest';

  constructor(
    public pb: PocketBaseService,
    private router: Router,
    private dialog: Dialog
  ) {
    const userData = this.pb.getUserData();
    this.firstName = userData ? userData['firstName'] : '';
  }

  ngOnInit(): void {
    this.loadPendingUsers();
  }

  closeWelcomeOverlay(): void {
    this.showWelcomeOverlay = false;
  }

  openLogoutModal(): void {
    this.showLogoutModal = true;
  }

  cancelLogout(): void {
    this.showLogoutModal = false;
  }

  confirmLogout(): void {
    this.showLogoutModal = false;
    this.pb.logout();
    this.router.navigate(['new-login']);
  }

  toggleVapeRegis(): void {
    if (!this.showVapeRegis) {
      this.loadVapeRegisRecords();
    }
    this.showVapeRegis = !this.showVapeRegis;
  }

  async loadVapeRegisRecords(): Promise<void> {
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

  applyFilters(): void {
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

  downloadExcel(): void {
    const dataToExport = this.filteredVapeRegis.length
      ? this.filteredVapeRegis
      : this.vapeRegisRecords;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'VapeRegis');
    XLSX.writeFile(workbook, 'vape_regis.xlsx');
  }

  toggleRetailerRegis(): void {
    if (!this.showRetailerRegis) {
      this.loadRetailerRegisRecords();
    }
    this.showRetailerRegis = !this.showRetailerRegis;
  }

  async loadRetailerRegisRecords(): Promise<void> {
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

  applyRetailerFilters(): void {
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

  downloadRetailerExcel(): void {
    const dataToExport = this.filteredRetailerRegis.length
      ? this.filteredRetailerRegis
      : this.retailerRegisRecords;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'RetailerRegis');
    XLSX.writeFile(workbook, 'retailer_regis.xlsx');
  }

  togglePendingUsers(): void {
    if (!this.showPendingUsers) {
      this.loadPendingUsers();
    }
    this.showPendingUsers = !this.showPendingUsers;
  }

  async loadPendingUsers(): Promise<void> {
    try {
      this.loadingPending = true;
      this.pendingErrorMsg = '';
      this.pendingUsers = await this.pb.getPendingUsers();
      if (!this.pendingUsers.length) {
        this.pendingErrorMsg = 'No pending users found.';
      }
    } catch (error) {
      this.pendingErrorMsg = 'Failed to load pending users.';
      console.error('Error fetching pending users:', error);
    } finally {
      this.loadingPending = false;
    }
  }

  approveUser(userId: string): void {
    this.dialog.open(LoadingModalComponent);
    this.pb.approveUser(userId)
      .then(() => {
        this.dialog.closeAll();
        const user = this.pendingUsers.find(u => u.id === userId);
        if (user) {
          const oldStatus = user.status || 'pending';
          user.status = 'approved';
          const adminData = this.pb.getUserData();
          const logData = {
            adminId: adminData?.id,
            adminName: adminData?.['firstName'],
            colName: 'users',
            recordId: userId,
            oldStatus: oldStatus,
            newStatus: 'approved',
            timestamp: new Date().toISOString()
          };
          return this.pb.createAdminLog(logData);
        } else {
          return Promise.resolve(null);
        }
      })
      .then(log => {
        if (log) {
          console.log('Admin log for user approval created:', log);
        }
      })
      .catch(err => {
        console.error('Error approving user or logging action:', err);
      });
  }

  denyUser(userId: string): void {
    this.pb.denyUser(userId)
      .then(() => {
        const user = this.pendingUsers.find(u => u.id === userId);
        if (user) {
          const oldStatus = user.status || 'pending';
          user.status = 'denied';
          const adminData = this.pb.getUserData();
          const logData = {
            adminId: adminData?.id,
            adminName: adminData?.['firstName'],
            colName: 'users',
            recordId: userId,
            oldStatus: oldStatus,
            newStatus: 'denied',
            timestamp: new Date().toISOString()
          };
          return this.pb.createAdminLog(logData);
        } else {
          return Promise.resolve(null);
        }
      })
      .then(log => {
        if (log) {
          console.log('Admin log for user denial created:', log);
        }
      })
      .catch(err => {
        console.error('Error denying user or logging action:', err);
      });
  }

  getUserFileUrl(users: any, fileKey: string): string {
    return this.pb.getUserAttachmentUrl(users, fileKey);
  }

  toggleApprovedUsers(): void {
    if (!this.showApprovedUsers) {
      this.loadApprovedUsers();
    }
    this.showApprovedUsers = !this.showApprovedUsers;
  }

  async loadApprovedUsers(): Promise<void> {
    try {
      this.loadingApproved = true;
      this.approvedErrorMsg = '';
      this.approvedUsers = await this.pb.getApprovedUsers();
      if (!this.approvedUsers.length) {
        this.approvedErrorMsg = 'No approved users found.';
      }
    } catch (error) {
      this.approvedErrorMsg = 'Failed to load approved users.';
      console.error('Error fetching approved users:', error);
    } finally {
      this.loadingApproved = false;
    }
  }

  updateVapeStatus(record: any, newStatus: string): void {
    const oldStatus = record.applicationStatus;
    record.applicationStatus = newStatus;
    this.pb.updateVapeRecordStatus(record.id, newStatus)
      .then(updated => {
        console.log('Vape record updated:', updated);
        const adminData = this.pb.getUserData();
        const logData = {
          adminId: adminData?.id,
          adminName: adminData?.['firstName'],
          colName: 'vape_regis',
          recordId: record.id,
          oldStatus: oldStatus,
          newStatus: newStatus,
          timestamp: new Date().toISOString()
        };
        return this.pb.createAdminLog(logData);
      })
      .then(log => {
        console.log('Admin log created:', log);
      })
      .catch(err => {
        console.error('Error updating vape status or logging admin action:', err);
      });
  }

  updateRetailerStatus(record: any, newStatus: string): void {
    const oldStatus = record.applicationStatus;
    record.applicationStatus = newStatus;
    this.pb.updateRetailerRecordStatus(record.id, newStatus)
      .then(updated => {
        console.log('Retailer record updated:', updated);
        const adminData = this.pb.getUserData();
        const logData = {
          adminId: adminData?.id,
          adminName: adminData?.['firstName'],
          colName: 'retailer_regis',
          recordId: record.id,
          oldStatus: oldStatus,
          newStatus: newStatus,
          timestamp: new Date().toISOString()
        };
        return this.pb.createAdminLog(logData);
      })
      .then(log => {
        console.log('Admin log created:', log);
      })
      .catch(err => {
        console.error('Error updating retailer status or logging admin action:', err);
      });
  }

  togglePsLicense(): void {
    if (!this.showPsLicense) {
      this.loadPsLicenseRecords();
    }
    this.showPsLicense = !this.showPsLicense;
  }

  async loadPsLicenseRecords(): Promise<void> {
    try {
      this.loadingPsLicense = true;
      this.psLicenseErrorMsg = '';
      const data = await this.pb.getAllPsLicenseRecords();
      // Set default status if not defined
      this.psLicenseRecords = data.map(record => ({
        ...record,
        applicationStatus: record.applicationStatus || 'Application received'
      }));
      this.applyPsLicenseFilters();
      if (!data.length) {
        this.psLicenseErrorMsg = 'No records found in ps_license_regis.';
      }
    } catch (error) {
      this.psLicenseErrorMsg = 'Failed to load PS License records.';
      console.error('Error fetching PS License records:', error);
    } finally {
      this.loadingPsLicense = false;
    }
  }

  applyPsLicenseFilters(): void {
    let filtered = [...this.psLicenseRecords];
    if (this.searchTermPsLicense.trim()) {
      const term = this.searchTermPsLicense.toLowerCase();
      filtered = filtered.filter((r) =>
        r.company_name?.toLowerCase().includes(term)
      );
    }
    if (this.sortOrderPsLicense === 'newest') {
      filtered.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    } else {
      filtered.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
    }
    this.filteredPsLicense = filtered;
  }

  updatePsLicenseStatus(record: any, newStatus: string): void {
    const oldStatus = record.applicationStatus || 'Application received';
    record.applicationStatus = newStatus;
    this.pb.updatePsLicenseRecordStatus(record.id, newStatus)
      .then(updated => {
        console.log('PS License record updated:', updated);
        const adminData = this.pb.getUserData();
        const logData = {
          adminId: adminData?.id,
          adminName: adminData?.['firstName'],
          colName: 'ps_license_regis',
          recordId: record.id,
          oldStatus: oldStatus,
          newStatus: newStatus,
          timestamp: new Date().toISOString()
        };
        return this.pb.createAdminLog(logData);
      })
      .then(log => {
        console.log('Admin log created:', log);
      })
      .catch(err => {
        console.error('Error updating PS License status or logging admin action:', err);
        // Revert the status on error
        record.applicationStatus = oldStatus;
      });
  }

  downloadPsLicenseExcel(): void {
    const dataToExport = this.filteredPsLicense.length
      ? this.filteredPsLicense
      : this.psLicenseRecords;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PsLicenseRegis');
    XLSX.writeFile(workbook, 'ps_license_regis.xlsx');
  }

  getStatusButtonClass(status: string): string {
    switch (status) {
      case 'Application received':
        return 'btn-info';
      case 'Pending':
        return 'btn-warning';
      case 'Ongoing evaluation':
        return 'bg-orange-500 text-white';
      case 'For approval':
        return 'bg-orange-600 text-white';
      case 'Approved':
        return 'btn-success';
      default:
        return 'btn-ghost';
    }
  }
}
