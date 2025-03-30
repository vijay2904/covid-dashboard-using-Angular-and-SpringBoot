import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveNavComponent } from './responsive-nav.component';

describe('ResponsiveNavComponent', () => {
  let component: ResponsiveNavComponent;
  let fixture: ComponentFixture<ResponsiveNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiveNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
