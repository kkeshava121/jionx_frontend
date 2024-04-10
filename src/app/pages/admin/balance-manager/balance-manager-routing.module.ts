import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceManagerComponent } from './balance-manager.component';
import { SuccessComponent } from './success/success.component';
import { RejectedComponent } from './rejected/rejected.component';
import { PendingsComponent } from './pendings/pendings.component';
import { FakeComponent } from './fake/fake.component';
import { ApprovedComponent } from './approved/approved.component';
import { DangerComponent } from './danger/danger.component';

const routes: Routes = [
	{
		path: '',
		component: BalanceManagerComponent,
	},
	{
		path: 'fake',
		component: FakeComponent,
	},
	{
		path: 'pendings',
		component: PendingsComponent,
	},
	{
		path: 'rejected',
		component: RejectedComponent,
	},
	{
		path: 'success',
		component: SuccessComponent,
	},
	{
		path: 'approved',
		component: ApprovedComponent,
	},
	{
		path: 'danger',
		component: DangerComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BalanceManagerRoutingModule {}
