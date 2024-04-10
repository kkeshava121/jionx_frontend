import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environment/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl:string = environment.backendHost;
  constructor(private http :HttpClient) {}
  login(data:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const requestOptions = { headers: headers };
    return this.http.post(
      `${this.apiUrl}api/v1/users/sign_in`,
      data,requestOptions
    );
  }
  pinCode(data:any,token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

  const requestOptions = { headers: headers };
    return this.http.post(
      `${this.apiUrl}api/v1/users/verify_user_by_pincode`,
      data, requestOptions
    );
  }
  genratePinCode(){
   return this.http.get(
      `${this.apiUrl}api/v1/users/pincode`
    ); 
  }
  logOut(){
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': '*/*'
  //   });

  // const requestOptions = { headers: headers };
    return this.http.post(
      `${this.apiUrl}api/v1/users/sign_out_user`,{}
    );
  }
  
}
