import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../environments/environment.development';

interface PBUser {
  id: string;
  email: string;
  role?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class PocketBaseService {
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase(environment.pocketbaseUrl);
  }

  async registerUser(data: any) {
    const userData = {
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      emailVisibility: data.emailVisibility,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      dob: data.dob,
      gender: data.gender,
      socialClassification: data.socialClassification,
      companyName: data.companyName,
      companyAddress: data.companyAddress,
      companyContactNum: data.contactNumber,
      clientDesignation: data.clientDesignation,
      proofFile: data.proofFile,
      role: data.role,
      status: 'pending',
    };
    return await this.pb.collection('users').create(userData);
  }

  async approveUser(userId: string): Promise<void> {
    await this.pb.collection('users').update(userId, { status: 'approved' });
  }

  async denyUser(userId: string): Promise<void> {
    await this.pb.collection('users').update(userId, { status: 'denied' });
  }

  async getPendingUsers(): Promise<any[]> {
    return this.pb.collection('users').getFullList({
      filter: `status="pending"`,
    });
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
    await this.pb
      .collection('retailer_regis')
      .create(data);
  }

  async createPsLicense(data: any): Promise<any> {
    return this.pb.collection('ps_license_regis').create(data);
  }

  async createWarehouseRegistration(data: FormData): Promise<any> {
    // Add user ID as owner if not already in data
    if (!data.get('owner') && this.isLoggedIn()) {
      const userData = this.getUserData();
      if (userData) {
        data.append('owner', userData.id);
      }
    }
    
    // Ensure application status is set
    if (!data.get('applicationStatus')) {
      data.append('applicationStatus', 'pending');
    }
    
    return this.pb.collection('warehouse_regis').create(data);
  }

  async createAgeGatingRegistration(data: FormData): Promise<any> {
    // Add user ID as owner if not already in data
    if (!data.get('owner') && this.isLoggedIn()) {
      const userData = this.getUserData();
      if (userData) {
        data.append('owner', userData.id);
      }
    }
    
    // Ensure application status is set
    if (!data.get('applicationStatus')) {
      data.append('applicationStatus', 'pending');
    }
    
    return this.pb.collection('age_gating').create(data);
  }

  async createSocCcrRegistration(data: FormData): Promise<any> {
    // Add user ID as owner if not already in data
    if (!data.get('owner') && this.isLoggedIn()) {
      const userData = this.getUserData();
      if (userData) {
        data.append('owner', userData.id);
      }
    }
    
    // Ensure application status is set
    if (!data.get('applicationStatus')) {
      data.append('applicationStatus', 'pending');
    }
    
    return this.pb.collection('soc_ccr').create(data);
  }

  async getUserAgeGatingRegistrations(): Promise<any[]> {
    if (!this.isLoggedIn()) {
      throw new Error('User must be logged in.');
    }
    const userData = this.getUserData();
    return this.pb.collection('age_gating').getFullList({
      filter: `owner="${userData?.id}"`,
    });
  }

  async getUserSocCcrRegistrations(): Promise<any[]> {
    if (!this.isLoggedIn()) {
      throw new Error('User must be logged in.');
    }
    const userData = this.getUserData();
    return this.pb.collection('soc_ccr').getFullList({
      filter: `owner="${userData?.id}"`,
    });
  }

  async getAllAgeGatingRecords(): Promise<any[]> {
    if (!this.isAdmin()) {
      throw new Error('Access denied. Admin only method.');
    }
    return this.pb.collection('age_gating').getFullList({
      expand: 'owner',
    });
  }

  async getAllSocCcrRecords(): Promise<any[]> {
    if (!this.isAdmin()) {
      throw new Error('Access denied. Admin only method.');
    }
    return this.pb.collection('soc_ccr').getFullList({
      expand: 'owner',
    });
  }

  async updateAgeGatingRecordStatus(recordId: string, newStatus: string): Promise<any> {
    return this.pb.collection('age_gating').update(recordId, {
      applicationStatus: newStatus
    });
  }

  async updateSocCcrRecordStatus(recordId: string, newStatus: string): Promise<any> {
    return this.pb.collection('soc_ccr').update(recordId, {
      applicationStatus: newStatus
    });
  }

  async getAllWarehouseRegisRecords(): Promise<any[]> {
    if (!this.isAdmin()) {
      throw new Error('Access denied. Admin only method.');
    }
    return this.pb.collection('warehouse_regis').getFullList({
      expand: 'owner',
    });
  }

