import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  errors: Subject<any> = new Subject<any>();
  constructor() {}
  showErrorr(data: any) {
    this.errors.next(data);
  }
}
