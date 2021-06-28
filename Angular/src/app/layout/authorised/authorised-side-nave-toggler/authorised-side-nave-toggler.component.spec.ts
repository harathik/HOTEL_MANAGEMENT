import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedSideNaveTogglerComponent } from './authorised-side-nave-toggler.component';

describe('AuthorisedSideNaveTogglerComponent', () => {
  let component: AuthorisedSideNaveTogglerComponent;
  let fixture: ComponentFixture<AuthorisedSideNaveTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorisedSideNaveTogglerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisedSideNaveTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
