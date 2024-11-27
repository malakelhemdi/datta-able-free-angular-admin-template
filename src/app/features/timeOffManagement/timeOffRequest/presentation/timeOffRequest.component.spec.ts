import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffRequestComponent } from './timeOffRequest.component';

describe('BankBranchesComponent', () => {
  let component: TimeOffRequestComponent;
  let fixture: ComponentFixture<TimeOffRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeOffRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeOffRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
