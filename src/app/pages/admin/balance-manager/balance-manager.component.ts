import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '@services/alert/alert.service';
import { BalanceManagerService } from '@services/balance-manager/balance-manager.service';
import { CommonService } from '@services/common/common.service';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-balance-manager',
	templateUrl: './balance-manager.component.html',
	styleUrls: ['./balance-manager.component.css'],
})
export class BalanceManagerComponent {
	searchParams: any;
	isDisplayed: boolean = true;
	balanceManager: any;
	itemsPerPage: number = 50;
	pageNumber: number = 1;
	allPages!: number;
	displayedData: any = [];
	filteredList: any[] = [];
	bankList: any;
	totalRows: number = 0;
	showingData: any;
	closeResult: string = '';
	currentUrl!: string;
	currentRole: string = '';
	userProfile: any;
	constructor(
		private balanceManagerService: BalanceManagerService,
		private fb: FormBuilder,
		private objectRefreshService: CommonService,
		private alertService: AlertService,
		private modalService: NgbModal,
		private router: Router,
	) {}
	ngOnInit() {
		this.userProfile = localStorage.getItem('userProfile');
		this.userProfile = JSON.parse(this.userProfile);
		this.currentRole = this.userProfile.userRoles[0];
		this.currentUrl = this.router.url;
		this.searchParams = {page_size: this.itemsPerPage,
			page_number: this.pageNumber,balance_manager_filter: -1}
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
		this.objectRefreshService.isBLAutoRefresh({refresh: true,pageNumber: page});
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
	showData(content: any, item: any) {
		this.showingData = item;
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
	refreshList() {
		this.pageNumber = 1;
		this.balanceManagerList();
	}
	
}
