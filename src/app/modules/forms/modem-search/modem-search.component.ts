import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modem-search',
  templateUrl: './modem-search.component.html',
  styleUrls: ['./modem-search.component.css']
})
export class ModemSearchComponent {
  @Input() itemsPerPage: any;
  @Input() pageNumber: any;
  @Output() modemSearchData = new EventEmitter();
  settingSearchForm!: FormGroup;
  searchParm: any;
  isReset: boolean = true;
  constructor(
		private fb: FormBuilder,
	) {}
	ngOnInit() {
		this.initSearchForm();
	}
	initSearchForm() {
		this.settingSearchForm = this.fb.group({
			device_id: [''],
			device_info: [''],
			phone_number: [''],
    		agent:[''],
			page_size: [this.itemsPerPage],
		});
	}
  search(data: any) {
		this.pageNumber = 1;
		this.searchParm = {
			page_size: this.itemsPerPage,
			page_number: this.pageNumber,
			device_id: data.device_id || null,
			device_info: data.device_info || null,
			phone_number: data.phone_number || null,
			agent: data.agent || null
		};
    this.isReset = false;
		this.modemSearchData.emit(this.searchParm);
  }
  resetSearch() {
		this.settingSearchForm.reset({ page_size: '50' });
		this.search(this.settingSearchForm.value);
		this.isReset = true;
	}
}
