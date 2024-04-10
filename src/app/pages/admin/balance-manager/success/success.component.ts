import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BalanceManagerService } from '@services/balance-manager/balance-manager.service';
import { CommonService } from '@services/common/common.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
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
	totalRows:number = 0;
	constructor(private balanceManagerService: BalanceManagerService,private fb: FormBuilder,private bankService: CommonService) {}
	ngOnInit() {
		this.searchParams = {page_size: this.itemsPerPage,
			page_number: this.pageNumber,balance_manager_filter: 0}
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
	
}
