import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@services/alert/alert.service';
import { LoginService } from '@services/login/login.service';

@Component({
	selector: 'app-pin-code',
	templateUrl: './pin-code.component.html',
	styleUrls: ['./pin-code.component.css'],
})
export class PinCodeComponent {
	loginForm!: FormGroup;
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private userService: LoginService,
		private alertService: AlertService
	) {}
	ngOnInit() {
		this.initLoginForm();
	}
	initLoginForm(data?: any) {
		this.loginForm = this.fb.group({
			pinCode: [data?.name || '', Validators.required],
		});
	}
	save(data: any) {
		if (this.loginForm.invalid) {
			return;
		}
		let loginData: any = localStorage.getItem('login');
		loginData = JSON.parse(loginData);
		//loginData.pincode = this.loginForm.value.pinCode;
		//localStorage.setItem('userProfile',JSON.stringify(res?.data));
		let userProfile: any = localStorage.getItem('pinCode');
		userProfile = JSON.parse(userProfile);
		let pincode = {
			userId: userProfile?.userDetail?.id,
			pincode: this.loginForm.value.pinCode,
		};
		this.userService
			.pinCode(pincode, userProfile?.token)
			.subscribe((res: any) => {
				if (res?.message == 'Success') {
					this.alertService.success(
						'Success',
						'Logged In successfully'
					);
					localStorage.setItem(
						'userProfile',
						JSON.stringify(userProfile)
					);
					this.router.navigate(['/admin/dashboard']);
				} else {
					this.alertService.error('error', res?.message);
				}
			});
	}
}
