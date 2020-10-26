import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOptionComponent } from './home-option.component';

describe('HomeOptionComponent', () => {
  let component: HomeOptionComponent;
  let fixture: ComponentFixture<HomeOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
