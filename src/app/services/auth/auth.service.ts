import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn() {
    let userProfile:any = localStorage.getItem('userProfile');
    userProfile = JSON.parse(userProfile);
    const session = userProfile?.token;
    if (session) {
      return true;
    } else {
      return false;
    }
  }
}
