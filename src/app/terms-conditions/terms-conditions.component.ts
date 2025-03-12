import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent {
  constructor(private router: Router) {}

  acceptTerms() {
    this.router.navigate(['/registration-form']);
  }

  declineTerms() {
    console.log('User declined the terms and conditions');
  }
}