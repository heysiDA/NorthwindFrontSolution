import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from './auth.service';
import { IAuthStatus } from './authInterfaces/i-auth-status';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  protected currentAuthStatus: IAuthStatus;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.authStatus.subscribe(
      authStatus => (this.currentAuthStatus = (this.authService.getAuthStatus()))
    );
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
   return this.checkLogin();
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkPermissions(childRoute);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       return this.checkPermissions(next);
  }

  protected checkLogin() {
    if (this.authService.getToken() == null || this.authService.getToken() === '') {
      alert('You must login to continue');
      // if the application works on a subpath (like domain),it have to adjust the pathname
      this.authService.redirectUrl = location.pathname;
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  protected checkPermissions(route?: ActivatedRouteSnapshot) {
    let roleMatch = true;
    if (route) {
      const expectedRole = route.data.expectedRole;
      if (expectedRole) {
        roleMatch = this.currentAuthStatus.role === expectedRole;
      }
    }
    if (!roleMatch) {
      alert('You do not have permissions to view this resource');
      // this.authService.goBack();
      return false;
    }
    return true;
  }

}
