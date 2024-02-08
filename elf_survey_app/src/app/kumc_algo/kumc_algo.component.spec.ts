import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KUMCAlgoComponent } from './kumc_algo.component';

describe('KUMCAlgoComponent', () => {
  let component: KUMCAlgoComponent;
  let fixture: ComponentFixture<KUMCAlgoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KUMCAlgoComponent]
    });
    fixture = TestBed.createComponent(KUMCAlgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
