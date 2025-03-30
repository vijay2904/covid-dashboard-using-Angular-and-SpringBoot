import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BasicAuthSeviceService } from './basic-auth-sevice.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGaurdServiceService implements CanActivate {


  constructor(private router: Router,private basicAuthService:BasicAuthSeviceService) { }
  

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      if(this.basicAuthService.isUserLoggedIn()){
        return true;
      }
      
      this.router.navigate(['/registerorlogin'])
      
      return false;
  }


}
