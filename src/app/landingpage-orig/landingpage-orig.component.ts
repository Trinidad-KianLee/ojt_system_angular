import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PocketBaseService } from '../services/pocketbase.service';

@Component({
  selector: 'app-landingpage-orig',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landingpage-orig.component.html',
  styleUrls: ['./landingpage-orig.component.scss']
})
export class LandingpageOrigComponent {
  firstName: string = '';

  constructor(public pb: PocketBaseService, private router: Router) {
    const userData = this.pb.getUserData(); 
    this.firstName = userData ? userData["firstName"] : ''; 
  }

  logout(){
    this.pb.logout();
    this.router.navigate(['login']);
  }
}

