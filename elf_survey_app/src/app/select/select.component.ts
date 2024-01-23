import { Component, EventEmitter, Input, Output } from '@angular/core';

import {FloatLabelType} from '@angular/material/form-field'
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OnInit } from '@angular/core';

import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  animations: [
    trigger('OnOff', [
      // ...
      state('On', style({
        width: '50%',

      })),
      state('Off', style({
        width: '150px',

      })),
      transition('On => Off', [
        animate('3s')
      ]),
    ])
 ]
})
export class SelectComponent implements OnInit{
  @Input() progress_value = '';
  @Output() newProgressEvent = new EventEmitter<any>();
  @Output() newActComponentEvent = new EventEmitter<any>();

  Logged_In:any = false;


  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  hide = true;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {

  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  Logged_In_Handler() {
    this.Logged_In = true;
    this.progress_value = '25';
    console.log('로그인 버튼 선택',this.progress_value)
    this.newProgressEvent.emit(this.progress_value);

  }
  Call_SMC_Algo_Handler(){
    this.newActComponentEvent.emit('smc_algo');
  }
  Call_KUMC_Algo_Handler(){
    this.newActComponentEvent.emit('kumc_algo');
  }



}
