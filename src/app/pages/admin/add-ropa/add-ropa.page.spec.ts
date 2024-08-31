import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRopaPage } from './add-ropa.page';

describe('AddRopaPage', () => {
  let component: AddRopaPage;
  let fixture: ComponentFixture<AddRopaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRopaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
