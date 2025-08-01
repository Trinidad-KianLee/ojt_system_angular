import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PocketBaseService } from '../../../services/pocketbase.service';

@Component({
  selector: 'app-warehouse-reg',
  templateUrl: './warehouse-reg.component.html',
  standalone: true,
  imports: [RouterModule]
})
export class WarehouseRegComponent {
  firstName: string = '';
  constructor(
    public pb: PocketBaseService,
    private router: Router
  ) {
    const userData = this.pb.getUserData(); 
    this.firstName = userData ? userData["firstName"] : ''; 
  }

  logout(){
    this.pb.logout();
    this.router.navigate(['login']);
  }

  goToRegister() {
    if (!this.pb.isLoggedIn()) {
      alert('You must log in first!');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/terms-conditions']);
  }
}
