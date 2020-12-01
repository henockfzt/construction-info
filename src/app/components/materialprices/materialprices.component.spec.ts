import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialpricesComponent } from './materialprices.component';

describe('MaterialpricesComponent', () => {
  let component: MaterialpricesComponent;
  let fixture: ComponentFixture<MaterialpricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialpricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialpricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
