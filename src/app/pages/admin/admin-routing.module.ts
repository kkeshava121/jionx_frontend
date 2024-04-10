import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
		path: '',
		component: AdminComponent,
		children: [
			{
				path: 'balance-manager',
				loadChildren: () =>
					import('@pages/admin/balance-manager/balance-manager.module').then(
						(m) => m.BalanceManagerModule
					),
			},
			{
				path: 'dashboard',
				loadChildren: () =>
					import('@pages/admin/dashboard/dashboard.module').then((m) => m.DashboardModule),
			},
			{
				path: 'modem',
				loadChildren: () =>
					import('@pages/admin/modem/modem.module').then(
						(m) => m.ModemModule
					),
			},
			{
				path: 'modemsettings',
				loadChildren: () =>
					import('@pages/admin/modem/modem-settings/modem-settings.module').then(
						(m) => m.ModemSettingsModule
					),
			},{
				path: 'sms-inboxs',
				loadChildren: () =>
					import('@pages/admin/sms-inboxs/sms-inboxs.module').then(
						(m) => m.SmsInboxsModule
					),
			},{
				path: 'members',
				loadChildren: () =>
					import('@pages/admin/members/members.module').then(
						(m) => m.MembersModule
					),
			},
			{
				path: 'agent-users',
				loadChildren: () =>
					import('@pages/admin/members/agent-users/agent-users.module').then(
						(m) => m.AgentUsersModule
					),
			},
			{
				path: 'agent-users/add',
				loadChildren: () =>
					import('@pages/admin/members/agent-users/add-user/add-user.module').then(
						(m) => m.AddUserModule
					),
			},
			{
				path: 'agent-users/edit/:id',
				loadChildren: () =>
					import('@pages/admin/members/agent-users/edit/edit.module').then(
						(m) => m.EditModule
					),
			},{
				path: 'merchants',
				loadChildren: () =>
					import('@pages/admin/merchants/merchants.module').then(
						(m) => m.MerchantsModule
					),
			},
			{
				path: 'merchants/add',
				loadChildren: () =>
					import('@pages/admin/merchants/add-user/add-user.module').then(
						(m) => m.AddUserModule
					),
			},
			{
				path: 'merchants/edit/:id',
				loadChildren: () =>
					import('@pages/admin/merchants/edit/edit.module').then(
						(m) => m.EditModule
					),
			}
		],
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
