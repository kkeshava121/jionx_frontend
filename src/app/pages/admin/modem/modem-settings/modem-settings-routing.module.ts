import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModemSettingsComponent } from './modem-settings.component';

const routes: Routes = [
  {
		path: '',
		component: ModemSettingsComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModemSettingsRoutingModule { }
