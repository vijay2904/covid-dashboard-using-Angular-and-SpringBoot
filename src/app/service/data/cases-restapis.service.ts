import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CasesAPIFormat } from '../../components/payloadsFolder/CasesApiformat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasesRESTAPIsService {

  private url = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) { }

  addCases(casesAPIFormat: CasesAPIFormat) : Observable<any> {
    return this.httpClient.post(this.url + 'addCases', casesAPIFormat);
  } 

  getIndianStates():Observable<any> {
    return this.httpClient.get(this.url+'getIndianStates');
  }
}
