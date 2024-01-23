import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class SMCAlgoService {
  constructor(private http: HttpClient) { }

  SMCAlgoUrl = 'http://192.168.2.8:8080/smc-algo';
  SMCAlgo3hUrl = 'http://192.168.2.8:8080/smc-algo-3h';








  smc_algo_3h_post(
    age:any, sex:any, arrivtype:any, cc_text:any, KTAS:any, ini_mental:any, ini_SBP:any, ini_DBP:any, ini_PR:any, ini_RR:any, ini_spo2:any, ini_BT:any,cardiohx:any, cancerhx:any, neurologyhx:any, lunghx:any, a_AST:any, a_bil:any,a_CRP:any,a_Cr:any,a_Hb:any,a_lactic:any,a_BNP:any,a_PLT:any,a_Procal:any,a_TnT:any,a_WBC:any,a_Na:any,a_K:any,b_AST:any,b_bil:any, b_CRP:any,b_Cr:any,b_Hb:any,b_lactic:any,b_BNP:any,b_PLT:any,b_WBC:any,b_Na:any,b_K:any,

  ): Observable<any> {

  // {"age":40, "sex":1, "arrivtype":1, "cc_text":16, "KTAS":1, "ini_mental", "ini_SBP", "ini_DBP", "ini_PR", "ini_RR", "ini_spo2", "ini_BT", "a_AST", "a_bil", "a_CRP", "a_Procal","a_Cr", "a_Hb", "a_lactic", "a_TnT", "a_BNP", "a_PLT", "a_WBC", "a_na", "a_k", "b_Hb", "cardiohx", "cancerhx", "neurologyhx", "lunghx"}

    const test_json = {
      "age": age,
      "sex": sex,
      "arrivtype":arrivtype,
      "cc_text":cc_text,
      "KTAS": KTAS,
      "ini_mental": ini_mental,
      "ini_SBP":ini_SBP,
      "ini_DBP":ini_DBP,
      "ini_PR":ini_PR,
      "ini_RR":ini_RR,
      "ini_spo2": ini_spo2,
      "ini_BT": ini_BT,
      "a_AST": a_AST,
      "a_bil": a_bil,
      "a_CRP": a_CRP,
      "a_Procal": a_Procal,
      "a_Cr": a_Cr,
      "a_Hb": a_Hb,
      "a_lactic": a_lactic,
      "a_TnT" : a_TnT,
      "a_BNP": a_BNP,
      "a_PLT": a_PLT,
      "a_WBC": a_WBC,
      "a_na" : a_Na,
      "a_k": a_K,

      "cardiohx":cardiohx,
      "cancerhx":cancerhx,
      "neurologyhx":neurologyhx,
      "lunghx":lunghx,

      "b_AST":b_AST,
      "b_bil":b_bil,
      "b_CRP": b_CRP,
      "b_Cr":b_Cr,
      "b_Hb":b_Hb,
      "b_lactic":b_lactic,
      "b_BNP":b_BNP,
      "b_PLT":b_PLT,
      "b_WBC":b_WBC,
      "b_na":b_Na,
      "b_k":b_K,


    };
    // const headers = { 'content-type': 'application/json'}
    const body=test_json//JSON.stringify(test_json);
    console.log(body)
    return this.http.post(this.SMCAlgo3hUrl,body)
  }




// {"age", "sex", "arrivtype", "cc_text", "KTAS", "ini_mental", "ini_SBP", "ini_DBP", "ini_PR", "ini_RR", "ini_spo2", "ini_BT", "b_AST", "b_bil", "b_CRP", "b_Cr", "b_Hb", "b_lactic", "b_BNP", "b_PLT", "b_WBC", "b_na", "b_k", "cardiohx", "cancerhx", "neurologyhx", "lunghx"
  smc_algo_post(
    age:any, sex:any, arrivtype:any, cc_text:any, KTAS:any, ini_mental:any, ini_SBP:any, ini_DBP:any, ini_PR:any, ini_RR:any, ini_spo2:any, ini_BT:any, b_AST:any,b_bil:any, b_CRP:any,b_Cr:any,b_Hb:any,b_lactic:any,b_BNP:any,b_PLT:any,b_WBC:any,b_Na:any,b_K:any, cardiohx:any, cancerhx:any, neurologyhx:any, lunghx:any
         ): Observable<any> {
    const test_json = {
      "age": age,
      "sex": sex,
      "arrivtype":arrivtype,
      "cc_text":cc_text,
      "KTAS": KTAS,
      "ini_mental": ini_mental,
      "ini_SBP":ini_SBP,
      "ini_DBP":ini_DBP,
      "ini_PR":ini_PR,
      "ini_RR":ini_RR,
      "ini_spo2": ini_spo2,
      "ini_BT": ini_BT,
      "b_AST":b_AST,
      "b_bil":b_bil,
      "b_CRP": b_CRP,
      "b_Cr":b_Cr,
      "b_Hb":b_Hb,
      "b_lactic":b_lactic,
      "b_BNP":b_BNP,
      "b_PLT":b_PLT,
      "b_WBC":b_WBC,
      "b_na":b_Na,
      "b_k":b_K,
      "cardiohx":cardiohx,
      "cancerhx":cancerhx,
      "neurologyhx":neurologyhx,
      "lunghx":lunghx,


    };
    // const headers = { 'content-type': 'application/json'}
    const body=test_json//JSON.stringify(test_json);
    console.log(body)
    return this.http.post(this.SMCAlgoUrl,body)
  }

}
