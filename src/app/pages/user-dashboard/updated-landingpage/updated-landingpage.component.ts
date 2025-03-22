import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PocketBaseService } from '../../../services/pocketbase.service';

@Component({
  selector: 'app-landingpage-orig',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './updated-landingpage.component.html',
  styleUrl: './updated-landingpage.component.css'
})
export class UpdatedLandingpageComponent {
  firstName: string = '';
    showLogoutModal: boolean = false;
  
    constructor(public pb: PocketBaseService, private router: Router) {
      const userData = this.pb.getUserData();
      this.firstName = userData ? userData["firstName"] : '';
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

}
