import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosistypeComponent } from './diagnosistype.component';

describe('DiagnosistypeComponent', () => {
  let component: DiagnosistypeComponent;
  let fixture: ComponentFixture<DiagnosistypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosistypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosistypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
