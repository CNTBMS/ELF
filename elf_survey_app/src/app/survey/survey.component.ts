import { Component, Input, Output,EventEmitter,Inject } from '@angular/core';

import {FloatLabelType} from '@angular/material/form-field'
import {FormBuilder,Validators, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OnInit } from '@angular/core';
import {Location} from '@angular/common';


import {Dialog, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import {NgIf} from '@angular/common';


import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';

import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import {SurveyService} from '../../services/survey.service';

/**
 * @title Injecting data when opening a dialog
 */


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [SurveyService],
})
export class SurveyComponent implements OnInit{
  Q_1 = new FormControl('', [Validators.required]);
  Q_2 = new FormControl('', [Validators.required]);
  Q_3 = new FormControl('', [Validators.required]);
  Q_4 =new FormControl('', [Validators.required]);
  Q_5 = new FormControl('', [Validators.required]);
  Q_6 = new FormControl('', [Validators.required]);

  // /survey post에 보낼 때 값 추출 방법
  // {Q1,Q2,Q3,Q4,Q5,Q6}
//   Q1 = this.Q_1.value;
//   Q2 = this.Q_2.value;
// 이하 생략
// ....



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
    private SurveyService: SurveyService,

    ) {}

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 7000
      });
    }
Q1_selected:string;
Q2_selected:string;
Q3_selected:string;
Q4_selected:string;
Q5_selected:string;
Q6_selected:string;

  ngOnInit() {
    this.Q1_selected = '5'
    this.Q2_selected = '5'
    this.Q3_selected = '5'
    this.Q4_selected = '5'
    this.Q5_selected = '5'
    this.Q6_selected = '5'
  }

 SurveySubmit(event:any) {

    event.preventDefault();
    // this.getData()
    this.SurveyService.survey_submit_post(
      this.Q_1.value,
      this.Q_2.value,
      this.Q_3.value,
      this.Q_4.value,
      this.Q_5.value,
      this.Q_6.value
    )
    .subscribe(data => {
      console.log('/survey 를 불렀습니다.', data)

      this.startLoading();
    })
  }

  backClicked() {
    this._location.back();
  }

// 로딩 테스트용
loadingPercent = 0;
intervalId = {} as any;
startLoading() {

  this.intervalId = setInterval(() => {
    if (this.loadingPercent < 100) {
      this.loadingPercent += 1;
    } else {
      clearInterval(this.intervalId);
      this.openDialog();
      this.loadingPercent = 0;
    }
  }, 10);

}

openDialog() {
  this.dialog.open(SurveyEndDialog, {panelClass: 'Survey_End_Dialog_Container',
  backdropClass: 'blurred',
  data: {

  },
},

  );
}


}


@Component({
  selector: 'survey_end_dialog',
  templateUrl: 'survey_end_dialog.html',
  styleUrls: ['./survey_end_dialog.css'],
  standalone: true,
  imports: [NgIf,MatToolbarModule, MatButtonModule, MatIconModule,MatDialogModule],
})
export class SurveyEndDialog {
  constructor(
  public dialog: Dialog,
  private _location: Location,


  ) {


  }

 Dialog_Close_Handler(){
  this.dialog.closeAll();
  window.location.href = "/select"

 }
}
