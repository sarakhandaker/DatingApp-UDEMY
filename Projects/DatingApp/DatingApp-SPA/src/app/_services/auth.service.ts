import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseURL = 'http://localhost:5000/api/auth/';
jwtHelper = new JwtHelperService();
constructor(private http: HttpClient) { }

login(model: any){
  return this.http.post(this.baseURL + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user){
        localStorage.setItem('token', user.token);
      }
    })
  );
}

// tslint:disable-next-line: typedef
register(model: any){
  return this.http.post(this.baseURL + 'register', model);
}

// tslint:disable-next-line: typedef
loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
