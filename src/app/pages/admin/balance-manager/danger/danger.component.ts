import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '@services/alert/alert.service';
import { BalanceManagerService } from '@services/balance-manager/balance-manager.service';
import { CommonService } from '@services/common/common.service';
export interface selectAllOject {
	checked?: boolean;
  }
@Component({
	selector: 'app-danger',
	templateUrl: './danger.component.html',
	styleUrls: ['./danger.component.css'],
})
export class DangerComponent {
	searchParams: any;
	isDisplayed: boolean = true;
	balanceManager: any;
	searchTerm: string = '';
	itemsPerPage: number = 50;
	pageNumber: number = 1;
	allPages!: number;
	displayedData: any = [];
	filteredList: any[] = [];
	bankList: any;
	totalRows: number = 0;
	selectedOptions: string[] = [];
	selectAllOject!: selectAllOject[];
	isChecked:boolean = false;
	isSelectAllChecked: boolean = false;
	constructor(
		private balanceManagerService: BalanceManagerService,
		private alertService: AlertService,
		private objectRefreshService: CommonService,
	) {}
	ngOnInit() {
		this.searchParams = {page_size: this.itemsPerPage,
			page_number: this.pageNumber,balance_manager_filter: 5}
		this.balanceManagerList();
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
	search(data:any){
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
	approvedAllList(event:any){
		this.selectedOptions = [];
		if(event.target.checked){
			this.isChecked = true;
			this.isSelectAllChecked = true;
			this.displayedData.forEach((item:any) => {
				this.selectedOptions.push(item?.id)
			});
		}else{
			this.isChecked = false
		}
	}
	checkBoxValue(data?:any,event?:any){
		if(event.target.checked){
			this.selectedOptions.push(data)
		}else{
			this.selectedOptions.forEach((element,index)=>{
				if(element==data) {this.selectedOptions.splice(index,1);}
			 });
		}
		if(this.selectedOptions.length == 0){
			this.isSelectAllChecked = false
		}
	}
	approvedAndRejectedStatus(type:any){
		let user = this.balanceManagerService.getCurrentUserProfile();
		let payload = {
			ids: this.selectedOptions,
			balance_status: type,
			user_id: user.userDetail.id,
		};
		this.alertService
			.conformAlert('Are you sure?', 'You want to ' + type)
			.then((result) => {
				if (result.value) {
					this.balanceManagerService
						.updateBalanceManagerStatusMultiple(payload)
						.subscribe((res: any) => {
							if (res.success) {
								this.selectedOptions = [];
								this.objectRefreshService.countObjectRefresh(
									false
								);
								this.alertService.success(
									'Success',
									'Item ' + type + ' successfully'
								);
								this.refreshList();
							}
						});
				}
			});
	}
}
