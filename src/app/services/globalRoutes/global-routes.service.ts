import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class GlobalRoutesService {
	private roles: any[] = [
		{
			name: 'Dashboard',
			url: `/admin/dashboard`,
			isEnabled: true,
			permissions: "ALL",
			id:"sidebar-nav",
			icon: "bi bi-grid"
		},
		{
			name: 'Members',
			url: `#`,
			isEnabled: false,
			id:"members-nav",
			icon: "bi bi-person",
			child: [
				{
					name: 'Agents',
					url: `/admin/agent-users`,
					view: false,
					action: false
				}
			],
		},
		{
			name: 'Balance Manager',
			url: `#`,
			isEnabled: false,
			id:"balance-nav",
			icon: "bi bi-gem",
			child: [
				{
					name: 'All Transactions',
					url: `/admin/balance-manager`,
					view: false,
					action: false,
				},
				{
					name: 'Success',
					url: `/admin/balance-manager/success`,
					view: false,
					action: false,
				},
				{
					name: 'Pending',
					url: `/admin/balance-manager/pendings`,
					view: false,
					action: false,
				},
				{
					name: 'Fake',
					url: `/admin/balance-manager/fake`,
					view: false,
					action: false,
				},
				{
					name: 'Rejected',
					url: `/admin/balance-manager/rejected`,
					view: false,
					action: false,
				},
				{
					name: 'Approved',
					url: `/admin/balance-manager/approved`,
					view: false,
					action: false,
				},{
					name: 'Danger',
					url: `/admin/balance-manager/danger`,
					view: false,
					action: false,
				}
			],
		},
		{
			name: 'Modems',
			url: `#`,
			isEnabled: false,
			id:"modem-nav",
			icon: "bi bi-menu-button-wide",
			child: [
				{
					name: 'Modem List',
					url: `/admin/modem`,
					view: false,
					action: false,
				},
				{
					name: 'Modem Settings',
					url: `/admin/modem/modem-settings`,
					view: false,
					action: false,
				},
			],
		},
		{
			name: 'Sms Inbox',
			url: `#`,
			isEnabled: false,
			id:"sms-nav",
			icon: "bi bi-envelope",
			child: [
				{
					name: 'All sms',
					url: `/admin/sms-inboxs`,
					view: false,
					action: false,
				},
				{
					name: 'Cash Out',
					url: `/admin/sms-inboxs/cash-out`,
					view: false,
					action: false,
				},
				{
					name: 'Cash In',
					url: `/admin/sms-inboxs/cash-in`,
					view: false,
					action: false,
				},
				{
					name: 'B2B',
					url: `/admin/sms-inboxs/b2b`,
					view: false,
					action: false,
				},
			],
		},{
			name: 'Merchants',
			url: `/admin/merchants`,
			isEnabled: false,
			permissions: "ALL",
			id:"sidebar-Merchants",
			icon: "bi bi-grid"
		}
		// {
		// 	name: 'Merchants',
		// 	url: ``,
		// 	isEnabled: false,
		// 	id:"mechant-nav",
		// 	icon: "bi bi-envelope",
		// 	child: [
		// 		{
		// 			name: 'List',
		// 			url: ``,
		// 			view: false,
		// 			action: false,
		// 		}
		// 	],
		// }
	];
	
	constructor() {}
	getRolesWithPermission() {
		return this.roles;
	}
	checkRolePermission() {
		let roles: any = localStorage.getItem('userProfile');
		roles = JSON.parse(roles);
		roles.permissions.modules.forEach((item: any) => {
			let findRole = this.roles?.find((t) => t.name === item?.name);
			findRole.isEnabled = false;
			if (item?.name == findRole?.name && item?.name != 'Dashboard' && item?.name != "Merchants") {
				item?.permissions.forEach((roleItem: any) => {
					let findPermission = findRole?.child?.find(
						(p: any) => p?.name === roleItem?.name
					);
					findPermission.view = roleItem?.view;
					findPermission.action = roleItem?.action;
					if (roleItem?.view || roleItem?.action) {
						findRole.isEnabled = true;
					}
				});
			}else{
				if(item?.isEnabled){
					findRole.isEnabled = item?.isEnabled;
				}
				
			}
		});
		return this.roles;
	}
}
