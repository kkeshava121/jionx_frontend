import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BalanceManagerService } from '@services/balance-manager/balance-manager.service';
import { CommonService } from '@services/common/common.service';

@Component({
	selector: 'app-fake',
	templateUrl: './fake.component.html',
	styleUrls: ['./fake.component.css'],
})
export class FakeComponent {
	searchParams: any;
	isDisplayed: boolean = true;
	balanceManager: any;
	searchTerm: string = '';
	itemsPerPage: number = 50;
	allPages!: number;
	pageNumber: number = 1;
	displayedData: any = [];
	filteredList: any[] = [];
	totalRows:number = 0;
	settingSearchForm!: FormGroup;
	bankList: any;
	validationMessageTo:string = '';
	validationMessageFrom:string = '';
	isReset: boolean = true;
	constructor(private balanceManagerService: BalanceManagerService,private fb: FormBuilder,private bankService: CommonService) {}
	ngOnInit() {
		this.balanceManagerList();
		this.initSearchForm();
		this.allBank()
	}
	initSearchForm(){
		this.settingSearchForm = this.fb.group({
			sender: [''],
			agentAccountNo: [''],
			transactionId: [''],
			status: [''],
			type: [''],
			dateFrom:[''],
			dateTo:[''],
			itemsPerPage:[this.itemsPerPage]
		});
	}
	balanceManagerList() {
		let data = {
			"page_size": this.itemsPerPage,
			"page_number": this.pageNumber,
			"sender": this.searchParams?.sender,
			"agent_account_no": this.searchParams?.agentAccountNo,
			"transaction_id": this.searchParams?.transactionId,
			"status":this.searchParams?.status,
			"b_type": this.searchParams?.type,
			"balance_manager_filter": 2,
			"from": this.searchParams?.from,
			"to": this.searchParams?.to,
		  }
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
		this.searchParams = {
			"page_size": this.itemsPerPage,
			"page_number": this.pageNumber,
			"sender": data.sender || null,
			"agent_account_no": data.agentAccountNo || null,
			"transaction_id": data.transactionId || null,
			"status":data.status || null,
			"b_type": data.type || null,
			"balance_manager_filter": 2
		  }
		  if(data.dateFrom !='' && data.dateTo == ''){
			this.validationMessageTo = "Please Select the Date To"
			return
		  }else if(data.dateFrom =='' && data.dateTo != ''){
			this.validationMessageFrom = "Please Select the Date From"
			return
		  }
		  if(data.dateTo && data.dateFrom){
			const toDate = new Date(data.dateTo);
			const convertedToDate = new Date(toDate.getTime() - (24 * 60 * 60 * 1000)); // Subtracting 24 hours in milliseconds
			const formattedT0Date = convertedToDate.toISOString();
			const fromDate = new Date(data.dateFrom);
			const convertedFromDate = new Date(fromDate.getTime() - (24 * 60 * 60 * 1000)); // Subtracting 24 hours in milliseconds
			const formattedFromDate = convertedFromDate.toISOString(); 
			this.searchParams.from = formattedFromDate || null;
			this.searchParams.to = formattedT0Date || null;
		  }
		  this.isDisplayed = true;
		  this.isReset = false;
		this.balanceManagerService
			.getAllBalanceService(this.searchParams)
			.subscribe((res: any) => {
				if (res.status === 200) {
					this.balanceManager = res?.data;
					this.filteredList = [...this.balanceManager];
					this.displayedData = this.filteredList;
					this.totalRows = res?.total_rows;
				
				}
				else if(res.status === 404){
					this.balanceManager = [];
					this.totalRows = 0;
				}
				this.isDisplayed = false;
			});
	}
	allBank() {
		this.bankService.getAllBanks().subscribe((res: any) => {
			if (res.success) {
				this.bankList = res?.data;
			}
		});
	}
	onPageChange(page:any): void {
		this.pageNumber = page;
		this.balanceManagerList();
	}
	resetSearch(){
		this.settingSearchForm.reset({type:'',sender:'',itemsPerPage:'50'});
		this.search(this.settingSearchForm.value);
	}
}
