import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaEspecificaComponent } from './categoria-especifica.component';

describe('CategoriaEspecificaComponent', () => {
  let component: CategoriaEspecificaComponent;
  let fixture: ComponentFixture<CategoriaEspecificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaEspecificaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
