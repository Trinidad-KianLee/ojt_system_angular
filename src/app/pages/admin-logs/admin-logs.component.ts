import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PocketBaseService } from '../../services/pocketbase.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-logs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.scss']
})
export class AdminLogsComponent implements OnInit {
  logs: any[] = [];
  loading: boolean = false;
  errorMsg: string = '';
  showLogoutModal: boolean = false;

  constructor(public pb: PocketBaseService, public router: Router) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  async loadLogs(): Promise<void> {
    try {
      this.loading = true;
      this.errorMsg = '';
      this.logs = await this.pb.getAllAdminLogs();
      if (!this.logs.length) {
        this.errorMsg = 'No logs found.';
      }
    } catch (err) {
      console.error('Error loading admin logs:', err);
      this.errorMsg = 'Failed to load admin logs.';
    } finally {
      this.loading = false;
    }
  }

  refreshLogs(): void {
    this.loadLogs();
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
    this.router.navigate(['login']);
  }
}
