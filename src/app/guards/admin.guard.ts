import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { PocketBaseService } from '../services/pocketbase.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private pbService: PocketBaseService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    if (!this.pbService.isLoggedIn()) {
      return this.router.parseUrl('/login');
    }

    if (!this.pbService.isAdmin()) {
      return this.router.parseUrl('/landingpage-orig');
    }
    return true;
  }
}
