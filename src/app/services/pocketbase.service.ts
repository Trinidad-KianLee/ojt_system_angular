import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

interface PBUser {
  id: string;
  email: string;
  role?: string;
  [key: string]: any; 
}

@Injectable({
  providedIn: 'root'
})
export class PocketBaseService {
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase('http://127.0.0.1:8090');
  }

  async registerUser(data: any) {
    return await this.pb.collection('users').create(data);
  }

  async loginUser(email: string, password: string) {
    return await this.pb.collection('users').authWithPassword(email, password);
  }

  isLoggedIn(): boolean {
    return this.pb.authStore.isValid;
  }

  getUserData(): PBUser | null {
    return this.pb.authStore.record as PBUser | null;
  }

  getUserRole(): string {
    const user = this.getUserData();
    return user?.role || '';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  async createRecord(collectionName: string, formData: FormData) {
    return this.pb.collection(collectionName).create(formData);
  }

  async createRetailerRegisRecord(data: any): Promise<any> {
    return this.pb.collection('retailer_regis').create(data);
  }

  logout() {
    this.pb.authStore.clear();
  }

  async requestPasswordReset(email: string): Promise<void> {
    await this.pb.collection('users').requestPasswordReset(email);
  }

  async confirmPasswordReset(token: string, password: string, passwordConfirm: string): Promise<void> {
    await this.pb.collection('users').confirmPasswordReset(token, password, passwordConfirm);
  }

  async updatePasswordManually(email: string, newPassword: string, newPasswordConfirm: string): Promise<void> {
    try {
      const users = await this.pb.collection('users').getFullList({ filter: `email="${email}"` });
      if (users.length === 0) {
        throw new Error('User not found');
      }
      const user = users[0];
      await this.pb.collection('users').update(user.id, {
        password: newPassword,
        passwordConfirm: newPasswordConfirm
      });
      console.log('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }

  async getAllVapeRegisRecords(): Promise<any[]> {
    if (!this.isAdmin()) {
      throw new Error('Access denied. Admin only method.');
    }
    return this.pb.collection('vape_regis').getFullList({
      expand: 'owner'
    });
  }

  async getAllRetailerRegisRecords(): Promise<any[]> {
    if (!this.isAdmin()) {
      throw new Error('Access denied. Admin only method.');
    }
    return this.pb.collection('retailer_regis').getFullList({
      expand: 'owner'
    });
  }

  getAttachmentUrl(record: any, fileKey: string): string {
    if (!record?.id || !record[fileKey]) {
      return '';
    }
    return `${this.pb.baseUrl}/api/files/vape_regis/${record.id}/${record[fileKey]}`;
  }

  async adminOnlyMethod(): Promise<string> {
    if (!this.isAdmin()) {
      throw new Error('Access denied. Admin only method.');
    }
    return 'Admin-specific data retrieved!';
  }
}
