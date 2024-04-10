import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss'],
})
export class ErrorHandlerComponent implements OnInit, OnDestroy {
  error: object = {};
  showErrors: boolean = false;
  errorHandlerSubscription: Subscription;
  constructor(private errService: ErrorHandlerService) {
    this.errorHandlerSubscription = this.errService.errors.subscribe(
      (error) => {
        this.error = error;
        this.showErrors = true;
      }
    );
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.errorHandlerSubscription.unsubscribe();
  }
  close() {
    this.error = {};
    this.showErrors = false;
  }
}
