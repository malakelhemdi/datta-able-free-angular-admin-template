import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationStructureTypeComponent } from './organization-structure-type.component';

describe('OrganizationStructureTypeComponent', () => {
  let component: OrganizationStructureTypeComponent;
  let fixture: ComponentFixture<OrganizationStructureTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationStructureTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationStructureTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
