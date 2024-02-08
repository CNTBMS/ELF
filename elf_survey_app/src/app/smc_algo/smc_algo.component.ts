
import { Component, Input, Output,EventEmitter,Inject } from '@angular/core';

import {FloatLabelType} from '@angular/material/form-field'
import { FormGroup,FormControl, Validators, FormsModule, ReactiveFormsModule,FormBuilder} from '@angular/forms';
import { OnInit } from '@angular/core';
import {Location} from '@angular/common';


import {Dialog, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';

import {NgIf} from '@angular/common';



import {MatDialog, MatDialogModule} from '@angular/material/dialog';


import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { SMCAlgoService } from 'src/services/smc-algo.service';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';



export interface DialogData {
  predict1: string;
  predict2: string;
  predict3: string;
  predict4: string;
  predict5: string;
  predict6: string;
  selected: string;
  sample_case: any;
  IsThisMonitoirng: string;

}

/**
 * @title Injecting data when opening a dialog
 */

@Component({
  selector: 'app-smc-algo',
  templateUrl: './smc_algo.component.html',
  styleUrls: ['./smc_algo.component.css'],
  providers: [SMCAlgoService],

})
export class SMCAlgoComponent implements OnInit{

//케이스 선택
sample_case = new FormControl('', [Validators.required]);
  // 내원 당시 정보
  age = new FormControl('', []);
  sex = new FormControl('', [Validators.required]);
  cc_text = new FormControl('', [Validators.required]);
  arrivtype = new FormControl('', [Validators.required]);
  KTAS = new FormControl('', [Validators.required]);


  // 최근 1년 이내 진단이력 - KCD 9 code 기준
  cardiohx = new FormControl('', [Validators.required]);
  cancerhx = new FormControl('', [Validators.required]);
  neurologyhx = new FormControl('', [Validators.required]);
  lunghx = new FormControl('', [Validators.required]);


  //활력 징후
  ini_SBP = new FormControl('', [Validators.required]);
  ini_DBP = new FormControl('', [Validators.required]);
  ini_PR = new FormControl('', [Validators.required]);
  ini_RR = new FormControl('', [Validators.required]);
  ini_spo2 = new FormControl('', [Validators.required]);
  ini_BT = new FormControl('', [Validators.required]);
  ini_mental =new FormControl('', [Validators.required]);

  //3시간 후 피검사 값 - 선택 1
  a_AST =new FormControl('', [Validators.required]);
  a_bil =new FormControl('', [Validators.required]);
  a_CRP =new FormControl('', [Validators.required]);
  a_Cr =new FormControl('', [Validators.required]);
  a_Hb =new FormControl('', [Validators.required]);
  a_lactic =new FormControl('', [Validators.required]);
  a_BNP =new FormControl('', [Validators.required]);
  a_PLT =new FormControl('', [Validators.required]);
  a_Procal =new FormControl('', [Validators.required]);
  a_TnT =new FormControl('', [Validators.required]);
  a_WBC =new FormControl('', [Validators.required]);
  a_Na =new FormControl('', [Validators.required]);
  a_K =new FormControl('', [Validators.required]);
  b_Hb_3h = new FormControl('', [Validators.required]);


  //최근 1년 이내 진단 이력 - 선택 2
  b_AST =new FormControl('', [Validators.required]);
  b_bil =new FormControl('', [Validators.required]);
  b_CRP =new FormControl('', [Validators.required]);
  b_Cr =new FormControl('', [Validators.required]);
  b_Hb =new FormControl('', [Validators.required]);
  b_WBC =new FormControl('', [Validators.required]);
  b_PLT =new FormControl('', [Validators.required]);
  b_lactic =new FormControl('', [Validators.required]);
  b_BNP =new FormControl('', [Validators.required]);
  b_Na =new FormControl('', [Validators.required]);
  b_K =new FormControl('', [Validators.required]);

  validation = this._formBuilder.group({
    age: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3),]]
  });
  get f()
  {
      return this.validation.controls;
  }

  Logged_In = false;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  hide = true;
  value: number = 1;
  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    public dialog: Dialog,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private SMCAlgoService:SMCAlgoService,
    ) {}

    // Trigger_3H_Of_Case_1(){
    //   this.a_AST_case = '80';
    //     this.a_bil_case = '2.7';
    //     this.a_CRP_case = '15';
    //     this.a_Cr_case = '1.1';
    //     this.a_Hb_case = '9.5';
    //     this.a_lactic_case = '6';
    //     this.a_BNP_case = '300';
    //     this.a_PLT_case = '40';
    //     this.a_WBC_case = '0.5';
    //     this.a_Na_case = '137';
    //     this.a_K_case = '4.1';
    //     this.a_Procal_case = '0.19';
    //     this.a_TnT_case = '0.011';
    // }
    Case_Select_Handler(event:any){
      const Additional_Section = (<HTMLInputElement>document.querySelector('.Section_Box.Initial_Lab'));

      if(event === "1") {
        console.log('CASE 1 실행')

        if(Additional_Section.classList.contains('Opened')) {
          Additional_Section.classList.remove('Opened');
        }

        // 내원 당시 정보
        this.age_case = '68';
        this.sex_selected = "0";
        this.cctext_selected = "2";
        this.arrivetype_selected = "1";
        this.KTAS_selected = "2";

        //응급실 내원일 기준 1년 이내 진단 이력
        this.cardiohx_selected = "0";
        this.neurologyhx_selected = "1";
        this.cancerhx_selected = "1";
        this.lunghx_selected = "0";

        //활력 징후
        this.iniSBP_case = '70';
        this.iniDBP_case = '40';
        this.iniPR_case = '150';
        this.iniRR_case = '32';
        this.inispo2_case = '94';
        this.iniBT_case = '39.5';
        this.inimental_selected = "1";

        //최근 1년 이내 진단이력
        this.b_AST_case = '60';
        this.b_bil_case = '2.2';
        this.b_CRP_case = '5';
        this.b_Cr_case = '0.7';
        this.b_Hb_case = '10';
        this.b_lactic_case = '1.5';
        this.b_BNP_case = '200';
        this.b_PLT_case = '40';
        this.b_WBC_case = '1.2';
        this.b_Na_case = '137';
        this.b_K_case = '4.1';

        //3시간 후 피검사 값
        this.a_AST.reset();
      this.a_bil.reset();
      this.a_CRP.reset();
      this.a_Cr.reset();
      this.a_Hb.reset();
      this.a_lactic.reset();
      this.a_BNP.reset();
      this.a_PLT.reset();
      this.a_Procal.reset();
      this.a_TnT.reset();
      this.a_WBC.reset();
      this.a_Na.reset();
      this.a_K.reset();
      this.b_Hb_3h.reset();

        // Additional_Section?.classList.add('Opened');
        this.case_selected = this.sample_case.value
      }
      if(event === "2"){
        console.log('CASE 2 실행')


        if(Additional_Section.classList.contains('Opened')) {
          Additional_Section.classList.remove('Opened');
        }

          // 내원 당시 정보
          this.age_case = '65';
          this.sex_selected = "1";
          this.cctext_selected = "3";
          this.arrivetype_selected = "3";
          this.KTAS_selected = "3";

          //응급실 내원일 기준 1년 이내 진단 이력
          this.cardiohx_selected = "0";
          this.neurologyhx_selected = "0";
          this.cancerhx_selected = "1";
          this.lunghx_selected = "1";

          //활력 징후
          this.iniSBP_case = '95';
          this.iniDBP_case = '60';
          this.iniPR_case = '110';
          this.iniRR_case = '28';
          this.inispo2_case = '90';
          this.iniBT_case = '37.3';
          this.inimental_selected = "1";

          //최근 1년 이내 진단이력
          this.b_AST_case = '20';
          this.b_bil_case = '0.5';
          this.b_CRP_case = '1.1';
          this.b_Cr_case = '0.6';
          this.b_Hb_case = '12';
          this.b_lactic_case = '1';
          this.b_BNP_case = '150';
          this.b_PLT_case = '200';
          this.b_WBC_case = '7';
          this.b_Na_case = '145';
          this.b_K_case = '3.6';

          //3시간 후 피검사 값
          this.a_AST.reset();
          this.a_bil.reset();
          this.a_CRP.reset();
          this.a_Cr.reset();
          this.a_Hb.reset();
          this.a_lactic.reset();
          this.a_BNP.reset();
          this.a_PLT.reset();
          this.a_Procal.reset();
          this.a_TnT.reset();
          this.a_WBC.reset();
          this.a_Na.reset();
          this.a_K.reset();
          this.b_Hb_3h.reset();

          // Additional_Section?.classList.add('Opened');

          this.case_selected = this.sample_case.value
      }
      if(event === "3") {
        console.log('CASE 3 실행');


        if(Additional_Section.classList.contains('Opened')) {
          Additional_Section.classList.remove('Opened');
        }



        // 내원 당시 정보
        this.age_case = '78';
        this.sex_selected = "1";
        this.cctext_selected = "3";
        this.arrivetype_selected = "1";
        this.KTAS_selected = "3";

        //응급실 내원일 기준 1년 이내 진단 이력
        this.cardiohx_selected = "1";
        this.neurologyhx_selected = "1";
        this.cancerhx_selected = "1";
        this.lunghx_selected = "0";

        //활력 징후
        this.iniSBP_case = '121';
        this.iniDBP_case = '65';
        this.iniPR_case = '119';
        this.iniRR_case = '34';
        this.inispo2_case = '76';
        this.iniBT_case = '37.4';
        this.inimental_selected = "1";

        //최근 1년 이내 진단이력
        this.b_AST_case = '0.3';
        this.b_bil_case = '0.3';
        this.b_CRP_case = '2.15';
        this.b_Cr_case = '0.74';
        this.b_Hb_case = '11.3';
        this.b_lactic_case = '0';
        this.b_BNP_case = '421';
        this.b_PLT_case = '209';
        this.b_WBC_case = '10.98';
        this.b_Na_case = '139';
        this.b_K_case = '3.7';

        //3시간 후 피검사 값
        this.a_AST.reset();
        this.a_bil.reset();
        this.a_CRP.reset();
        this.a_Cr.reset();
        this.a_Hb.reset();
        this.a_lactic.reset();
        this.a_BNP.reset();
        this.a_PLT.reset();
        this.a_Procal.reset();
        this.a_TnT.reset();
        this.a_WBC.reset();
        this.a_Na.reset();
        this.a_K.reset();
        this.b_Hb_3h.reset();


        // Additional_Section?.classList.add('Opened');
        this.case_selected = this.sample_case.value
      }
      if(event === "4") {
        console.log('CASE 4 실행');


        if(Additional_Section.classList.contains('Opened')) {
          Additional_Section.classList.remove('Opened');
        }


         // 내원 당시 정보
         this.age_case = 70;
         this.sex_selected = "1";
         this.cctext_selected = "14";
         this.arrivetype_selected = "1";
         this.KTAS_selected = "2";

         //응급실 내원일 기준 1년 이내 진단 이력
         this.cardiohx_selected = "1";
         this.neurologyhx_selected = "0";
         this.cancerhx_selected = "1";
         this.lunghx_selected = "0";

         //활력 징후
         this.iniSBP_case = '80';
         this.iniDBP_case = '40';
         this.iniPR_case = '135';
         this.iniRR_case = '28';
         this.inispo2_case = '96';
         this.iniBT_case = '36.3';
         this.inimental_selected = "1";

         //최근 1년 이내 진단이력
         this.b_AST_case = '80';
         this.b_bil_case = '3';
         this.b_CRP_case = '2';
         this.b_Cr_case = '1';
         this.b_Hb_case = '10';
         this.b_lactic_case = '2';
         this.b_BNP_case = '500';
         this.b_PLT_case = '50';
         this.b_WBC_case = '3';
         this.b_Na_case = '133';
         this.b_K_case = '5';

         //3시간 후 피검사 값
         this.a_AST.reset();
         this.a_bil.reset();
         this.a_CRP.reset();
         this.a_Cr.reset();
         this.a_Hb.reset();
         this.a_lactic.reset();
         this.a_BNP.reset();
         this.a_PLT.reset();
         this.a_Procal.reset();
         this.a_TnT.reset();
         this.a_WBC.reset();
         this.a_Na.reset();
         this.a_K.reset();
         this.b_Hb_3h.reset();


        //  Additional_Section?.classList.add('Opened');

        this.case_selected = this.sample_case.value
      }
      if(event === "5") {
        console.log('CASE 5 실행');


        if(Additional_Section.classList.contains('Opened')) {
          Additional_Section.classList.remove('Opened');
        }

        console.log('테스트',this.Selected_Algo)
         // 내원 당시 정보
         this.age_case = '78';
         this.sex_selected = "1";
         this.cctext_selected = "16";
         this.arrivetype_selected = "3";
         this.KTAS_selected = "3";

         //응급실 내원일 기준 1년 이내 진단 이력
         this.cardiohx_selected = "0";
         this.neurologyhx_selected = "0";
         this.cancerhx_selected = "1";
         this.lunghx_selected = "0";

         //활력 징후
         this.iniSBP_case = '110';
         this.iniDBP_case = '93';
         this.iniPR_case = '111';
         this.iniRR_case = '18';
         this.inispo2_case = '82';
         this.iniBT_case = '37.8';
         this.inimental_selected = "2";

         //최근 1년 이내 진단이력
         this.b_AST_case = '30';
         this.b_bil_case = '0.6';
         this.b_CRP_case = '0.17';
         this.b_Cr_case = '1.13';
         this.b_Hb_case = '10.6';
         this.b_lactic_case = '1.15';
         this.b_BNP_case = '421';
         this.b_PLT_case = '187';
         this.b_WBC_case = '5.71';
         this.b_Na_case = '140';
         this.b_K_case = '4.4';

         //3시간 후 피검사 값
         this.a_AST.reset();
         this.a_bil.reset();
         this.a_CRP.reset();
         this.a_Cr.reset();
         this.a_Hb.reset();
         this.a_lactic.reset();
         this.a_BNP.reset();
         this.a_PLT.reset();
         this.a_Procal.reset();
         this.a_TnT.reset();
         this.a_WBC.reset();
         this.a_Na.reset();
         this.a_K.reset();
         this.b_Hb_3h.reset();
        //  Additional_Section?.classList.add('Opened');

        this.case_selected = this.sample_case.value
      }


    }
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 7000
      });
    }

    age_case:any;
    iniSBP_case:any;
    iniDBP_case:any;
    iniPR_case:any;
    iniRR_case:any;
    inispo2_case:any;
    iniBT_case:any;

    b_AST_case:any;
    b_bil_case:any;
    b_CRP_case:any;
    b_Cr_case:any;
    b_Hb_case:any;
    b_lactic_case:any;
    b_BNP_case:any;
    b_PLT_case:any;
    b_WBC_case:any;
    b_Na_case:any;
    b_K_case:any;

    a_AST_case:any;
    a_bil_case:any;
    a_CRP_case:any;
    a_Cr_case:any;
    a_Hb_case:any;
    a_lactic_case:any;
    a_BNP_case:any;
    a_PLT_case:any;
    a_Procal_case:any;
    a_TnT_case:any;
    a_WBC_case:any;
    a_Na_case:any;
    a_K_case:any;


// radio 인 경우 string;
    neurologyhx_selected: string;
    cancerhx_selected:string;
    cardiohx_selected:string;
    lunghx_selected:string;
    sex_selected:string;


// select 인 경우 string;
    cctext_selected:string;
    case_selected:any;
    arrivetype_selected:string;
    KTAS_selected:string;
    inimental_selected:string;

  ngOnInit() {
    this.neurologyhx_selected = "1";
    this.cancerhx_selected = '1';
    this.cardiohx_selected = '1';
    this.lunghx_selected = '1'
    this.sex_selected = '1'


    // const Additional_Section = document.querySelector('.Section_Box.Initial_Lab')

    // if(Additional_Section?.classList.contains('Opened')){
    //   if(this.case_selected === '1'){
    //     console.log('테스트 중')
    //   }
    // }
  }
Force_Validation(){
  this.age.markAllAsTouched();
  this.sex.markAllAsTouched();
  this.cc_text.markAllAsTouched();
  this.arrivtype.markAllAsTouched();
  this.KTAS.markAllAsTouched();
  this.cardiohx.markAllAsTouched();
  this.cancerhx.markAllAsTouched();
  this.neurologyhx.markAllAsTouched();
  this.ini_SBP.markAllAsTouched();
  this.ini_DBP.markAllAsTouched();
  this.ini_PR.markAllAsTouched();
  this.ini_RR.markAllAsTouched();
  this.ini_spo2.markAllAsTouched();
  this.ini_BT.markAllAsTouched();
  this.ini_mental.markAllAsTouched();
  // this.a_AST.markAllAsTouched();
  // this.a_bil.markAllAsTouched();
  // this.a_CRP.markAllAsTouched();
  // this.a_Cr.markAllAsTouched();
  // this.a_Hb.markAllAsTouched();
  // this.a_lactic.markAllAsTouched();
  // this.a_BNP.markAllAsTouched();
  // this.a_PLT.markAllAsTouched();
  // this.a_Procal.markAllAsTouched();
  // this.a_TnT.markAllAsTouched();
  // this.a_WBC.markAllAsTouched();
  // this.a_Na.markAllAsTouched();
  // this.a_K.markAllAsTouched();
  // this.b_Hb_3h.markAllAsTouched();
  this.b_AST.markAllAsTouched();
  this.b_bil.markAllAsTouched();
  this.b_CRP.markAllAsTouched();
  this.b_Cr.markAllAsTouched();
  this.b_Hb.markAllAsTouched();
  this.b_lactic.markAllAsTouched();
  this.b_BNP.markAllAsTouched();
  this.b_PLT.markAllAsTouched();
  this.b_WBC.markAllAsTouched();
  this.b_Na.markAllAsTouched();
  this.b_K.markAllAsTouched();

}


Open_Monitoring(){
  this.dialog.open(SMCResultDialog, {panelClass: 'SMC_Result_Dialog_Container',
  backdropClass: 'blurred',
  data: {
    predict1: this.SMCAlgo_predict1,
    predict2: this.SMCAlgo_predict2,
    predict3: this.SMCAlgo_predict3,
    predict4: this.SMCAlgo_predict4,
    predict5: this.SMCAlgo_predict5,
    predict6: this.SMCAlgo_predict6,
    selected: this.Selected_Algo,
    sample_case: this.case_selected,
    IsThisMonitoirng: "YES"

  }
},

  );
}

  SMCAlgo_predict1: any;
  SMCAlgo_predict2: any;
  SMCAlgo_predict3: any;
  SMCAlgo_predict4: any;
  SMCAlgo_predict5: any;
  SMCAlgo_predict6: any;
  Selected_Algo:any;
  openDialog() {
    this.dialog.open(SMCResultDialog, {panelClass: 'SMC_Result_Dialog_Container',
    backdropClass: 'blurred',
    data: {
      predict1: this.SMCAlgo_predict1,
      predict2: this.SMCAlgo_predict2,
      predict3: this.SMCAlgo_predict3,
      predict4: this.SMCAlgo_predict4,
      predict5: this.SMCAlgo_predict5,
      predict6: this.SMCAlgo_predict6,
      selected: this.Selected_Algo,
      sample_case: this.case_selected,


    }
  },

    );
  }

Open_Additional_Section(event:any){

  console.log(event.currentTarget)
  const Additional_Section = document.querySelector('.Section_Box.Initial_Lab')

  if(event.currentTarget.closest('.Section_Box.Initial_Lab')) {
    console.log('테스트 중')


    Additional_Section?.classList.toggle('Opened')

  }

}


Request_Url:any = '';


  GetResult(event:any){
    this.Force_Validation()
    event.preventDefault();

    this.getData_update(
      this.age.value,
       this.sex.value,
        this.arrivtype.value,
        this.cc_text.value,
        this.KTAS.value,
        this.ini_mental.value,
        this.ini_SBP.value,
        this.ini_DBP.value,
        this.ini_PR.value,
        this.ini_RR.value,
        this.ini_spo2.value,
        this.ini_BT.value,
        this.b_AST.value,
        this.b_bil.value,
        this.b_CRP.value,
        this.b_Cr.value,
        this.b_Hb.value,
        this.b_lactic.value,
        this.b_BNP.value,
        this.b_PLT.value,
        this.b_WBC.value,
        this.b_Na.value,
        this.b_K.value,
        this.cardiohx.value,
        this.cancerhx.value,
        this.neurologyhx.value,
        this.lunghx.value,
        this.a_AST.value,
        this.a_bil.value,
        this.a_CRP.value,
        this.a_Cr.value,
        this.a_Hb.value,
        this.a_lactic.value,
        this.a_BNP.value,
        this.a_PLT.value,
        this.a_Procal.value,
        this.a_TnT.value,
        this.a_WBC.value,
        this.a_Na.value,
        this.a_K.value
        )

   }
   people:any;
person:any = 'test';
// {"age", "sex", "arrivtype", "cc_text", "KTAS", "ini_mental", "ini_SBP", "ini_DBP", "ini_PR", "ini_RR", "ini_spo2", "ini_BT", "b_AST", "b_bil", "b_CRP", "b_Cr", "b_Hb", "b_lactic", "b_BNP", "b_PLT", "b_WBC", "b_na", "b_k", "cardiohx", "cancerhx", "neurologyhx", "lunghx"


  // "a_AST", "a_bil", "a_CRP", "a_Procal","a_Cr", "a_Hb", "a_lactic", "a_TnT", "a_BNP", "a_PLT", "a_WBC", "a_na", "a_k",
  loadingPercent = 0;
  intervalId = {} as any;

   Start_Loading(){
    this.intervalId = setInterval(() => {
      this.loadingPercent += 1;
    })
   }
   End_Loading(){
    clearInterval(this.intervalId);
    this.loadingPercent = 0;
    this.openDialog();
   }


   getData_update(
    age:any, sex:any, arrivtype:any, cc_text:any, KTAS:any, ini_mental:any, ini_SBP:any, ini_DBP:any, ini_PR:any, ini_RR:any, ini_spo2:any, ini_BT:any, b_AST:any,b_bil:any, b_CRP:any,b_Cr:any,b_Hb:any,b_lactic:any,b_BNP:any,b_PLT:any,b_WBC:any,b_Na:any,b_K:any, cardiohx:any, cancerhx:any, neurologyhx:any, lunghx:any, a_AST:any,a_bil:any, a_CRP:any, a_Cr:any, a_Hb:any,a_lactic:any, a_BNP:any, a_PLT:any, a_Procal:any, a_TnT:any, a_WBC:any, a_Na:any, a_K:any
   ){

    const Additional_Section = (<HTMLInputElement>document.querySelector('.Section_Box.Initial_Lab'));

    var a_AST_input= (<HTMLInputElement>document.querySelector('input[name="a_AST"]'));
  var a_bil_input= (<HTMLInputElement>document.querySelector('input[name="a_bil"]'));
  var a_CRP_input= (<HTMLInputElement>document.querySelector('input[name="a_CRP"]'));
  var a_Cr_input= (<HTMLInputElement>document.querySelector('input[name="a_Cr"]'));
  var a_Hb_input= (<HTMLInputElement>document.querySelector('input[name="a_Hb"]'));
  var a_lactic_input= (<HTMLInputElement>document.querySelector('input[name="a_lactic"]'));
  var a_BNP_input= (<HTMLInputElement>document.querySelector('input[name="a_BNP"]'));
  var a_PLT_input= (<HTMLInputElement>document.querySelector('input[name="a_PLT"]'));
  var a_Procal_input= (<HTMLInputElement>document.querySelector('input[name="a_Procal"]'));
  var a_TnT_input= (<HTMLInputElement>document.querySelector('input[name="a_TnT"]'));
  var a_WBC_input= (<HTMLInputElement>document.querySelector('input[name="a_WBC"]'));
  var a_Na_input= (<HTMLInputElement>document.querySelector('input[name="a_Na"]'));
  var a_K_input= (<HTMLInputElement>document.querySelector('input[name="a_K"]'));

    if(
      this.age.invalid ||
        this.sex.invalid ||
        this.arrivtype.invalid ||
        this.cc_text.invalid ||
        this.KTAS.invalid ||
        this.ini_mental.invalid ||
        this.ini_SBP.invalid ||
        this.ini_DBP.invalid ||
        this.ini_PR.invalid ||
        this.ini_RR.invalid ||
        this.ini_spo2.invalid ||
        this.ini_BT.invalid ||
        this.b_AST.invalid ||
        this.b_bil.invalid ||
        this.b_CRP.invalid ||
        this.b_Cr.invalid ||
        this.b_Hb.invalid ||
        this.b_lactic.invalid ||
        this.b_BNP.invalid ||
        this.b_PLT.invalid ||
        this.b_WBC.invalid ||
        this.b_Na.invalid ||
        this.b_K.invalid ||
        this.cardiohx.invalid ||
        this.cancerhx.invalid ||
        this.neurologyhx.invalid ||
        this.lunghx.invalid
    ){
      this.openSnackBar('올바른 값을 입력해 주세요.', '확인')
    }
    if (
      !this.age.invalid &&
        !this.sex.invalid &&
        !this.arrivtype.invalid &&
        !this.cc_text.invalid &&
        !this.KTAS.invalid &&
        !this.ini_mental.invalid &&
        !this.ini_SBP.invalid &&
        !this.ini_DBP.invalid &&
        !this.ini_PR.invalid &&
        !this.ini_RR.invalid &&
        !this.ini_spo2.invalid &&
        !this.ini_BT.invalid &&
        !this.b_AST.invalid &&
        !this.b_bil.invalid &&
        !this.b_CRP.invalid &&
        !this.b_Cr.invalid &&
        !this.b_Hb.invalid &&
        !this.b_lactic.invalid &&
        !this.b_BNP.invalid &&
        !this.b_PLT.invalid &&
        !this.b_WBC.invalid &&
        !this.b_Na.invalid &&
        !this.b_K.invalid &&
        !this.cardiohx.invalid &&
        !this.cancerhx.invalid &&
        !this.neurologyhx.invalid &&
        !this.lunghx.invalid
    ){

       if (

        a_AST_input.value !== '' &&
        a_bil_input.value !== '' &&
        a_CRP_input.value !== '' &&
        a_Cr_input.value !== '' &&
        a_Hb_input.value !== '' &&
        a_lactic_input.value !== '' &&
        a_BNP_input.value !== '' &&
        a_PLT_input.value !== '' &&
        a_Procal_input.value !== '' &&
        a_TnT_input.value !== '' &&
        a_WBC_input.value !== '' &&
        a_Na_input.value !== '' &&
        a_K_input.value !== ''
        )
        // !this.a_AST.invalid ||
        // !this.a_bil.invalid ||
        // !this.a_CRP.invalid ||
        // !this.a_Cr.invalid ||
        // !this.a_Hb.invalid ||
        // !this.a_lactic.invalid ||
        // !this.a_BNP.invalid ||
        // !this.a_PLT.invalid ||
        // !this.a_Procal.invalid ||
        // !this.a_TnT.invalid ||
        // !this.a_WBC.invalid ||
        // !this.a_Na.invalid ||
        // !this.a_K.invalid
       {
        this.Start_Loading();


        console.log('GetResult 확인 중 fromcontrol value 확인 ', this.a_AST.value)
        console.log('this.a_AST.invalid ', this.a_AST.invalid )
        // 여기가 invalid true가 나옴
        this.Force_Validation()

      this.SMCAlgoService.smc_algo_3h_post(
        age, sex, arrivtype, cc_text, KTAS, ini_mental, ini_SBP, ini_DBP, ini_PR, ini_RR, ini_spo2, ini_BT,cardiohx, cancerhx, neurologyhx, lunghx,
        a_AST_input.value, a_bil_input.value,a_CRP_input.value,a_Cr_input.value,a_Hb_input.value,a_lactic_input.value,a_BNP_input.value,a_PLT_input.value,a_Procal_input.value,a_TnT_input.value,a_WBC_input.value,a_Na_input.value,a_K_input.value,
        b_AST,b_bil, b_CRP,b_Cr,b_Hb,b_lactic,b_BNP,b_PLT,b_WBC,b_Na,b_K,
      )
      .subscribe(data => {
        console.log('/smc-algo-3h 를 불렀습니다.', data.predict1, data.predict2, data.predict3, data.predict4, data.predict5, data.predict6)
        console.log('/smc-algo-3h 를 불렀습니다.', data)
        this.SMCAlgo_predict1 = data.predict1;
        this.SMCAlgo_predict2 = data.predict2;
        this.SMCAlgo_predict3 = data.predict3;
        this.SMCAlgo_predict4 = data.predict4;
        this.SMCAlgo_predict5 = data.predict5;
        this.SMCAlgo_predict6 = data.predict6;
        this.Selected_Algo = 'smc-algo-3h'
        this.End_Loading();
      })

       } else  {
        console.log('test')
        // 기본 진단일 때,
        this.Start_Loading();
        this.SMCAlgoService.smc_algo_post(
          age, sex, arrivtype, cc_text, KTAS, ini_mental, ini_SBP, ini_DBP, ini_PR, ini_RR, ini_spo2, ini_BT, b_AST,b_bil, b_CRP,b_Cr,b_Hb,b_lactic,b_BNP,b_PLT,b_WBC,b_Na,b_K, cardiohx, cancerhx, neurologyhx, lunghx,
          )
        .subscribe(data => {

          console.log('/smc-algo 를 불렀습니다.', data.predict1, data.predict2, data.predict3)
          this.SMCAlgo_predict1 = data.predict1;
          this.SMCAlgo_predict2 = data.predict2;
          this.SMCAlgo_predict3 = data.predict3;
          this.Selected_Algo = 'smc-algo'
          this.End_Loading();
        })
       }
    }
   }

  backClicked() {
    this._location.back();
  }

  Reset_Handler(event:any) {
    const eventTarget = event.target;
    const SectionBox = eventTarget.closest('.Section_Box');
    if(SectionBox.classList.contains('Chief_Complaint')) {
      this.age.reset();
      this.sex.reset();
      this.cc_text.reset();
      this.arrivtype.reset();
      this.KTAS.reset();
    } else if (SectionBox.classList.contains('KCD-9')){
      this.cardiohx.reset();
      this.cancerhx.reset();
      this.neurologyhx.reset();
      this.lunghx.reset();
    } else if (SectionBox.classList.contains('Vital_Sign')){
      this.ini_SBP.reset();
      this.ini_DBP.reset();
      this.ini_PR.reset();
      this.ini_RR.reset();
      this.ini_spo2.reset();
      this.ini_BT.reset();
      this.ini_mental.reset();
    } else if (SectionBox.classList.contains('Initial_Lab')){
      this.a_AST.reset();
      this.a_bil.reset();
      this.a_CRP.reset();
      this.a_Cr.reset();
      this.a_Hb.reset();
      this.a_lactic.reset();
      this.a_BNP.reset();
      this.a_PLT.reset();
      this.a_Procal.reset();
      this.a_TnT.reset();
      this.a_WBC.reset();
      this.a_Na.reset();
      this.a_K.reset();
      this.b_Hb_3h.reset();

    } else if (SectionBox.classList.contains('Recent_Lab')){
      this.b_AST.reset();
      this.b_bil.reset();
      this.b_CRP.reset();
      this.b_Cr.reset();
      this.b_Hb.reset();
      this.b_WBC.reset();
      this.b_PLT.reset();
      this.b_lactic.reset();
      this.b_BNP.reset();
      this.b_Na.reset();
      this.b_K.reset();
    }
  }

}

export interface PeriodicElement {
  model: any;
  Accuracy: any;
  Precision: any;
  Recall: any;
  AUPRC: any;
  AUROC: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {model: 'model1', Accuracy: 0.95, Precision: 0.24, Recall: 0.46, AUPRC: 0.23, AUROC: 0.89},
  {model: 'model2', Accuracy: 0.95, Precision: 0.43, Recall: 0.39, AUPRC: 0.35, AUROC: 0.88},
  {model: 'model3', Accuracy: 0.97, Precision: 0.41, Recall: 0.17, AUPRC: 0.24, AUROC: 0.86},


];

const ELEMENT_DATA_3h: PeriodicElement[] = [
  {model: 'model1', Accuracy: 0.95, Precision: 0.27, Recall: 0.64, AUPRC: 0.37, AUROC: 0.94},
  {model: 'model2', Accuracy: 0.82, Precision: 0.17, Recall: 0.81, AUPRC: 0.36, AUROC: 0.9},
  {model: 'model3', Accuracy: 0.93, Precision: 0.22, Recall: 0.62, AUPRC: 0.23, AUROC: 0.9},
];
@Component({
  selector: 'smc_result_dialog',
  templateUrl: 'smc_result_dialog.html',
  styleUrls: ['./smc_result_dialog.css'],
  standalone: true,
  imports: [MatDialogModule, NgIf, MatTableModule,MatButtonModule],
})
export class SMCResultDialog {

