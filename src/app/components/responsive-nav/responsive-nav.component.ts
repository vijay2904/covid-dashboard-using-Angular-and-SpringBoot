import { Component, OnInit } from '@angular/core';
import { BasicAuthSeviceService } from '../../service/http/basic-auth-sevice.service';

@Component({
  selector: 'app-responsive-nav',
  templateUrl: './responsive-nav.component.html',
  styleUrls: ['./responsive-nav.component.css']
})
export class ResponsiveNavComponent implements OnInit {

  isUserLoggedIn:boolean = false
    isAdmin:boolean = false
    state:boolean = false
  constructor(public basicAuthService:BasicAuthSeviceService) {  
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



  toggle = () => {
    this.state = !this.state
  }

  untoggle = () => {
    this.state = !this.state
  }


  logout() {
    this.basicAuthService.logout();
    this.isUserLoggedIn = false;
    this.untoggle();
  }

}
