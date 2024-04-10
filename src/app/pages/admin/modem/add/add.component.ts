import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@services/alert/alert.service';
import { MembersService } from '@services/members/members.service';
import { ModemService } from '@services/modem/modem.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent {
	modemForm!: FormGroup;
	userList: any;
	userProfile: any = localStorage.getItem('userProfile');
	custNumber:any;
	config = {
		displayFn: (item: any) => { return item.email; } ,//to support flexible text displaying for each item
	displayKey: "email", //if objects array passed which key to be displayed defaults to description
		search: true, //true/false for the search functionlity defaults to false,
	height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
	placeholder: 'Choose ...', // text to be displayed when no item is selected defaults to Select,
	// customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
	limitTo: 10, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
	moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
	noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
	searchPlaceholder: 'Search', // label thats displayed in search input,
	searchOnKey: 'email', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
	clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
	inputDirection: 'ltr', // the direction of the search input can be rtl or ltr(default)
	selectAllLabel: 'Select all', // label that is displayed in multiple selection for select all
	enableSelectAll: false, // enable select all option to select all available items, default is false
	}
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private alertService: AlertService,
		private userService: MembersService,
		private modemService: ModemService
	) { }
	ngOnInit() {
		let userData: any = localStorage.getItem('userProfile');
		this.userProfile = JSON.parse(userData);
		console.log(this.userProfile)
		
		this.initLoginForm();
		this.getAgents();
		if(this.userProfile?.userRoles[0] == 'Agent'){
			this.modemForm.patchValue({user_id: this.userProfile?.userDetail?.id,agent_id:this.userProfile?.userDetail?.id} )
		}
	}

	initLoginForm(data?: any) {
		this.modemForm = this.fb.group({
			user_id: ['', [Validators.required]],
			phone_number: ['', [Validators.required, this.phoneNumberValidator]],
			suspended: ['false', Validators.required],
			agent_id: ['',[Validators.required,this.agentNumberValidator]]
		});
	}
	agentNumberValidator(control:FormControl){
		const val = control.value?.toString() || '';
		if(val == ''){
			return  { invalidNumber: true };
		}
		return true
	}
	phoneNumberValidator(control: FormControl) {
		const phoneNumber = control.value?.toString() || '';
		// Check if the number starts with 0
		if (phoneNumber.charAt(0) === '0') {
			// If it starts with 0, validate for 11 digits
			return phoneNumber.length === 11 ? null : { invalidNumber: true };
		} else {
			// If it doesn't start with 0, validate for 10 digits
			return phoneNumber.length === 10 ? null : { invalidNumber: true };
		}
	}
	save(data: any) {
		let dataObj: any
		if (this.modemForm.invalid) {
			return;
		}
		this.modemForm.value.suspended = JSON.parse(this.modemForm.value.suspended)
		this.modemForm.value.phone_number = this.custNumber;
		dataObj = {
			suspended: this.modemForm.value.suspended,
			phone_number: this.modemForm.value.phone_number,
			user_id: this.modemForm.value.user_id
		}
		this.modemService
			.addModem(dataObj)
			.subscribe((res: any) => {
				if (res?.status == 200) {
					this.alertService.success(
						'Success',
						'Modem has been created successfully'
					);
					setTimeout(() => {
						this.router.navigate(['/admin/modem']);
					}, 1000);
				}else{
					this.alertService.error(
						'error',
						res?.message
					);
				}
			});
	}
	getAgents() {
		let data;
		
		if (
			this.userProfile?.userDetail?.userRoles == 'Admin' ||
			this.userProfile?.userDetail?.userRoles == 'SuperAdmin'
		) {
			data = { parent_id: '', user_role: 'Agent' };
		} else {
			data = {
				parent_id: this.userProfile?.userDetail?.id,
				user_role: 'Agent',
			};
		}
		this.userService.getUser(data).subscribe((res: any) => {
			this.userList = res?.data;

		});
	}
	selectionChanged(data: any) {
		console.log(data)
		this.modemForm.patchValue({user_id: data?.value?.id})
		console.log(this.modemForm.value)
	}
	onKeyPress(event: KeyboardEvent) {
		const input = event.target as HTMLInputElement;
		if (input.value.charAt(0) === '0') {
			if (input.value.length >= 11) {
				event.preventDefault();
			}
		}
		else if (input.value.charAt(0) != '0') {
			if (input.value.length >= 10) {
				event.preventDefault();
			}
		}
	}
	numberOnly(event: any): boolean {
		this.custNumber = event.target.value;
		const charCode = event.which ? event.which : event.keyCode;
		if (charCode > 41 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	}
}
