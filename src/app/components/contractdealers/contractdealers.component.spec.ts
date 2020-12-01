import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractdealersComponent } from './contractdealers.component';

describe('ContractdealersComponent', () => {
  let component: ContractdealersComponent;
  let fixture: ComponentFixture<ContractdealersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractdealersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractdealersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
