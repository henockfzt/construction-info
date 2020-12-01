import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalmachinesComponent } from './rentalmachines.component';

describe('RentalmachinesComponent', () => {
  let component: RentalmachinesComponent;
  let fixture: ComponentFixture<RentalmachinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalmachinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalmachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
