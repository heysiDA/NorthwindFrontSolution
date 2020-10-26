import { Injectable } from '@angular/core';
import { IServerAuthResponse } from './authInterfaces/i-server-auth-response';
import { IAuthStatus } from './authInterfaces/i-auth-status';
import { Role } from './role.enum';
import { Observable, BehaviorSubject, throwError as observableThrowError} from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as decode from 'jwt-decode';
import { transformError } from '../commonHandler/common';
import { CacheService } from './cache.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService{

  readonly authProvider: (email: string, password: string) => Observable<IServerAuthResponse>;
  authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || defaultAuthStatus);
  redirectUrl: string;

  constructor( private httpClient: HttpClient, private location: Location ) {
    super();
    this.authStatus.subscribe(authStatus => {
      this.setItem('authStatus', authStatus);
    });
    this.authProvider = this.userAuthProvider;
  }

  private userAuthProvider(emailU: string, passwordU: string): Observable<IServerAuthResponse>
  {
    return this.httpClient.post<IServerAuthResponse>(`${environment.urlSevice}/token`
    , {email: emailU, password: passwordU});
  }

  login(email: string, password: string): Observable<IAuthStatus>
  {
    this.logout();
    const loginResponse = this.authProvider( email, password).pipe(
      map(value => {
        this.setToken(value.access_Token);
        const result = decode(value.access_Token);
        return result as IAuthStatus;
      }),
      catchError(transformError)
    );

    loginResponse.subscribe(
      res => {
        this.authStatus.next(res);
      },
      err => {
        this.logout();
        return observableThrowError(err);
      });
    return loginResponse;
  }

  logout(){
    this.clearToken();
    this.authStatus.next(defaultAuthStatus);
  }

  setToken(jwt: string){
    this.setItem('jwt', jwt);
  }

  getToken(){
    return this.getItem('jwt') || '';
  }

  clearToken(){
    this.removeItem('jwt');
  }

  getAuthStatus(): IAuthStatus{
    return this.getItem('authStatus');
  }

  goBack() {
    this.location.back();
  }
  goForward() {
    this.location.forward();
  }

}

const defaultAuthStatus: IAuthStatus = {role: Role.None, primarysid: null , unique_name: null };
