import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '@services/common/common.service';
import { ModemService } from '@services/modem/modem.service';
import { SmsInboxsService } from '@services/sms-inboxs/sms-inboxs.service';

@Component({
	selector: 'app-sms-inboxs',
	templateUrl: './sms-inboxs.component.html',
	styleUrls: ['./sms-inboxs.component.css'],
})
export class SmsInboxsComponent {
	isDisplayed: boolean = true;
	smsInboxs: any;
	itemsPerPage: number = 50;
	pageNumber: number = 1;
	allPages!: number;
	displayedData: any = [];
	filteredList: any[] = [];
	phoneNumbers: any;
	totalRows: number = 0;
	searchParm: any;
	constructor(
		private smsService: SmsInboxsService,
	) {}
	ngOnInit() {
		this.searchParm = {page_size: this.itemsPerPage,
			page_number: this.pageNumber,message_type: -1}
		this.smsList();
	}
	
	
	smsList() {
		let data = {
			page_size: this.searchParm?.page_size,
			page_number: this.searchParm?.page_number,
			message_type: this.searchParm?.message_type,
			text_message: this.searchParm?.text_message || null,
			sender: this.searchParm?.sender || null,
			receiver: this.searchParm?.receiver || null,
			sim_slot: this.searchParm?.sim_slot || null,
			sms_date: this.searchParm?.sms_date || null,
		};
		this.isDisplayed = true;
		this.smsService.getAllSmsInboxs(data).subscribe((res: any) => {
			if (res.success) {
				this.smsInboxs = res?.data;
				this.filteredList = [...this.smsInboxs];
				this.displayedData = this.filteredList;
				this.totalRows = res?.total_rows;
				//this.allPages = Math.ceil(res?.data?.totalRows / this.itemsPerPage);
			}
			this.isDisplayed = false;
		});
	}
	search(data:any){
		this.searchParm= data;
		this.itemsPerPage = this.searchParm?.page_size;
		this.pageNumber = this.searchParm?.page_number;
		this.smsList();
	}
	
	onPageChange(page?: any): void {
		this.pageNumber = page;
		this.searchParm.page_number = page;
		this.smsList();
	}
	
}
