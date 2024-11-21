import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditaListaPage } from './edita-lista.page';

describe('EditaListaPage', () => {
  let component: EditaListaPage;
  let fixture: ComponentFixture<EditaListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
