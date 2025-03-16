import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class PocketBaseService {
  private pb: PocketBase;

  constructor() {
    // point to your PocketBase URL
    this.pb = new PocketBase('http://127.0.0.1:8090');
  }

  // Register a new user
  async registerUser(data: any) {
    // The "users" collection must be auth-enabled in PocketBase
    // data should include email, password, passwordConfirm, plus any custom fields
    return await this.pb.collection('users').create(data);
  }

  // Log in a user
  async loginUser(email: string, password: string) {
    // If "users" is your auth collection, this will create an auth record
    return await this.pb.collection('users').authWithPassword(email, password);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    // PocketBase stores auth in pb.authStore by default
    return this.pb.authStore.isValid;
  }

  getUserData() {
    return this.pb.authStore.record; // Returns the authenticated user's data
  }
  
  // Log out
  logout() {
    this.pb.authStore.clear();
  }
}
