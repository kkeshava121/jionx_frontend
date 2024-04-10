import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '@services/alert/alert.service';
import { BalanceManagerService } from '@services/balance-manager/balance-manager.service';
import { CommonService } from '@services/common/common.service';

@Component({
	selector: 'app-rejected',
	templateUrl: './rejected.component.html',
	styleUrls: ['./rejected.component.css'],
})
export class RejectedComponent {
	searchParams: any;
	isDisplayed: boolean = true;
	balanceManager: any;
	searchTerm: string = '';
	itemsPerPage: number = 50;
	pageNumber: number = 1;
	allPages!: number;
	displayedData: any = [];
	filteredList: any[] = [];
	settingSearchForm!: FormGroup;
	bankList: any;
	totalRows: number = 0;
	validationMessageTo: string = '';
	validationMessageFrom: string = '';
	isReset: boolean = true;
	userProfile:any;
	constructor(
		private balanceManagerService: BalanceManagerService,
		private fb: FormBuilder,
		private bankService: CommonService,
		private objectRefreshService: CommonService,
		private alertService: AlertService
	) {}
	ngOnInit() {
		this.searchParams = {
			page_size: this.itemsPerPage,
			page_number: this.pageNumber,
			balance_manager_filter: 3,
		};
		this.balanceManagerList();
		this.userProfile = this.balanceManagerService.getCurrentUserProfile();
	   console.log(this.userProfile)
	}
	balanceManagerList() {
		let data = {
			page_size: this.searchParams?.page_size,
			page_number: this.searchParams?.page_number,
			sender: this.searchParams?.sender,
			agent_account_no: this.searchParams?.agent_account_no,
			transaction_id: this.searchParams?.transaction_id,
			status: this.searchParams?.status,
			b_type: this.searchParams?.b_type,
			balance_manager_filter: this.searchParams?.balance_manager_filter,
			from: this.searchParams?.from,
			to: this.searchParams?.to,
		};
		this.isDisplayed = true;
		this.balanceManagerService
			.getAllBalanceService(data)
			.subscribe((res: any) => {
				if (res.status === 200) {
					this.balanceManager = res?.data;
					this.filteredList = [...this.balanceManager];
					this.displayedData = this.filteredList;
					this.totalRows = res?.total_rows;
				}
				this.isDisplayed = false;
			});
	}
	search(data: any) {
		this.searchParams = data;
		this.itemsPerPage = this.searchParams?.page_size;
		this.pageNumber = this.searchParams?.page_number;
		this.balanceManagerList();
	}

	onPageChange(page: any): void {
		this.pageNumber = page;
		this.searchParams.page_number = page;
		this.balanceManagerList();
	}
	doAction(type: string, id: number, actionType: any) {
		let user = this.balanceManagerService.getCurrentUserProfile();
		let statusType: any;
		let payload = {
			id: id,
			balance_status: type,
			user_id: user.userDetail.id,
		};
		if (actionType == 'approved') {
			statusType = 'approved';
		} else {
			statusType = 'rejected';
		}
		this.alertService
			.conformAlert('Are you sure?', 'You want to ' + statusType)
			.then((result) => {
				if (result.value) {
					this.balanceManagerService
						.updateBalanceManagerStatusService(payload)
						.subscribe((res: any) => {
							if (res.success) {
								this.objectRefreshService.countObjectRefresh(
									true
								);
								this.alertService.success(
									'Success',
									'Item ' + statusType + ' successfully'
								);
								this.refreshList();
							}
						});
				}
			});
	}
	refreshList() {
		this.pageNumber = 1;
		this.balanceManagerList();
	}
}
