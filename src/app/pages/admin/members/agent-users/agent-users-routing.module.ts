import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentUsersComponent } from './agent-users.component';

const routes: Routes = [
  {
		path: '',
		component: AgentUsersComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentUsersRoutingModule { }
