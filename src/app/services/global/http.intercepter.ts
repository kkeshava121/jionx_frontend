import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { environment } from '@environment/environment';
import { ErrorHandlerService } from '@services/error-handler/error-handler.service';
import { Router } from '@angular/router';
import { AlertService } from '@services/alert/alert.service';

@Injectable()
export class HttpCallsInterceptor implements HttpInterceptor {
	constructor(private errHandlerService: ErrorHandlerService,private router: Router,private alertService: AlertService) {}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		let userProfile:any = localStorage.getItem('userProfile');
		userProfile = JSON.parse(userProfile);
		let token = userProfile?.token;
		if (token) {
			request = request.clone({
				headers: request.headers.set(
					'Authorization',
					`Bearer ${token}`
				)
				//.set('Content-Type', 'application/json')
			});
		}else {
			// request = request.clone({
			// 	headers: request.headers
			// 		.set('Content-Type', 'application/json')
			// 		.set('Accept','application/json;indent=2')
			// });
			// let login:any = localStorage.getItem('loginStatus');
			// login = JSON.parse(login);
			//  if(!login){
			// 	this.router.navigate(['/login']);
			//  }
				
		}
		
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 0) {
					console.error('An error occurred:', error?.error);
				}else if(error.status === 401){
					this.alertService.error(
						'Error',
						error?.error?.error
					);
					localStorage.clear();
					this.router.navigate(['/login']);
				} else {
					console.error(
						`Backend returned code ${error.status}, body was: `,
						error.error
					);
				}
				//this.errHandlerService.showErrorr(error.message);
				return throwError(
					() =>
						new Error(
							'Something bad happened; please try again later.'
						)
				);
			}),
			finalize(() => {
				//this.loaderService.closeDialog();
			})
		) as Observable<HttpEvent<any>>;
	}
}
