import { Component,Inject } from '@angular/core';

import {FloatLabelType} from '@angular/material/form-field'
import {FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { OnInit } from '@angular/core';
import {Location} from '@angular/common';


import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import {NgIf} from '@angular/common';


import { MatDialogModule} from '@angular/material/dialog';

import {MatSnackBar} from '@angular/material/snack-bar';
import {KUMCAlgoService} from '../../services/kumc-algo.service';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


/**
 * @title Injecting data when opening a dialog
 */
export interface DialogData {
  predict1:string;
  IsThisMonitoirng: string;
}

@Component({
  selector: 'app-kumc-algo',
  templateUrl: './kumc_algo.component.html',
  styleUrls: ['./kumc_algo.component.css'],
  providers: [KUMCAlgoService],



})
export class KUMCAlgoComponent implements OnInit{

  //환자 정보
  age = new FormControl('', [Validators.required]);
  sex = new FormControl('', [Validators.required]);
  pulse_rate = new FormControl('', [Validators.required]);
  body_temper =new FormControl('', [Validators.required]);




  // Cheif Complaint

  chest_pain = new FormControl('', [Validators.required]);
  postCPR = new FormControl('', [Validators.required]);
  abdomin_pain = new FormControl('', [Validators.required]);
  dizz = new FormControl('', [Validators.required]);
  fever = new FormControl('', [Validators.required]);

  // ECG test Results
  PR_interval = new FormControl('', [Validators.required]);
  QRS_duration = new FormControl('', [Validators.required]);
  ST_T_change = new FormControl('', [Validators.required]);
  ST = new FormControl('', [Validators.required]);
  L_ventri_hyper = new FormControl('', [Validators.required]);
  ECG = new FormControl('', [Validators.required]);

  // Other - 검사실 소견
  troponin = new FormControl('', [Validators.required]);
  CK_MB = new FormControl('', [Validators.required]);

  creatinine = new FormControl('', [Validators.required]);
  CPK = new FormControl('', [Validators.required]);
  total_bilitubin =new FormControl('', [Validators.required]);
  ALP = new FormControl('', [Validators.required]);
  hemoglobin = new FormControl('', [Validators.required]);
  glucose = new FormControl('', [Validators.required]);


  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  hide = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _location: Location,
    public dialog: Dialog,
    private _snackBar: MatSnackBar,
    private KUMCAlgoService: KUMCAlgoService
    ) {}

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 7000,
      });
    }
    age_default:any;
    sex_selected:string;
    pulserate_default:any;
    BT_default:any;
    PRinterval_default:any;
    chestpain_selected:string;
    postCPR_selected:string;
    abdominpain_selected:string;
    dizz_selected:string;
    fever_selected:string;
    STTchange_selected:string;
    ST_selected: string;
    LVentriHyper_selected:string;
    ecg_selected:string;
    QRSduration_default:any;
    troponin_default: any;
    CKMB_default:any;
    Cr_default:any;
    CPK_default:any;
    totalbrilirubin_default:any;
    ALP_default: any;
    hemoglobin_default:any;
    glucose_default:any;

  ngOnInit() {
    this.age_default = 30
    this.sex_selected = '0';
    this.pulserate_default = 80;
    this.BT_default = 36.5;
    this.PRinterval_default = 170;


    this.chestpain_selected = '0';
    this.postCPR_selected = '0';
    this.abdominpain_selected = '0';
    this.dizz_selected = '0';
    this.fever_selected = '0';


    this.STTchange_selected = '0';
    this.ST_selected = '0';
    this.LVentriHyper_selected = '0';
    this.ecg_selected = '0'
    this.QRSduration_default = 90;
    this.troponin_default = 0.014;
    this.CKMB_default = 4;
    this.Cr_default = 1.00;
    this.CPK_default = 150;
    this.totalbrilirubin_default = 0.6;
    this.ALP_default = 75;
    this.hemoglobin_default = 13;
    this.glucose_default = 100;

  }

ngOnInit_1() {
    this.age_default = 30
    this.sex_selected = '0';
    this.pulserate_default = 80;
    this.BT_default = 36.5;
  }

ngOnInit_2() {

    this.chestpain_selected = '0';
    this.postCPR_selected = '0';
    this.abdominpain_selected = '0';
    this.dizz_selected = '0';
    this.fever_selected = '0';
  }

ngOnInit_3() {

    this.PRinterval_default = 170;
    this.QRSduration_default = 90;
    this.STTchange_selected = '0';
    this.ST_selected = '0';
    this.LVentriHyper_selected = '0';
    this.ecg_selected = '0'

  }

ngOnInit_4() {

    
    this.troponin_default = 0.014;
    this.CKMB_default = 4;
    this.Cr_default = 1.00;
    this.CPK_default = 150;
    this.totalbrilirubin_default = 0.6;
    this.ALP_default = 75;
    this.hemoglobin_default = 13;
    this.glucose_default = 100;

  }

  Force_Validation(){
    this.sex.markAllAsTouched();
    this.age.markAllAsTouched();
    this.pulse_rate.markAllAsTouched();
    this.body_temper.markAllAsTouched();

    this.chest_pain.markAllAsTouched();
    this.postCPR.markAllAsTouched();
    this.abdomin_pain.markAllAsTouched();
    this.dizz.markAllAsTouched();
    this.fever.markAllAsTouched();

    this.PR_interval.markAllAsTouched();
    this.QRS_duration.markAllAsTouched();
    this.ST_T_change.markAllAsTouched();
    this.ST.markAllAsTouched();
    this.ST.markAllAsTouched();
    this.L_ventri_hyper.markAllAsTouched();
    this.ECG.markAllAsTouched();

    this.troponin.markAllAsTouched();
    this.CK_MB.markAllAsTouched();
    this.creatinine.markAllAsTouched();
    this.CPK.markAllAsTouched();
    this.total_bilitubin.markAllAsTouched();
    this.ALP.markAllAsTouched();
    this.hemoglobin.markAllAsTouched();
    this.glucose.markAllAsTouched();

  }
  Request_Url:any = '';


  GetResult(event: any){
    this.Force_Validation()
    event.preventDefault();
    this.getData(
      this.sex.value,
      this.chest_pain.value,
      this.postCPR.value,
      this.abdomin_pain.value,
      this.dizz.value,
      this.fever.value,
      this.PR_interval.value,
      this.QRS_duration.value,
      this.ST_T_change.value,
      this.ST.value,
      this.L_ventri_hyper.value,
      this.ECG.value,
      this.troponin.value,
      this.CK_MB.value,
      this.pulse_rate.value,
      this.body_temper.value,
      this.creatinine.value,
      this.CPK.value,
      this.total_bilitubin.value,
      this.ALP.value,
      this.hemoglobin.value,
      this.glucose.value
    )


   }
   KUMCAlgo_predict:any;

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

   // {"Sex", "Chest Pain", "Post-CPR state", "Abdominal pain", "Dizziness", "Fever", "PR interval", "QRS Duration", "Q wave/major ST- T change", "ST elevation", "Left ventricular hypertrophy", "Other ECG finding", "Troponin".1, "CK-MB", "Pulse rate", "Body temperature", "Creatinine", "CPK", "Total bilirubin", "ALP", "Hemoglobin", "Glucose"}
   getData(
    sex:any, chestpain:any, postcpr:any, abdominalpain:any, dizz:any, fever:any, printerval:any, qrsduration:any, sttchange:any, st:any, leftventricular:any, ecg:any, troponin:any, ck:any, pulserate:any, bodytemper:any, creatinine:any, cpk:any, totalbil:any, alp:any, hemoglobin:any,glucose:any
    ) {
    if(
      !this.sex.invalid &&
      !this.chest_pain.invalid &&
      !this.postCPR.invalid &&
      !this.abdomin_pain.invalid &&
      !this.dizz.invalid &&
      !this.fever.invalid &&
      !this.PR_interval.invalid &&
      !this.QRS_duration.invalid &&
      !this.ST_T_change.invalid &&
      !this.ST.invalid &&
      !this.L_ventri_hyper.invalid &&
      !this.ECG.invalid &&
      !this.troponin.invalid &&
      !this.CK_MB.invalid &&
      !this.pulse_rate.invalid &&
      !this.body_temper.invalid &&
      !this.creatinine.invalid &&
      !this.CPK.invalid &&
      !this.total_bilitubin.invalid &&
      !this.ALP.invalid &&
      !this.hemoglobin.invalid &&
      !this.glucose.invalid

      ) {
        this.Start_Loading();
      this.KUMCAlgoService.kumc_algo_post(
        sex, chestpain, postcpr, abdominalpain, dizz, fever, printerval, qrsduration, sttchange, st, leftventricular, ecg, troponin, ck, pulserate, bodytemper, creatinine, cpk, totalbil, alp, hemoglobin,glucose
      )
      .subscribe(data => {
        console.log('/kumc-algo 를 불렀습니다.', data.predict1)

        this.KUMCAlgo_predict = data.predict1;

        this.End_Loading();
      })

    }else {
      this.openSnackBar('올바른 값을 입력해주세요', '확인')
    }

  }
Open_Monitoring(){
  this.dialog.open(KUMCResultDialog, {panelClass: 'KUMC_Result_Dialog_Container',
  backdropClass: 'blurred',
  data: {
    predict1: this.KUMCAlgo_predict,
    IsThisMonitoirng: "YES"
  },

  // 여기서 데이터 보내서 monitor로 만들기
},

  );
}

  openDialog() {
    this.dialog.open(KUMCResultDialog, {panelClass: 'KUMC_Result_Dialog_Container',
    backdropClass: 'blurred',
    data: {
      predict1: this.KUMCAlgo_predict,
    },
  },

    );
  }
  backClicked() {
    this._location.back();
  }


  Reset_Handler(event:any) {
    const eventTarget = event.target;
    const SectionBox = eventTarget.closest('.Section_Box');
    if(SectionBox.classList.contains('Information')){
      this.ngOnInit_1()
    }
    if(SectionBox.classList.contains('Chief_Complaint')){

      this.ngOnInit_2()
    } else if (SectionBox.classList.contains('ECG')){
      this.ngOnInit_3()
    } else if (SectionBox.classList.contains('Other')){
      this.ngOnInit_4()
    }
  }



  // 로딩 테스트용
  // loadingPercent = 0;
  // intervalId = {} as any;
  // startLoading() {

  //   this.intervalId = setInterval(() => {
  //     if (this.loadingPercent < 100) {
  //       this.loadingPercent += 1;
  //     } else {
  //       clearInterval(this.intervalId);
  //       this.openDialog();
  //       this.loadingPercent = 0;
  //     }
  //   }, 10);

  // }

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
  {model: 'model', Accuracy: 0.97, Precision: 0.5, Recall: 0.67, AUPRC: 0.61, AUROC: 0.95},



];



@Component({
  selector: 'kumc_result_dialog',
  templateUrl: 'kumc_result_dialog.html',
  styleUrls: ['./kumc_result_dialog.css'],
  standalone: true,
  imports: [MatDialogModule, NgIf, MatButtonModule, MatTableModule],
})
export class KUMCResultDialog {
  constructor(@Inject(DIALOG_DATA) public data: DialogData,
  public dialog: Dialog
  ) {

  }
  // "predict1": "필요하지 않습니다" or “필요합니다”,

  ngOnInit() {
  }

 Dialog_Close_Handler(){
  this.dialog.closeAll();
 }

 displayedColumns: string[] = ['model', 'Accuracy', 'Precision', 'Recall', 'AUPRC','AUROC'];
 dataSource = ELEMENT_DATA;

}


