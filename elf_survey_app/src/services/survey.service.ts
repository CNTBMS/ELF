import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class SurveyService {
  constructor(private http: HttpClient) { }

  SurveySubmitUrl = 'http://192.168.2.8:8080/survey';

  // {Q1,Q2,Q3,Q4,Q5,Q6}
  survey_submit_post(Q1:any, Q2:any, Q3:any, Q4:any, Q5:any, Q6:any): Observable<any> {
    const test_json = {
"Q1": Q1,
"Q2": Q2,
"Q3": Q3,
"Q4": Q4,
"Q5": Q5,
"Q6": Q6,

    };
    // const headers = { 'content-type': 'application/json'}
    const body=test_json//JSON.stringify(test_json);
    console.log(body)
    return this.http.post(this.SurveySubmitUrl,body)
  }

}
