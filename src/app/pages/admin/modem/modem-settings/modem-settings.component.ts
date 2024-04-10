import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '@services/alert/alert.service';
import { CommonService } from '@services/common/common.service';
import { ModemService } from '@services/modem/modem.service';

@Component({
	selector: 'app-modem-settings',
	templateUrl: './modem-settings.component.html',
	styleUrls: ['./modem-settings.component.css'],
})
export class ModemSettingsComponent {
	title = 'appBootstrap';
	isDisplayed: boolean = true;
	closeResult: string = '';
	settingsList: any;
	settingsForm!: FormGroup;
	bankList: any;
	modemSettingID: any;
	searchTerm: string = '';
	itemsPerPage: number = 10;
	allPages!: number;
	displayedData: any = [];
	filteredList: any[] = [];
	constructor(
		private modalService: NgbModal,
		private modemService: ModemService,
		private alertService: AlertService,
		private fb: FormBuilder,
		private bankService: CommonService
	) {}
	ngOnInit() {
		this.modemSettingsList();
		this.allBank();
		this.initForm();
		
	}
	initForm(data?: any) {
		this.settingsForm = this.fb.group({
			balance_check_USSD: ['', Validators.required],
			cash_in_USSD: ['', Validators.required],
			bank_id: ['', Validators.required],
		});
	}
	
	open(content: any, data: any) {
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
		this.modemSettingID = data?.id;
		this.settingsForm.patchValue({
			balance_check_USSD: data?.balance_check_USSD,
			cash_in_USSD: data?.cash_in_USSD,
			bank_id: data?.bank_id,
		});
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
	modemSettingsList() {
		this.isDisplayed = true;
		this.modemService.getAllModemsSettings().subscribe((res: any) => {
			if (res.success) {
				this.settingsList = res?.data;
				this.filteredList = [...this.settingsList];
				this.onPageChange();
				this.allPages = Math.ceil(
					this.settingsList.length / this.itemsPerPage
				);
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
	save(data: any) {
		data.id = this.modemSettingID;

		this.modemService.updateModemSettings(data).subscribe((res: any) => {
			if (res.success) {
				this.alertService.success(
					'Success',
					'Modem settings has been updated successfully'
				);
			}
			this.modemSettingsList();
		});
	}
	search(data: any) {
		this.filteredList = data.filter(
			(user: any) =>
				user.balanceCheckUSSD
					.toLowerCase()
					.includes(this.searchTerm.toLowerCase()) ||
				user.cashInUSSD
					.toLowerCase()
					.includes(this.searchTerm.toLowerCase()) ||
				user.bank.bankName
					.toLowerCase()
					.includes(this.searchTerm.toLowerCase())
		);
		this.onPageChange();
		this.allPages = Math.ceil(this.filteredList.length / this.itemsPerPage);
	}
	onPageChange(page: number = 1): void {
		const startItem = (page - 1) * this.itemsPerPage;
		const endItem = page * this.itemsPerPage;
		this.displayedData = this.filteredList.slice(startItem, endItem);
	}
	deleteSettings(ID:any){
		this.modemService.deletModemSettings(ID).subscribe((res:any)=>{
			if (res.success) {
				this.alertService.success(
					'Success',
					'Modem settings delete successfully'
				  );
				this.modemSettingsList();
			}else{
				this.alertService.error(
					'Error',
					'Something went wrong'
				);
			}
		})
	}
}
