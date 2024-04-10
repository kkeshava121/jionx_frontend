import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { eventListeners } from '@popperjs/core';
import { BalanceManagerService } from '@services/balance-manager/balance-manager.service';
import { CommonService } from '@services/common/common.service';
import { interval, take } from 'rxjs';

@Component({
	selector: 'app-balance-manager-search',
	templateUrl: './balance-manager-search.component.html',
	styleUrls: ['./balance-manager-search.component.css'],
})
export class BalanceManagerSearchComponent {
	@Input() itemsPerPage: any;
	@Input() pageNumber: any;
	@Input() balance_manager_filter!: number;
	@Input() autoRefresh?: boolean = false;
	@Output() balanceManager = new EventEmitter();
	settingSearchForm!: FormGroup;
	searchTerm: string = '';
	searchParams: any;
	validationMessageTo: string = '';
	validationMessageFrom: string = '';
	isReset: boolean = true;
	bankList: any;
	currentUrl!: string;
	seconds: number = 25;
	timerSubscription: any;
	isAutoRefresh: boolean = false;
	currentRole: string = '';
	constructor(
		private fb: FormBuilder,
		private balanceManagerService: BalanceManagerService,
		private bankService: CommonService,
		private router: Router,
		private autoRefreshService: CommonService,
	) {}
	ngOnInit() {
		this.allBank();
		this.initSearchForm();
		this.currentUrl = this.router.url;
		// this.autoRefreshService.getIsBLAutoRefresh().subscribe((res:any)=>{
		// 	if(res.refresh){
		// 		this.setAutoRefreshAccordingToPagination(res);
		// 	}
			
		// })
		// if (this.autoRefresh) {
		// 	this.setTimer();
		// }
	}
	initSearchForm() {
		this.settingSearchForm = this.fb.group({
			sender: [''],
			agentAccountNo: [''],
			transactionId: [''],
			status: [''],
			type: [''],
			dateFrom: [''],
			dateTo: [''],
			itemsPerPage: [this.itemsPerPage],
		});
		this.currentRole = this.bankService.getCurrentRole();
		if (this.currentRole === "Merchant"){
			this.settingSearchForm.patchValue({type: "Cash Out"});
		}
	}
	search(data: any) {
		this.pageNumber = 1;
		this.searchParams = {
			page_size: this.itemsPerPage,
			page_number: this.pageNumber,
			sender: data.sender || null,
			agent_account_no: data.agentAccountNo || null,
			transaction_id: data.transactionId || null,
			status: data.status || null,
			b_type: data.type || null,
			balance_manager_filter: this.balance_manager_filter,
		};
		if (data.dateFrom != '' && data.dateTo == '') {
			this.validationMessageTo = 'Please Select the Date To';
			return;
		} else if (data.dateFrom == '' && data.dateTo != '') {
			this.validationMessageFrom = 'Please Select the Date From';
			return;
		}

		if (data.dateTo && data.dateFrom) {
			const toDate = new Date(data.dateTo);
			const convertedToDate = new Date(
				toDate.getTime() - 24 * 60 * 60 * 1000
			); // Subtracting 24 hours in milliseconds
			const formattedT0Date = convertedToDate.toISOString();
			const fromDate = new Date(data.dateFrom);
			const convertedFromDate = new Date(
				fromDate.getTime() - 24 * 60 * 60 * 1000
			); // Subtracting 24 hours in milliseconds
			const formattedFromDate = convertedFromDate.toISOString();
			this.searchParams.from = formattedFromDate || null;
			this.searchParams.to = formattedT0Date || null;
		}
		this.isReset = false;
		this.balanceManager.emit(this.searchParams);
	}
	balanceManagerSearch(data: any) {
		this.isAutoRefresh = false;
		this.setTimer();
		this.search(data);
	}
	allBank() {
		this.bankService.getAllBanks().subscribe((res: any) => {
			if (res.success) {
				this.bankList = res?.data;
			}
		});
	}
	resetSearch() {
		this.settingSearchForm.reset({
			type: '',
			sender: '',
			dateFrom: '',
			dateTo: '',
			itemsPerPage: '50',
		});
		this.search(this.settingSearchForm.value);
		this.isReset = true;
	}
	refreshList() {
		this.pageNumber = 1;
		this.search(this.settingSearchForm.value);
	}
	autoRefreshList() {
		if (this.currentUrl === '/admin/balance-manager') {
			this.refreshList();
		}
	}
	startTimer(): void {
		if (this.isAutoRefresh) {
			this.timerSubscription = interval(1000) // 12 seconds
				.pipe(take(Infinity))
				.subscribe(() => {
					if (this.seconds == 0) {
						this.autoRefreshList();
						this.seconds = 25;
					} else {
						this.seconds -= 1;
					}
				});
		}
	}
	stopTimer(): void {
		if (this.timerSubscription) {
			this.timerSubscription.unsubscribe();
		}
	}
	setTimer() {
		if (this.isAutoRefresh == false) {
			this.stopTimer();
		} else {
			this.startTimer();
		}
	}
	get formattedTime(): string {
		const minutes = Math.floor(this.seconds / 60);
		const remainingSeconds = this.seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}
	setAutoRefreshAccordingToPagination(data:any){
		if(data?.pageNumber > 1){
			this.autoRefresh = false
			this.isAutoRefresh = false;
			this.setTimer();
		}else{
			this.autoRefresh = true
			this.isAutoRefresh = true;
		    this.setTimer();
		}
		
	}
	ngOnDestroy(): void {
		if (this.timerSubscription) {
			this.timerSubscription.unsubscribe();
		}
	}
}
