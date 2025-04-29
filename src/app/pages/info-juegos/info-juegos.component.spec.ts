import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoJuegosComponent } from './info-juegos.component';

describe('InfoJuegosComponent', () => {
  let component: InfoJuegosComponent;
  let fixture: ComponentFixture<InfoJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoJuegosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
