import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environment/environment';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl:string = environment.backendHost;
  constructor(private http :HttpClient) {}
  create(data:any){
    return this.http.post(
      `${this.apiUrl}api/v1/roles`,
      data
    );
  }
  update(data:any,ID:any){
    return this.http.put(
      `${this.apiUrl}api/v1/roles/${ID}`,
      data
    );
  }
  delete(ID:any){
    return this.http.delete(
      `${this.apiUrl}api/v1/roles/${ID}`
    );
  }
  view(ID:any){
    return this.http.get(
      `${this.apiUrl}api/v1/roles/${ID}`
    );
  }
  list(){
    return this.http.get(
      `${this.apiUrl}api/v1/roles`
    );
  }
}
