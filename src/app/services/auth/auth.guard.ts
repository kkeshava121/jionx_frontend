import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { GlobalRoutesService } from '@services/globalRoutes/global-routes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService,private globalRoutes: GlobalRoutesService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.isAtuhorized(route,state);
  }
  private isAtuhorized(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {

    let matchValue: any;
    let routeName;
    let editRouteName
    let expectedRoles:any = state?.url;
    routeName = expectedRoles.split("/");
    if(routeName[3] == "edit" || routeName[3] == "add"){
      expectedRoles = "/"+routeName[1]+"/"+routeName[2];
    }else{
      expectedRoles = expectedRoles;
    }
   
      if (this.authService.isLoggedIn()) {
        let roles: any = this.globalRoutes.checkRolePermission();
        roles.forEach((item:any) => {
          if(item.name == "Dashboard" || item.name == "Merchants"){
            if(item.url == expectedRoles){
              matchValue = item?.isEnabled;
            }
          }else{
            item?.child.forEach((childItem:any) => {
              if(expectedRoles==childItem.url){
                if(childItem.view || childItem.action){
                  matchValue = true;
                }else{
                  matchValue = false;
                }
                
              }
             });
          }
        });
      } else {
        window.location.href = "/login";
        return false;
      }
      if(matchValue == false){
       window.location.href = "404"
      }
      return matchValue;
  }
}
