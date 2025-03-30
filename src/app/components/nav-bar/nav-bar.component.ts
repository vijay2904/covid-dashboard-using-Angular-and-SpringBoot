import { Component, OnInit } from '@angular/core';
import { BasicAuthSeviceService } from '../../service/http/basic-auth-sevice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  isUserLoggedIn:boolean = false
    isAdmin:boolean = false
  constructor(public basicAuthService:BasicAuthSeviceService,private route:Router) {  
  }
  ngOnInit(): void {
    const tooltipOptions = {
      'placement': 'left',
      'show-delay': '500',
      'tooltip-class': 'new-tooltip-class'
    };
    this.isUserLoggedIn = this.basicAuthService.isUserLoggedIn();
    this.isAdmin = this.basicAuthService.isAdmin();
  }
  logout() {
    this.basicAuthService.logout();
    this.isUserLoggedIn = false;
    this.route.navigate([''])
            .then(() => {
              window.location.reload();
        });




  }
}
