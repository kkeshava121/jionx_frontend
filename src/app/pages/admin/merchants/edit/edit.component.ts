import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@services/alert/alert.service';
import { LoginService } from '@services/login/login.service';
import { MembersService } from '@services/members/members.service';
@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css'],
})
export class EditComponent {
	registerForm!: FormGroup;
	userID: any;
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private userService: MembersService,
		private alertService: AlertService,
		private route: ActivatedRoute
	) {}
	ngOnInit() {
		this.userID = this.route.snapshot.paramMap.get('id');
		this.initLoginForm();
		this.getAdminUser();
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
			role: "Merchant",
		});
	}
	getAdminUser() {
		this.userService.editUser(this.userID).subscribe((res: any) => {
			this.registerForm.patchValue(res.data);
			this.registerForm.patchValue({phone:res.data?.phone})
		});
	}
	update(data: any) {
		// let userProfile: any = localStorage.getItem('userProfile');
		// userProfile = JSON.parse(userProfile);
		// this.registerForm.value.parentId = userProfile?.userDetail?.id;
    this.registerForm.value.id = this.userID; 

		if (this.registerForm.invalid) {
			return;
		}
		this.userService
			.updateUser(this.registerForm.value)
			.subscribe((res: any) => {
				if (res?.status == 200) {
					this.alertService.success(
						'Success',
						'User has been updated successfully'
					);
					setTimeout(() => {
						this.router.navigate(['/admin/merchants']);
					}, 1000);
				}
			});
	}
}
