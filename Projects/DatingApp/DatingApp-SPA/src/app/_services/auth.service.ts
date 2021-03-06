import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseURL = environment.apiUrl + 'auth/';
jwtHelper = new JwtHelperService();
decodedToken: any;
currentuser: User;
photoUrl = new BehaviorSubject<string>('../../assets/user.png');
currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient) { }

// tslint:disable-next-line: typedef
changeMemberPhoto(photoUrl: string){
  this.photoUrl.next(photoUrl);
}

login(model: any){
  return this.http.post(this.baseURL + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user){
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.currentuser = user.user;
        this.changeMemberPhoto(this.currentuser.photoUrl);
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
