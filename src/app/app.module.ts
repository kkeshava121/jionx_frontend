import { ErrorHandler, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandlerComponent } from '@components/error-handler/error-handler.component';
import { environment } from '@environment/environment';
import { HttpCallsInterceptor } from '@services/global/http.intercepter';
// import { GlobalErrorHandler } from '@services/global/error-handler';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let providers: Provider[] = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: HttpCallsInterceptor,
		multi: true,
	}
];

// Only enable custom error handler in production mode
if (environment) {
	providers.push({
		provide: ErrorHandler,
		// useClass: GlobalErrorHandler,
	});
}
@NgModule({
  declarations: [
    AppComponent,
    ErrorHandlerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
		ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
    
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
