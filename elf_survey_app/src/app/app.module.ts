import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import {MatProgressBarModule} from '@angular/material/progress-bar';

import { RouterModule, Routes } from '@angular/router';
import { SMCAlgoComponent } from './smc_algo/smc_algo.component';

import {MatToolbarModule} from '@angular/material/toolbar';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { SelectComponent } from './select/select.component';
import { SurveyComponent } from './survey/survey.component';


import { KUMCAlgoComponent } from './kumc_algo/kumc_algo.component';
import {DialogModule} from '@angular/cdk/dialog';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatSnackBarModule} from '@angular/material/snack-bar';

import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';


const appRoutes: Routes = [

  {path: 'SMC', component: SMCAlgoComponent },
  {path: 'KUMC', component: KUMCAlgoComponent },
  {path: 'select', component: SelectComponent},
  {path: 'survey', component: SurveyComponent},
  {path:'', component: LoginComponent},


];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SMCAlgoComponent,
    KUMCAlgoComponent,
    SelectComponent,
    SurveyComponent

  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- 디버그 활성화
    ),

    AppRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatRadioModule,
    DialogModule,
    MatProgressSpinnerModule,


    MatSnackBarModule,

    HttpClientModule,

    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatTableModule


  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
