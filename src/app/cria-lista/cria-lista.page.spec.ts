import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriaListaPage } from './cria-lista.page';

describe('CriaListaPage', () => {
  let component: CriaListaPage;
  let fixture: ComponentFixture<CriaListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriaListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
