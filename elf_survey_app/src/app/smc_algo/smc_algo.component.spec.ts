import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMCAlgoComponent } from './smc_algo.component';

describe('SMCAlgoComponent', () => {
  let component: SMCAlgoComponent;
  let fixture: ComponentFixture<SMCAlgoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SMCAlgoComponent]
    });
    fixture = TestBed.createComponent(SMCAlgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
