import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOrganizationalUnitComponent } from './typeOrganizationalUnit.component';

describe('BankBranchesComponent', () => {
  let component: TypeOrganizationalUnitComponent;
  let fixture: ComponentFixture<TypeOrganizationalUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeOrganizationalUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOrganizationalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
