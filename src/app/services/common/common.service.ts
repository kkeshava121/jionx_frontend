import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiUrl:string = environment.backendHost;
  objectRefresh = new Subject<any>();
  isAutoRefreshOBJ = new Subject<any>;
  isChangeThemeMode = new Subject<any>();
  constructor(private http :HttpClient) {}

  getCurrentRole(){
    let userProfile: any = localStorage.getItem('userProfile');
    let userStorageObj = JSON.parse(userProfile);
    return userStorageObj.userRoles[0];
  }
  getAllBanks() {
    return this.http.get(
      `${this.apiUrl}api/v1/banks/get_all_banks`
    );
  }
  /** BL Count Api Reftesh */
  countObjectRefresh(refresh: boolean) {
    this.objectRefresh.next({ refresh: refresh });
  }
   /** BL Count Api Reftesh */
   getcountObjectRefresh() {
    return this.objectRefresh.asObservable();
  }
  /** BL auto Refresh */
  isBLAutoRefresh(refresh:any){
    this.objectRefresh.next({refresh: refresh.refresh,pageNumber: refresh.pageNumber})
  }
  getIsBLAutoRefresh(){
    return this.objectRefresh.asObservable();
  }
  getDashboardData() {
    return this.http.get(
      `${this.apiUrl}api/v1/users/dashboard_data`
    );
  }
  /** Theme Mode change */
  setThemeMode(item:any){
    this.isChangeThemeMode.next(item)
  }
  getThemeMode(){
    return this.isChangeThemeMode.asObservable();
  }
}
