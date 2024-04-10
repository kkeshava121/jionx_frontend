import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModemComponent } from './modem.component';
import { ModemSettingsComponent } from './modem-settings/modem-settings.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
		path: '',
		component: ModemComponent,
	},
  {
		path: 'modem-settings',
		component: ModemSettingsComponent,
	},{
		path: 'add',
		component: AddComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModemRoutingModule { }
