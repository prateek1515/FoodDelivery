import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDishesComponent } from './user-dishes.component';

describe('UserDishesComponent', () => {
  let component: UserDishesComponent;
  let fixture: ComponentFixture<UserDishesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDishesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
