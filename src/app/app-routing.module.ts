import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/auth/auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
	{
		path: 'admin',
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('@pages/admin/admin.module').then((m) => m.AdminModule),
	},
	{
		path: 'login',
		loadChildren: () =>
			import('@pages/login/login.module').then((m) => m.LoginModule),
	},
	{
		path: 'pin-code',
		loadChildren: () =>
			import('@pages/pin-code/pin-code.module').then(
				(m) => m.PinCodeModule
			),
	},
	{
		path: '**',
		loadChildren: () =>
			import('@pages/common/page-not-found/page-not-found.module').then(
				(e) => e.PageNotFoundModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
