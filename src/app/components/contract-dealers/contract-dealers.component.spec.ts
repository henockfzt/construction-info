import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDealersComponent } from './contract-dealers.component';

describe('ContractDealersComponent', () => {
  let component: ContractDealersComponent;
  let fixture: ComponentFixture<ContractDealersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDealersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDealersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
