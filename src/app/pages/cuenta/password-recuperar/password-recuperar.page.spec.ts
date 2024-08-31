import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordRecuperarPage } from './password-recuperar.page';

describe('PasswordRecuperarPage', () => {
  let component: PasswordRecuperarPage;
  let fixture: ComponentFixture<PasswordRecuperarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecuperarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
