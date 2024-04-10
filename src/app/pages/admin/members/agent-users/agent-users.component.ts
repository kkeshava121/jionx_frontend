import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '@services/alert/alert.service';
import { MembersService } from '@services/members/members.service';

@Component({
	selector: 'app-agent-users',
	templateUrl: './agent-users.component.html',
	styleUrls: ['./agent-users.component.css'],
})
export class AgentUsersComponent {
	usersList: any;
	filteredUsers: any[] = [];
	dtOptions: DataTables.Settings = {};
	userProfile: any = localStorage.getItem('userProfile');
	searchTerm: string = '';
	itemsPerPage: number = 10;
	allPages!: number;
	displayedData: any = [];
	isDisplayed!: boolean;
	closeResult: string = '';
	form!: FormGroup;
	changePasswordForm!: FormGroup;
	merchantData: any;
	merchantList: any;
	constructor(
		private userService: MembersService,
		private modalService: NgbModal,
		private fb: FormBuilder,
		private alertService: AlertService
	) {}
	ngOnInit() {
		let that = this;
		this.userList();
		setTimeout(function () {
			that.getMerchantList();
		}, 200);
		this.initForm();
		this.initChangePassword();
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10,
			// Add more options as needed
		};
	}
	initForm() {
		this.form = this.fb.group({
			agent_id: ['', Validators.required],
			merchant_id: ['', Validators.required],
			type: ['', Validators.required],
		});
	}
	initChangePassword() {
		this.changePasswordForm = this.fb.group({
			new_password: ['', Validators.required],
			confirm_password: ['', Validators.required],
		});
	}
	userList() {
		let data;
		let userData: any = localStorage.getItem('userProfile');
		this.userProfile = JSON.parse(userData);
		if (
			this.userProfile?.userDetail?.userRoles == 'Admin' ||
			this.userProfile?.userDetail?.userRoles == 'SuperAdmin'
		) {
			data = { parent_id: '', user_role: 'Agent' };
		} else {
			data = {
				parent_id: this.userProfile?.userDetail?.id,
				user_role: 'Agent',
			};
		}
		this.isDisplayed = true;
		this.userService.getUser(data).subscribe((res: any) => {
			this.usersList = res?.data;
			this.filteredUsers = [...this.usersList];
			this.onPageChange();
			this.allPages = Math.ceil(
				this.usersList.length / this.itemsPerPage
			);
			this.isDisplayed = false;
		});
	}
	users(data: any) {
		this.usersList = data;
	}
	search(data: any) {
		this.filteredUsers = data.filter(
			(user: any) =>
				user.full_name
					.toLowerCase()
					.includes(this.searchTerm.toLowerCase()) ||
				user.email
					.toLowerCase()
					.includes(this.searchTerm.toLowerCase()) ||
				user.phone
					.toLowerCase()
					.includes(this.searchTerm.toLowerCase()) 
				
		);
		this.onPageChange();
		this.allPages = Math.ceil(
			this.filteredUsers.length / this.itemsPerPage
		);
	}
	onPageChange(page: number = 1): void {
		const startItem = (page - 1) * this.itemsPerPage;
		const endItem = page * this.itemsPerPage;
		this.displayedData = this.filteredUsers.slice(startItem, endItem);
	}
	open(content: any, data?: any) {
		this.form.patchValue({ agent_id: data.id });
		this.modalService
			.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
			.result.then(
				(result) => {
					this.closeResult = `Closed with: ${result}`;
				},
				(reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(
						reason
					)}`;
				}
			);
	}
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
	getMerchantList() {
		this.merchantList = [];
		this.userService.merchantList().subscribe((res: any) => {
			this.merchantList = res.data;
			this.displayedData.forEach((element: any) => {
				let merchant_id = element.merchant_id;
				if (merchant_id) {
					let merchant = this.merchantList.filter(function (el: any) {
						return el.id === merchant_id;
					});
					element.merchant_email = merchant[0].email;
				} else {
					element.merchant_email = '';
				}
			});
		});
	}
	addMerchant(data: any) {
		this.form.patchValue({
			type: 'assign',
		});
		if (this.form.invalid) {
			return;
		}
		this.userService
			.addRemoveMerchant(this.form.value)
			.subscribe((res: any) => {
				if (res.status == 200) {
					this.alertService.success(
						'success',
						'Merchant has been assigned successfully'
					);
					this.userList();
					this.form.patchValue({ merchant_id: '' });
					this.modalService.dismissAll();
					setTimeout(() => {
						this.getMerchantList();
					}, 200);
				} else {
					this.alertService.error('error', res?.message);
				}
			});
	}

	removeMerchant(agent_id: string, merchant_id: string) {
		let payload = {
			type: 'remove',
			agent_id: agent_id,
			merchant_id: merchant_id,
		};
		this.userService.addRemoveMerchant(payload).subscribe((res: any) => {
			if (res.status == 200) {
				this.alertService.warning('Merchant', 'Removed successfully');
				this.userList();
				setTimeout(() => {
					this.getMerchantList();
				}, 200);
			} else {
				this.alertService.error('error', res?.message);
			}
		});
	}
	changePass() {
		if (this.changePasswordForm.invalid) {
			return;
		}
		this.changePasswordForm.value.id = this.form.value.agent_id;
		if (
			this.changePasswordForm.value.new_password !=
			this.changePasswordForm.value.confirm_password
		) {
			this.alertService.error('Warning', `Password does't match`);
			return;
		}
		this.userService
			.changePassword(this.changePasswordForm.value)
			.subscribe((res: any) => {
				if (res.status == 200) {
					this.alertService.success('success', res.message);
					this.changePasswordForm.reset();
					this.modalService.dismissAll();
				} else {
					this.alertService.error('Warning', res.message);
				}
			});
	}
}
