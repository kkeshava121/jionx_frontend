import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SmsInboxsService {

  apiUrl:string = environment.backendHost;
  constructor(private http :HttpClient) {}
  getAllSmsInboxs(data:any) {
    return this.http.post(
      `${this.apiUrl}api/v1/messages/get_messages_by_filter`,data
    );
  }
  searchSmsInboxs(data:any){
    return this.http.post(
      `${this.apiUrl}api/v1/messages/get_messages_by_filter`,data
    );
  }
}
