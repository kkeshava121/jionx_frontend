import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  apiUrl:string = environment.backendHost;
  constructor(private http :HttpClient) { }
  getUser(data:any){
    return this.http.get(
      `${this.apiUrl}api/v1/users/get_users_by_parent_id_and_role?parent_id=${data?.parent_id}&role=${data?.user_role}`
    );
  }
  getMerchant(data:any){
    return this.http.get(
      `${this.apiUrl}api/v1/users/get_users_by_parent_id_and_role?role=${data?.user_role}`
    );
  }
  addUser(data:any){
    return this.http.post(
      `${this.apiUrl}api/v1/users`,
      data
    );
  }
  editUser(ID:any){
    return this.http.get(
      `${this.apiUrl}api/v1/users/get_user_by_id?user_id=${ID}`
    );
  }
  updateUser(data:any){
    return this.http.post(
      `${this.apiUrl}api/v1/users/update_user`,
      data
    );
  }
  merchantList(){
    return this.http.get(
      `${this.apiUrl}api/v1/users/merchants_list`
    );
  }
  addRemoveMerchant(data:any){
    return this.http.post(
      `${this.apiUrl}api/v1/users/assign_or_remove_merchant`,
      data
    );
  }
  changePassword(data:any){
    return this.http.post(
      `${this.apiUrl}api/v1/users/change_password`,
      data
    );
  }
}