  async getUserWarehouseRegistrations(): Promise<any[]> {
    if (!this.isLoggedIn()) {
      throw new Error('User must be logged in.');
    }
    const userData = this.getUserData();
    return this.pb.collection('warehouse_regis').getFullList({
      filter: `owner="${userData?.id}"`,
    });
  }

  async updateWarehouseRecordStatus(recordId: string, newStatus: string): Promise<any> {
    return this.pb.collection('warehouse_regis').update(recordId, {
      applicationStatus: newStatus
    });
  }

  logout() {
    this.pb.authStore.clear();
  }

  async requestPasswordReset(email: string): Promise<void> {
    await this.pb.collection('users').requestPasswordReset(email);
  }

  async confirmPasswordReset(
    token: string,
    password: string,
    passwordConfirm: string
  ): Promise<void> {
    await this.pb
      .collection('users')
      .confirmPasswordReset(token, password, passwordConfirm);
  }

  async updatePasswordManually(
    email: string,
    newPassword: string,
    newPasswordConfirm: string
  ): Promise<void> {
    try {
      const users = await this.pb
        .collection('users')
        .getFullList({ filter: `email="${email}"` });
      if (users.length === 0) {
        throw new Error('User not found');
      }
      const user = users[0];
      await this.pb.collection('users').update(user.id, {
        password: newPassword,
        passwordConfirm: newPasswordConfirm,
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
      expand: 'owner',
    });
  }

  async getAllRetailerRegisRecords(): Promise<any[]> {
    if (!this.isAdmin()) {
      throw new Error('Access denied. Admin only method.');
    }
    return this.pb.collection('retailer_regis').getFullList({
      expand: 'owner',
    });
  }

  async getAllPsLicenseRecords(): Promise<any[]> {
    if (!this.isAdmin()) {
      throw new Error('Access denied. Admin only method.');
    }
    return this.pb.collection('ps_license_regis').getFullList({
      expand: 'owner',
    });
  }

  getAttachmentUrl(record: any, fileKey: string): string {
    if (!record?.id || !record[fileKey]) {
      return '';
    }

    // Determine collection name from record
    let collectionName = 'vape_regis';
    
    if (record.warehouseBldgNameNo || record.nameOfBusiness) {
      collectionName = 'warehouse_regis';
    } else if (record.business_name || record.store_name) {
      collectionName = 'retailer_regis';
    } else if (record.company_name) {
      collectionName = 'ps_license_regis';
    } else if (record.nameOfCompany) {
      collectionName = 'age_gating';
    }
    
    return `${this.pb.baseUrl}/api/files/${collectionName}/${record.id}/${record[fileKey]}`;
  }

  getUserAttachmentUrl(record: any, fileKey: string): string {
    if (!record?.id || !record[fileKey]) {
      return '';
    }
    return `${this.pb.baseUrl}/api/files/_pb_users_auth_/${record.id}/${record[fileKey]}`;
  }

  async getApprovedUsers(): Promise<any[]> {
    return this.pb.collection('users').getFullList({
      filter: `status="approved"`,
    });
  }

  async updateVapeRecordStatus(recordId: string, newStatus: string): Promise<any> {
    return this.pb.collection('vape_regis').update(recordId, {
      applicationStatus: newStatus
    });
  }

  async updateRetailerRecordStatus(recordId: string, newStatus: string): Promise<any> {
    return this.pb.collection('retailer_regis').update(recordId, {
      applicationStatus: newStatus
    });
  }

  async updatePsLicenseRecordStatus(recordId: string, newStatus: string): Promise<any> {
    return this.pb.collection('ps_license_regis').update(recordId, {
      applicationStatus: newStatus
    });
  }

  async createAdminLog(logData: any): Promise<any> {
    return this.pb.collection('admin_logs').create(logData);
  }

  async getAllAdminLogs(): Promise<any[]> {
    if (!this.isAdmin()) {
      throw new Error('Access denied. Admin only method.');
    }
    return this.pb.collection('admin_logs').getFullList({
      sort: '-created'
    });
  }

  async adminOnlyMethod(): Promise<string> {
    if (!this.isAdmin()) {
      throw new Error('Access denied. Admin only method.');
    }
    return 'Admin-specific data retrieved!';
  }
}
