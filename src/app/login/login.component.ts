import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { NavigationService } from '../navigation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide$: boolean = true;
  email$: string;
  password$: string;

  constructor(private ds: DataService, public authService: AuthService, private ar: ActivatedRoute, private router: Router, private ns: NavigationService) { }

  ngOnInit() { }

  signup() {
    this.authService.signup(this.email$.trim(), this.password$)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });

    this.email$ = this.password$ = '';
  }

  login() {
    this.authService.login(this.email$.trim(), this.password$)
      .then(user => {
        // console.log('Nice, it worked!');

        this.ds.loadUserData(user);

        if (this.ar.snapshot.queryParams.returnUrl) {
          var returnUrl = decodeURIComponent(this.ar.snapshot.queryParams.returnUrl).split('?')[0];

          var queryParamsString = decodeURIComponent(this.ar.snapshot.queryParams.returnUrl).split('?')[1];
          var queryParamsObject = queryParamsString ? this.ns.toQueryParamsObject(queryParamsString) : {};

          this.router.navigate([returnUrl], {queryParams: queryParamsObject});

        } else {
          this.router.navigate(['/']);
        }

      })
      .catch(err => {
        // console.log('Something went wrong:', err.message);
      });

    this.email$ = this.password$ = '';

  }

  onEnter(event: any): void {
    this.login();
    event.preventDefault();
  }


}
