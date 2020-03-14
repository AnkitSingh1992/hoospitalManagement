import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosistestComponent } from './diagnosistest.component';

describe('DiagnosistestComponent', () => {
  let component: DiagnosistestComponent;
  let fixture: ComponentFixture<DiagnosistestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosistestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosistestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
