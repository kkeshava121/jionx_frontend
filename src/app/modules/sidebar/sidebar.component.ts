import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BalanceManagerService } from '@services/balance-manager/balance-manager.service';
import { CommonService } from '@services/common/common.service';
import { GlobalRoutesService } from '@services/globalRoutes/global-routes.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
	userProfile: any = localStorage.getItem('userProfile');
	statusCount: any = [];
	itemsPerPage: number = 10;
  menus:any;
	constructor(
		private router: Router,
		private balance_service: BalanceManagerService,
		private globalRoutes: GlobalRoutesService,
		private objectRefreshService: CommonService,
	) {
		
		this.getCountsObject()
	}

	ngOnInit() {
		this.userProfile = JSON.parse(this.userProfile);
    	this.menus = this.globalRoutes.checkRolePermission();
		this.objectRefreshService.getcountObjectRefresh().subscribe((res:any)=>{
			this.getCountsObject();
		})
	}

	isCurrentUrl(routes: any): boolean {
		return routes.includes(this.router.url);
	}
	getCountsObject(){
		this.balance_service.getStatusCount().subscribe((res: any) => {
			if (res.status === true) {
				this.statusCount = res.data;
			}
		});
	}
}
