import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceManagerService {

  apiUrl:string = environment.backendHost;
  constructor(private http :HttpClient) {}

  getCurrentUserProfile(){
    let userProfile: any = localStorage.getItem('userProfile');
    userProfile = JSON.parse(userProfile);
    return userProfile;
  }

  getAllBalanceService(data:any) {
    return this.http.post(
      `${this.apiUrl}api/v1/balance_manager/get_balance_by_filter`,data
    );
  }

  updateBalanceManagerStatusService(data:any) {
    return this.http.post(
      `${this.apiUrl}api/v1/balance_manager/update_status`,data
    );
  }

  getStatusCount(){
    return this.http.get(
      `${this.apiUrl}api/v1/balance_manager/get_status_count`,
    );
  }
  updateBalanceManagerStatusMultiple(data:any) {
    return this.http.post(
      `${this.apiUrl}api/v1/balance_manager/update_multiple_status`,data
    );
  }
}
