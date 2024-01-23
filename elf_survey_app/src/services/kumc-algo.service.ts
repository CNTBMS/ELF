import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class KUMCAlgoService {
  constructor(private http: HttpClient) { }

  KUMCAlgoUrl = 'http://192.168.2.8:8080/kumc-algo';


  kumc_algo_post(
    sex:any, chestpain:any, postcpr:any, abdominalpain:any, dizz:any, fever:any, printerval:any, qrsduration:any, sttchange:any, st:any, leftventricular:any, ecg:any, troponin:any, ck:any, pulserate:any, bodytemper:any, creatinine:any, cpk:any, totalbil:any, alp:any, hemoglobin:any,glucose:any
  ): Observable<any> {

     // {"Sex", "Chest Pain", "Post-CPR state", "Abdominal pain", "Dizziness", "Fever", "PR interval", "QRS Duration", "Q wave/major ST- T change", "ST elevation", "Left ventricular hypertrophy", "Other ECG finding", "Troponin".1, "CK-MB", "Pulse rate", "Body temperature", "Creatinine", "CPK", "Total bilirubin", "ALP", "Hemoglobin", "Glucose"}
    const test_json = {
      "Sex":sex ,
      "Chest Pain": chestpain,
      "Post-CPR state": postcpr,
      "Abdominal pain": abdominalpain,
      "Dizziness": dizz,
      "Fever": fever,
      "PR interval": printerval,
      "QRS Duration": qrsduration,
      "Q wave/major ST- T change":sttchange,
      "ST elevation":st,
      "Left ventricular hypertrophy":leftventricular,
      "Other ECG finding":ecg,
      "Troponin":troponin,
      "CK-MB":ck,
      "Pulse rate":pulserate,
      "Body temperature":bodytemper,
      "Creatinine":creatinine,
      "CPK":cpk,
      "Total bilirubin":totalbil,
      "ALP":alp,
      "Hemoglobin":hemoglobin,
      "Glucose" : glucose,

    };
    // const headers = { 'content-type': 'application/json'}
    const body=test_json//JSON.stringify(test_json);
    console.log(body)
    return this.http.post(this.KUMCAlgoUrl,body)
  }

}
