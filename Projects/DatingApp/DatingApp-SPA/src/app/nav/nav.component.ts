import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe( url => this.photoUrl = url);
  }

  // tslint:disable-next-line: typedef
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in succesfully');
    }, error => { this.alertify.error(error); },
    () => {
      this.router.navigate(['/members']);
    }
    );
  }

  // tslint:disable-next-line: typedef
  loggedIn(){
    return this.authService.loggedIn();
  }

  // tslint:disable-next-line: typedef
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentuser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
