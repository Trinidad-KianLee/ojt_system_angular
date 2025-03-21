import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PocketBaseService } from '../services/pocketbase.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private pbService: PocketBaseService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const currentUser = this.pbService.getUserData();
    if (currentUser?.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
