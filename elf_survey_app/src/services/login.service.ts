import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  LogintUrl = 'http://192.168.2.8:8080/login';


  login_post(ID:any, PW:any): Observable<any> {
    const test_json = {"ID":ID, "PW":PW};
    // const headers = { 'content-type': 'application/json'}
    const body=test_json//JSON.stringify(test_json);
    console.log(body)
    return this.http.post(this.LogintUrl,body)
  }

}
