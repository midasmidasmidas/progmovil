import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordCambioPage } from './password-cambio.page';

describe('PasswordCambioPage', () => {
  let component: PasswordCambioPage;
  let fixture: ComponentFixture<PasswordCambioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordCambioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
