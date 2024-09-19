import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRopaPage } from './edit-ropa.page';

describe('EditRopaPage', () => {
  let component: EditRopaPage;
  let fixture: ComponentFixture<EditRopaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRopaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
