import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@services/alert/alert.service';
import { CommonService } from '@services/common/common.service';
import { LoginService } from '@services/login/login.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
	userProfile: any;
	sidebar: boolean = false;
	themeMode: string = 'style';
	constructor(
		private alertService: AlertService,
		private logOutService: LoginService,
		private elementRef: ElementRef,
		private renderer: Renderer2,
		private router: Router,
		private commonService: CommonService
	) {
		this.themeMode = localStorage.getItem('themeMode') || 'style';
	}
	ngOnInit() {
		this.userProfile = localStorage.getItem('userProfile');
		this.userProfile = JSON.parse(this.userProfile);
	}
	logout() {
		//localStorage.clear();
		this.logOutService.logOut().subscribe((res: any) => {
			if (res.status == 200) {
				this.alertService.success('Success', res?.message);
				localStorage.clear();
				this.commonService.setThemeMode({ type: 'style' });
				this.router.navigate(['/login']);
			}
		});
		// this.router.navigate(['/login']);
		// this.alertService.success('Success', 'Logout successfully');
	}

	toggleSidebar() {
		if (this.sidebar) {
			this.renderer.removeClass(
				this.elementRef.nativeElement.ownerDocument.body,
				'toggle-sidebar'
			);
		} else {
			this.renderer.addClass(
				this.elementRef.nativeElement.ownerDocument.body,
				'toggle-sidebar'
			);
		}
		this.sidebar = !this.sidebar;
	}
	changeThemeMode(event: any, type: any) {
		this.themeMode = type;
		this.commonService.setThemeMode({ type: type });
	}
}
