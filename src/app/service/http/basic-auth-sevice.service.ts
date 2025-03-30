import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload } from 'src/app/components/payloadsFolder/loginPayLoad';
import { RegisterPayLoad } from 'src/app/components/payloadsFolder/registerPayLoad';
import { FileDownloadFormat } from 'src/app/components/payloadsFolder/fileDownloadFormat';
import { LocalStorageService } from 'ngx-webstorage';
import {map} from 'rxjs/operators';
import { JwtAuthResponse } from 'src/app/components/payloadsFolder/jwt-auth-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthSeviceService {
 
  private urllogin = 'http://localhost:8080/';
  body:Object
  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService,private route:Router) {

  }


  sendEmail(sendEmailFormat:sendEmailFormat):Observable<any>{
    return this.httpClient.post(this.urllogin + "generateCSV", sendEmailFormat);
  }
  

   getAllCases() {
     return this.httpClient.get(this.urllogin + 'getAllDatabaseDetails');
   }

    register(registerPayload: RegisterPayLoad) : Observable<any> {
      return this.httpClient.post(this.urllogin + 'signup', registerPayload);
   } 


   login(loginPayload: LoginPayload): Observable<any>{
       return this.httpClient.post<JwtAuthResponse>(this.urllogin + 'authenticate', loginPayload)
       .pipe(map(data => {
         if(data.jwt != null) {

              this.localStorageService.store('authenticationToken', data.jwt.substring(1,data.jwt.length - 1));
              this.localStorageService.store('role',data.role);
              return data;
         }
         return false;
              
       })) ;
   }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
   downloadPDF(stateSelected):Observable<any> {
     return this.httpClient.get<any>(this.urllogin + `getStatePDFdetails/${stateSelected}`);
   }

  isUserLoggedIn()
  {
   let user= this.localStorageService.retrieve('authenticationToken')
   return !(user===null)
  }
  isAdmin() {
    let userRole = this.localStorageService.retrieve('role')
    return (userRole === "Admin");
  }
  logout()
  {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('role');
    this.route.navigate([''])
  }

  getActiveCasesByPlace(place):any {
    return this.httpClient.get(this.urllogin + `getCasesByPlace/${place}`);
    
  }

  getDatabasePlaces() {
    return this.httpClient.get(this.urllogin + 'getDatabasePlaces');
  }

  getHighlyEffected() {
    return this.httpClient.get(this.urllogin + "getHighlyEffected");
  }

  getHighlyEfffectedByState(state) {
    return this.httpClient.get(this.urllogin + `getHighlyEffectedByState/${state}`);
  }

  getTotalandRecovered(state):Observable<any> {
    return this.httpClient.get(this.urllogin + `getTotalandRecoveredCasesByState/${state}`);
  }

  getAllDatabaseStates():Observable<any> {
    return this.httpClient.get(this.urllogin + "getStatesInDatabase");
  }

  getDistricts(state):Observable<any> {
    return this.httpClient.get(this.urllogin + `getDistricts/${state}`);
  }


  scheduleMail(scheduleEmailFormat: scheduleEmailFormat):Observable<any>{
    return this.httpClient.post(this.urllogin + "scheduleAllMails", scheduleEmailFormat);
  }
  deleteUser(data:Body):Observable<any> {
    
    return this.httpClient.post(this.urllogin + "deleteUser",data)
  }

  verifyOTP(otpreq: OTPreq):Observable<any> {
    return this.httpClient.post(this.urllogin + "verify", otpreq);
  }

  updatePass(forgot:forgotPassReq):Observable<any> {
    return this.httpClient.put(this.urllogin + 'forgot-password', forgot)
  }


  getAllEpassRequests():Observable<any> {
    return this.httpClient.get(this.urllogin + "getAllEpassRequests")
  }

  acceptEpassRequest(refID):Observable<any> {
    return this.httpClient.put(this.urllogin + "AcceptEpass",refID)
  }

  rejectEpassRequest(refID):Observable<any> {
    return this.httpClient.put(this.urllogin + "RejectEpass",refID)
  }

  applyPass(details:passDetails):Observable<any> {
    return this.httpClient.post(this.urllogin + "savePassDetails",details)
  }

  checkStatus(refId:string):Observable<any> {
    return this.httpClient.get(this.urllogin + "getPassDetails/"+refId)
  }
  
}


export class sendEmailFormat {
  toEmail:string
}

export class scheduleEmailFormat {
  email:string
  date:string
}
 
export class OTPreq {
  email:string
  number:string
}

export class Body {
  email:string
}

export class forgotPassReq {
  email:string
  password:string
}

export class passDetails {
  name:string
  email:string
  phone:string
  adhaar:string
  date:string
  reason:string
  destination:string
}