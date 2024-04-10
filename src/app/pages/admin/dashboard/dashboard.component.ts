import { Component } from '@angular/core';
import { BalanceManagerService } from '@services/balance-manager/balance-manager.service';
import { CommonService } from '@services/common/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isDisplayed: boolean = true;
  balanceManager: any;
  searchTerm: string = '';
  itemsPerPage: number = 10;
  allPages!: number;
  displayedData: any = [];
  filteredList: any[] = [];
  userProfile:any;
  currentRole: any;
  tabsData: any = {}
  constructor(private balanceManagerService: BalanceManagerService, private commonService: CommonService) { }
  ngOnInit() {
    this.userProfile = localStorage.getItem('userProfile');
		this.userProfile = JSON.parse(this.userProfile);
		this.currentRole = this.userProfile.userRoles[0];
    this.balanceManagerList();
    this.getDashboardCount();
  }
  balanceManagerList() {
    let data = {
			"page_size": 15,
			"page_number": 1,
			"balance_manager_filter": -1
		  }
    this.isDisplayed = true;
    this.balanceManagerService
      .getAllBalanceService(data)
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.balanceManager = res?.data;
          this.filteredList = [...this.balanceManager];
          this.onPageChange();
          this.allPages = Math.ceil(
            this.balanceManager.length / this.itemsPerPage
          );
        }
        this.isDisplayed = false;
      });
  }
  search(data: any) {
    this.filteredList = data.filter(
      (item: any) =>
        item.sender
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        item.agentAccountNo
          .toString()
          .includes(this.searchTerm.toLowerCase()) ||
        item.amount
          .toString()
          .includes(this.searchTerm.toLowerCase()) ||
        item.customerAccountNo
          .toString()
          .includes(this.searchTerm.toLowerCase()) ||
        item.lastBalance
          .toString()
          .includes(this.searchTerm.toLowerCase()) ||
        item.oldBalance
          .toString()
          .includes(this.searchTerm.toLowerCase()) ||
        item.transactionId
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.onPageChange();
    this.allPages = Math.ceil(this.filteredList.length / this.itemsPerPage);
  }
  onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.displayedData = this.filteredList.slice(startItem, endItem);
  }

  getDashboardCount(){
    this.commonService
      .getDashboardData()
      .subscribe((res: any) => {
        if(res.status === 200){
          this.tabsData = res?.data;
        }
      });
  }
}
