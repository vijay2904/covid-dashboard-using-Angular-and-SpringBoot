import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class WelcomeDataService {

  
  constructor(
    private http:HttpClient
  ) { }

  

  createBasicAuthenticationHttpHeader(){
    let username = 'user'
    let password = 'password'
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    return basicAuthHeaderString
  }

  getcases() {
    return this.http.get("http://localhost:8080/IndiaCasesAPI");
  }

}
