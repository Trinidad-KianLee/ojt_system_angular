import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PocketBaseService } from '../services/pocketbase.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private pbService: PocketBaseService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.pbService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  } 
}
