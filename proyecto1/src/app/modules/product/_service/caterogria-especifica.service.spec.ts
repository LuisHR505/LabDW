import { TestBed } from '@angular/core/testing';

import { CaterogriaEspecificaService } from './caterogria-especifica.service';

describe('CaterogriaEspecificaService', () => {
  let service: CaterogriaEspecificaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaterogriaEspecificaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
