import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@services/alert/alert.service';
import { LoginService } from '@services/login/login.service';
import { MembersService } from '@services/members/members.service';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
	registerForm!: FormGroup;
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private userService: MembersService,
		private alertService: AlertService,
		private pinGenrateService: LoginService
	) {}
	ngOnInit() {
		this.initLoginForm();
		this.generatePin();
	}
	initLoginForm(data?: any) {
		this.registerForm = this.fb.group({
			user_name: ['', Validators.required],
			full_name: ['', Validators.required],
			email: ['', Validators.required],
			phone: ['', Validators.required],
			parent_id: [null],
			country: ['Bangladesh', Validators.required],
			pin_code: ['', Validators.required],
			password: ['', Validators.required],
			role: "Merchant",
		});
	}
	save(data: any) {
		let userProfile: any = localStorage.getItem('userProfile');
		userProfile = JSON.parse(userProfile);
		if (this.registerForm.invalid) {
			return;
		}
		this.userService
			.addUser(this.registerForm.value)
			.subscribe((res: any) => {
				if (res?.success) {
					this.alertService.success(
						'Success',
						'User has been created successfully'
					);
					setTimeout(() => {
						this.router.navigate(['/admin/merchants']);
					}, 1000);
				}else{
					this.alertService.success(
						'error',
						res?.message
					);
				}
			});
	}
	generatePin(type?:any) {
		this.pinGenrateService.genratePinCode().subscribe((res: any) => {
			if (res?.success) {
				this.registerForm.patchValue({ pin_code: res?.data?.data });
				if(type == "gen"){
					this.alertService.success(
						'Success',
						'Pin Code Genrate successfully'
					);
				}
				
			}
		});
	}
}
