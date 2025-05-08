import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PocketBaseService } from '../services/pocketbase.service';

export const loginRedirectGuard: CanActivateFn = (route, state) => {
  const pb = inject(PocketBaseService);
  const router = inject(Router);

  if(pb.isLoggedIn()){
    return router.createUrlTree(['final-landing-page']);
  }
  return true;
};