  constructor(
  @Inject(DIALOG_DATA) public data: DialogData,
    public dialog: Dialog
  ) {}

  displayedColumns: string[] = ['model', 'Accuracy', 'Precision', 'Recall', 'AUPRC','AUROC'];
 dataSource = ELEMENT_DATA;


 dataSource_3h = ELEMENT_DATA_3h;


Bound_Data = this.data;


a_AST_case:any;
    a_bil_case:any;
    a_CRP_case:any;
    a_Cr_case:any;
    a_Hb_case:any;
    a_lactic_case:any;
    a_BNP_case:any;
    a_PLT_case:any;
    a_Procal_case:any;
    a_TnT_case:any;
    a_WBC_case:any;
    a_Na_case:any;
    a_K_case:any;



 Dialog_Close_Handler(){
  // 여기서 case selected 값에 따라서
  // 3시간 후 피검사 값 입력

  this.dialog.closeAll();

  const Additional_Section = document.querySelector('.Section_Box.Initial_Lab')
  var a_AST_input= (<HTMLInputElement>document.querySelector('input[name="a_AST"]'));
  var a_bil_input= (<HTMLInputElement>document.querySelector('input[name="a_bil"]'));
  var a_CRP_input= (<HTMLInputElement>document.querySelector('input[name="a_CRP"]'));
  var a_Cr_input= (<HTMLInputElement>document.querySelector('input[name="a_Cr"]'));
  var a_Hb_input= (<HTMLInputElement>document.querySelector('input[name="a_Hb"]'));
  var a_lactic_input= (<HTMLInputElement>document.querySelector('input[name="a_lactic"]'));
  var a_BNP_input= (<HTMLInputElement>document.querySelector('input[name="a_BNP"]'));
  var a_PLT_input= (<HTMLInputElement>document.querySelector('input[name="a_PLT"]'));
  var a_Procal_input= (<HTMLInputElement>document.querySelector('input[name="a_Procal"]'));
  var a_TnT_input= (<HTMLInputElement>document.querySelector('input[name="a_TnT"]'));
  var a_WBC_input= (<HTMLInputElement>document.querySelector('input[name="a_WBC"]'));
  var a_Na_input= (<HTMLInputElement>document.querySelector('input[name="a_Na"]'));
  var a_K_input= (<HTMLInputElement>document.querySelector('input[name="a_K"]'));

  if (!Additional_Section?.classList.contains('Opened')){
    Additional_Section?.classList.add('Opened')
    if(this.Bound_Data.sample_case === '1') {
      a_AST_input.value = '80'
      a_bil_input.value = '2.7'
      a_CRP_input.value = '15'
      a_Cr_input.value = '1.1'
      a_Hb_input.value = '9.5'
      a_lactic_input.value = '6'
      a_BNP_input.value = '300'
      a_PLT_input.value = '40'

      a_WBC_input.value = '0.5'
      a_Na_input.value = '137'
      a_K_input.value = '4.1'
      a_Procal_input.value = '0.19'
      a_TnT_input.value = '0.011'


    }
    else if(this.Bound_Data.sample_case === '2') {
      a_AST_input.value = '20'
      a_bil_input.value = '0.5'
      a_CRP_input.value = '1.1'
      a_Cr_input.value = '0.6'
      a_Hb_input.value = '12'
      a_lactic_input.value = '1'
      a_BNP_input.value = '150'
      a_PLT_input.value = '200'

      a_WBC_input.value = '7'
      a_Na_input.value = '145'
      a_K_input.value = '3.6'
      a_Procal_input.value = '0.19'
      a_TnT_input.value = '0.011'

    }
    else if(this.Bound_Data.sample_case === '3') {
      a_AST_input.value = '50'
      a_bil_input.value = '0.8'
      a_CRP_input.value = '7.23'
      a_Cr_input.value = '0.85'
      a_Hb_input.value = '12.4'
      a_lactic_input.value = '3.59'
      a_BNP_input.value = '502'
      a_PLT_input.value = '219'

      a_WBC_input.value = '9.87'
      a_Na_input.value = '133'
      a_K_input.value = '5.4'
      a_Procal_input.value = '0.19'
      a_TnT_input.value = '0.011'

    }

    else if(this.Bound_Data.sample_case === '4') {
      a_AST_input.value = '80'
      a_bil_input.value = '3.5'
      a_CRP_input.value = '2'
      a_Cr_input.value = '1'
      a_Hb_input.value = '6'
      a_lactic_input.value = '4'
      a_BNP_input.value = '500'
      a_PLT_input.value = '35'

      a_WBC_input.value = '3'
      a_Na_input.value = '133'
      a_K_input.value = '5'
      a_Procal_input.value = '0.19'
      a_TnT_input.value = '0.011'

    }

    else if(this.Bound_Data.sample_case === '5') {
      a_AST_input.value = '50'
      a_bil_input.value = '0.8'
      a_CRP_input.value = '18.64'
      a_Cr_input.value = '3.1'
      a_Hb_input.value = '7.6'
      a_lactic_input.value = '7.1'
      a_BNP_input.value = '33825'
      a_PLT_input.value = '60'

      a_WBC_input.value = '0.23'
      a_Na_input.value = '126'
      a_K_input.value = '4.9'
      a_Procal_input.value = '0.19'
      a_TnT_input.value = '0.011'


    }
  }

 }



}

