import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@services/alert/alert.service';
import { LoginService } from '@services/login/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	// protected aFormGroup!: FormGroup;
	loginForm!: FormGroup;
	// siteKey: string = "6LfPrFwmAAAAAE82Ym7ByQfAZXdl07EtaCIjLjS9";
	capchaPass: boolean = false;
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private loginService: LoginService,
		private alertService: AlertService
	) {}
	ngOnInit() {
		// this.aFormGroup = this.fb.group({
		// 	recaptcha: ['', Validators.required]
		// });
		this.initLoginForm();
	}

	// handleSuccess(event: any){
	// 	this.capchaPass = true;
	// }
	initLoginForm(data?: any) {
		this.loginForm = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
		let userProfile:any = localStorage.getItem('userProfile');
		userProfile = JSON.parse(userProfile);
		let token = userProfile?.token;
		if (token) {
			this.router.navigate(['/admin/dashboard']);
		}else{
			localStorage.clear();
		};
	}
	save(data: any) {
		if (this.loginForm.invalid) {
			return;
		}
		this.loginService.login(this.loginForm.value).subscribe((res: any) => {
			if (res?.message == 'Success') {
				localStorage.setItem('pinCode', JSON.stringify(res?.data));
				this.router.navigate(['/pin-code']);
			} else {
				this.alertService.error(
					'Error',
					'username or password is incorrect'
				);
			}
			
		});
	}
}
