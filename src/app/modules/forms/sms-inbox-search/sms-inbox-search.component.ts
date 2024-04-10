import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '@services/common/common.service';
import { ModemService } from '@services/modem/modem.service';
import { SmsInboxsService } from '@services/sms-inboxs/sms-inboxs.service';

@Component({
	selector: 'app-sms-inbox-search',
	templateUrl: './sms-inbox-search.component.html',
	styleUrls: ['./sms-inbox-search.component.css'],
})
export class SmsInboxSearchComponent {
	@Input() itemsPerPage: any;
	@Input() pageNumber: any;
	@Input() message_type!: number;
	@Output() smsInboxSearchData = new EventEmitter();

	phoneNumbers:any;
	settingSearchForm!: FormGroup;
	bankList: any;
	searchParm: any;
	isReset: boolean = true;
	constructor(
		private fb: FormBuilder,
		private bankService: CommonService,
		private modemService: ModemService
	) {}
	ngOnInit() {
		this.initSearchForm();
		this.allBank();
		this.getUniqeNumber();
	}
	initSearchForm() {
		this.settingSearchForm = this.fb.group({
			textMessageFilter: [''],
			senderFilter: [''],
			receiverFilter: [''],
			simSlotFilter: [''],
			smsDateFilter: [''],
			itemsPerPage: [this.itemsPerPage],
		});
	}
	search(data: any) {
		this.pageNumber = 1;
		this.searchParm = {
			page_size: this.itemsPerPage,
			page_number: this.pageNumber,
			message_type: this.message_type,
			text_message: data.textMessageFilter || null,
			sender: data.senderFilter || null,
			receiver: data.receiverFilter || null,
			sim_slot: data.simSlotFilter || null,
			sms_date: null,
		};

		if (data.smsDateFilter) {
			const date = new Date(data.smsDateFilter);
			const convertedDate = new Date(
				date.getTime() - 24 * 60 * 60 * 1000
			);
			const formattedDate = convertedDate.toISOString();
			this.searchParm.sms_date = formattedDate || null;
		}
		this.isReset = false;
		this.smsInboxSearchData.emit(this.searchParm);
	}

	getUniqeNumber() {
		this.modemService.getAllModems().subscribe((res: any) => {
			if (res.status === 200) {
				const unique = [
					...new Set(res?.data.map((item: any) => item.phone_number)),
				];
				this.numbers(unique);
			}
		});
	}
	numbers(data: any) {
		this.phoneNumbers = data.filter((x:any) => x !== null);
	}
	allBank() {
		this.bankService.getAllBanks().subscribe((res: any) => {
			if (res.success) {
				this.bankList = res?.data;
			}
		});
	}
	resetSearch() {
		this.settingSearchForm.reset({ senderFilter: '', itemsPerPage: '50' });
		this.search(this.settingSearchForm.value);
		this.isReset = true;
	}
}
