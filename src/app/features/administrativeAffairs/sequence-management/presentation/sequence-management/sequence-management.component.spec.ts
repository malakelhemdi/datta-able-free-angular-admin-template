import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceManagementComponent } from './sequence-management.component';

describe('SequenceManagementComponent', () => {
  let component: SequenceManagementComponent;
  let fixture: ComponentFixture<SequenceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SequenceManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SequenceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
