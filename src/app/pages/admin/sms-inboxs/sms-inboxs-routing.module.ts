import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsInboxsComponent } from './sms-inboxs.component';
import { B2bComponent } from './b2b/b2b.component';
import { CashInComponent } from './cash-in/cash-in.component';
import { CashOutComponent } from './cash-out/cash-out.component';

const routes: Routes = [
  {
		path: '',
		component: SmsInboxsComponent
	},
  {
		path: 'b2b',
		component: B2bComponent
	},
  {
		path: 'cash-in',
		component: CashInComponent
	},
  {
		path: 'cash-out',
		component: CashOutComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsInboxsRoutingModule { }
