import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialVendorComponent } from './material-vendor.component';

describe('MaterialVendorComponent', () => {
  let component: MaterialVendorComponent;
  let fixture: ComponentFixture<MaterialVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
