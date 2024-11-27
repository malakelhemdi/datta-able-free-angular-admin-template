import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffRequestsViewComponent } from './timeOffRequestsView.component';

describe('BankBranchesComponent', () => {
  let component: TimeOffRequestsViewComponent;
  let fixture: ComponentFixture<TimeOffRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeOffRequestsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeOffRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
