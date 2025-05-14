import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { PocketBaseService } from '../../services/pocketbase.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ccs-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DialogModule, MatMenuModule],
  templateUrl: './ccs-dashboard.component.html',
  styleUrl: './ccs-dashboard.component.css'
})
export class CcsDashboardComponent implements OnInit {
  firstName: string = '';
  showWelcomeOverlay: boolean = true;
  showLogoutModal: boolean = false;
  
  ccsReports: any[] = [];
  showCcsReports: boolean = false;
  loadingCcsReports: boolean = false;
  ccsReportsErrorMsg: string = '';
  searchTermCcsReports: string = '';
  sortOrderCcsReports: 'newest' | 'oldest' = 'newest';
  filteredCcsReports: any[] = [];
  showCcsReportDetailsModal: boolean = false;
  selectedCcsReport: any = null;

  constructor(
    public pb: PocketBaseService,
    private router: Router,
    private dialog: Dialog
  ) {
    const userData = this.pb.getUserData();
    this.firstName = userData ? userData['firstName'] : '';
  }

  ngOnInit(): void {
    this.loadCcsReports();
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

  async loadCcsReports(): Promise<void> {
    try {
      this.loadingCcsReports = true;
      this.ccsReportsErrorMsg = '';
      const data = await this.pb.getAllCcsReports();
      this.ccsReports = data;
      this.applyCcsReportsFilters();
      if (!data.length) {
        this.ccsReportsErrorMsg = 'No records found.';
      }
    } catch (error) {
      this.ccsReportsErrorMsg = 'Failed to load reports.';
      console.error('Error fetching CCS reports:', error);
    } finally {
      this.loadingCcsReports = false;
    }
  }

  applyCcsReportsFilters(): void {
    let filtered = [...this.ccsReports];

    if (this.searchTermCcsReports) {
      const searchTerm = this.searchTermCcsReports.toLowerCase();
      filtered = filtered.filter(report => 
        report.id.toLowerCase().includes(searchTerm) ||
        report.firstName.toLowerCase().includes(searchTerm) ||
        report.lastName.toLowerCase().includes(searchTerm) ||
        report.reportType?.toLowerCase().includes(searchTerm)
      );
    }

    filtered.sort((a, b) => {
      if (this.sortOrderCcsReports === 'newest') {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      } else {
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      }
    });

    this.filteredCcsReports = filtered;
  }

  downloadCcsReportsExcel(): void {
    const dataToExport = this.filteredCcsReports.length
      ? this.filteredCcsReports
      : this.ccsReports;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'CcsReports');
    XLSX.writeFile(workbook, 'ccs_reports.xlsx');
  }

  showCcsReportDetails(report: any): void {
    this.selectedCcsReport = report;
    this.showCcsReportDetailsModal = true;
  }

  closeCcsReportDetails(): void {
    this.showCcsReportDetailsModal = false;
    this.selectedCcsReport = null;
  }

  getCcsReportFileUrl(report: any, fileKey: string): string {
    if (!report || !report[fileKey]) return '';
    return this.pb.getFileUrl(report, fileKey);
  }

  toggleCcsReports(): void {
    this.showCcsReports = !this.showCcsReports;
    if (this.showCcsReports && !this.ccsReports.length) {
      this.loadCcsReports();
    }
  }
}
