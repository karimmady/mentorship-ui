import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderButtonsService } from '../Services/header-buttons.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  signedIn: boolean;
  unauthorized: boolean;

  constructor(private router: Router,
    private localStorageService: LocalStorageService,
    private headerButtonsService: HeaderButtonsService) { }

  ngOnInit() {
    this.headerButtonsService.isSignedIn.subscribe(updateSignIn => {

      this.signedIn = updateSignIn;
    });
    this.headerButtonsService.unauthorized.subscribe(temp => {
      this.unauthorized = temp;
    });
    if (this.localStorageService.get('token')) {
      this.headerButtonsService.setIsSignedIn();
    } else {
      this.headerButtonsService.signOut();
    }



    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes('unauthorized')) {
          this.unauthorized = true

        }
      }
    })
  }

  logout() {
    this.localStorageService.remove('token');
    this.headerButtonsService.signOut();
    this.router.navigate(['./admin/login']);
  }
  login() {
    this.router.navigate(['./admin/login']);

  }
}
