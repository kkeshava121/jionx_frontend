import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '@services/alert/alert.service';
import { MembersService } from '@services/members/members.service';

@Component({
	selector: 'app-merchants',
	templateUrl: './merchants.component.html',
	styleUrls: ['./merchants.component.css'],
})
export class MerchantsComponent {
	usersList: any;
	filteredUsers: any[] = [];
	dtOptions: DataTables.Settings = {};
	userProfile: any = localStorage.getItem('userProfile');
	searchTerm: string = '';
	itemsPerPage: number = 10;
	allPages!: number;
	displayedData: any = [];
	isDisplayed!: boolean;
	form!: FormGroup;
	changePasswordForm!: FormGroup;
	closeResult: string = '';
	constructor(
		private userService: MembersService,
		private modalService: NgbModal,
		private fb: FormBuilder,
		private alertService: AlertService
	) {}
	ngOnInit() {
		this.userList();
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10,
			// Add more options as needed
		};
		this.initChangePassword();
	}

	initChangePassword() {
		this.changePasswordForm = this.fb.group({
			new_password: ['', Validators.required],
			confirm_password: ['', Validators.required],
			merchant_id: ['', Validators.required],
		});
	}

	userList() {
		let data = { user_role: 'Merchant' };
		this.userProfile = JSON.parse(this.userProfile);
		this.isDisplayed = true;
		this.userService.getMerchant(data).subscribe((res: any) => {
			this.isDisplayed = false;
			this.usersList = res?.data;
			this.filteredUsers = [...this.usersList];
			this.onPageChange();
			this.allPages = Math.ceil(
				this.usersList.length / this.itemsPerPage
			);
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
				user.phone.toLowerCase().includes(this.searchTerm.toLowerCase())
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
		this.changePasswordForm.patchValue({ merchant_id: data.id });
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

	changePass() {
		if (this.changePasswordForm.invalid) {
			return;
		}
		this.changePasswordForm.value.id =
			this.changePasswordForm.value.merchant_id;
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
