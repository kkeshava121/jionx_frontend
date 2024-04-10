import { Component } from '@angular/core';
import { AlertService } from '@services/alert/alert.service';
import { ModemService } from '@services/modem/modem.service';
export interface selectAllOject {
	checked?: boolean;
}
@Component({
	selector: 'app-modem',
	templateUrl: './modem.component.html',
	styleUrls: ['./modem.component.css'],
})
export class ModemComponent {
	isDisplayed: boolean = true;
	modemList: any;
	searchTerm: string = '';
	itemsPerPage: number = 50;
	pageNumber: number = 1;
	allPages!: number;
	displayedData: any = [];
	filteredList: any[] = [];
	selectedOptions: string[] = [];
	selectAllOject!: selectAllOject[];
	isChecked: boolean = false;
	isSelectAllChecked: boolean = false;
	searchParm: any = [];
	totalRows: number = 0;
	userProfile: any
	constructor(private modemService: ModemService, private alertService: AlertService) { }
	ngOnInit() {
		this.searchParm = {
			page_size: this.itemsPerPage,
			page_number: this.pageNumber
		}
		this.modem();
		let userData: any = localStorage.getItem('userProfile');
		this.userProfile = JSON.parse(userData);
		console.log(this.userProfile)
	}
	modem() {
		let data = {
			page_size: this.itemsPerPage,
			page_number: this.pageNumber,
			// operator: this.searchParm?.operator,
			device_id: this.searchParm?.device_id || null,
			device_info: this.searchParm?.device_info || null,
			phone_number: this.searchParm?.phone_number || null,
			agent: this.searchParm?.agent || null,
			is_active: true
		};
		this.isDisplayed = true;
		this.modemService.getAllModemsFilter(data).subscribe((res: any) => {
			if (res.status === 200) {
				this.modemList = res?.data;
				this.filteredList = [...this.modemList];
				this.displayedData = this.filteredList;
				this.totalRows = res?.total_rows;
				//this.onPageChange();
				// this.allPages = Math.ceil(
				// 	this.modemList.length / this.itemsPerPage
				// );
			}
			this.isDisplayed = false;
		});
	}
	search(data: any) {
		this.searchParm = data;
		this.itemsPerPage = this.searchParm?.page_size;
		this.pageNumber = this.searchParm?.page_number;
		this.modem();
	}

	onPageChange(page?: any): void {
		this.pageNumber = page;
		this.searchParm.page_number = page;
		this.modem();
	}
	checkBoxValue(data?: any, event?: any) {
		if (event.target.checked) {
			this.selectedOptions.push(data)
		} else {
			this.selectedOptions.forEach((element, index) => {
				if (element == data) { this.selectedOptions.splice(index, 1); }
			});
		}
		if (this.selectedOptions.length == 0) {
			this.isSelectAllChecked = false
		}
	}
	deleteObject() {
		this.modemService.delete(this.selectedOptions).subscribe((res: any) => {
			if (res?.status === 200) {
				this.alertService.success(
					'Success',
					'Modem item delete successfully'
				);
				this.modem();
			} else {
				this.alertService.error(
					'Error',
					'Something went wrong'
				);
			}
		})
	}
	deleteAllList(event: any) {
		this.selectedOptions = [];
		if (event.target.checked) {
			this.isChecked = true;
			this.isSelectAllChecked = true;
			this.displayedData.forEach((item: any) => {
				this.selectedOptions.push(item?.id)
			});
		} else {
			this.isChecked = false
		}
	}
	updateStatus(id: any, modem_action: number) {
		this.modemService.updateStatus(id, modem_action).subscribe((res: any) => {
			if (res?.success) {
				this.alertService.success(
					'Success',
					'Modem status updated successfully'
				);
				this.modem();
			} else {
				this.alertService.error(
					'Error',
					'Something went wrong'
				);
			}
		})
	}
	loginSuspended(ID: any, item: boolean) {
		let status = !item
		let name;
		if (status) {
			name = 'Suspend';
		} else {
			name = 'Active';
		}
		let data = {
			"modem": {
				"id": ID,
				"suspended": status
			}

		}
		this.alertService
			.conformAlert('Are you sure?', 'You want to modem ' + name)
			.then((result) => {
				if (result.value) {
					this.modemService.suspendModem(data).subscribe((res: any) => {
						if (res.status == 200) {
							this.alertService.success('', res.message);
							this.modem();
						}else{
							this.alertService.warning('', res.message);
						}
					})
				}
			})
	}
	deleteModem(ID:any){
		this.alertService
			.conformAlert('Are you sure?', 'You want to modem')
			.then((result) => {
				if (result.value) {
					this.modemService.deleteModem(ID).subscribe((res:any)=>{
						if(res.status == 200){
							this.modem();
							this.alertService.success(
								'Success',
								'Modem delete successfully'
							);
						}else{
							this.alertService.warning('',res.message)
						}
					})
				}})
	}
}