import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material';
import { NavigationService } from '../navigation.service';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  email: string;
  password: string;

  constructor(public authService: AuthService, public router : Router, public ns: NavigationService) { }

  ngOnInit() {
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.ns.emitChange('closeDrawer');
    this.authService.logout().then(value =>{
      this.router.navigate(['/login']);
    });
  }

}
