import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ModemService {
  apiUrl:string = environment.backendHost;
  constructor(private http :HttpClient) {}
  getAllModems() {
    return this.http.get(
      `${this.apiUrl}api/v1/modems/get_all_modems`
    );
  }
  getAllModemsFilter(data:any) {
    return this.http.post(
      `${this.apiUrl}api/v1/modems/get_modems_by_filter`,data
    );
  }
  delete(data:any){
    let payload = {
      ids: data
    }
    return this.http.post(
      `${this.apiUrl}api/v1/modems/delete_multi_modems`,payload
    );
  }
  updateStatus(id:string, modemAction:number){
    let payload = {
      id: id,
      modem_action: modemAction
    }
    return this.http.post(
      `${this.apiUrl}api/v1/modems/update_modem_status`, payload
    );
  }
  getAllModemsSettings(){
    return this.http.get(
      `${this.apiUrl}api/v1/modem_settings/get_all_modem_settings`
    );
  }
  updateModemSettings(data:any){
    return this.http.post(
      `${this.apiUrl}api/v1/modem_settings/insert_or_update_modem_setting`,data
    );
  }
  deletModemSettings(id:any){
    let payload = {
      id: id
    }
    return this.http.post(
      `${this.apiUrl}api/v1/modem_settings/delete_modem?`,payload
    );
  }
  suspendModem(data:any){
    return this.http.post(
      `${this.apiUrl}api/v1/modems/modem_activation`,data
    );
  }
  deleteModem(ID:any){
    let payload = {
      id: ID
    }
  return this.http.get(
    `${this.apiUrl}api/v1/modems/${ID}/delete_modem`,{}
  )
  }
  addModem(data:any){
    return this.http.post(
      `${this.apiUrl}api/v1/modems`,data
    );
  }
}
