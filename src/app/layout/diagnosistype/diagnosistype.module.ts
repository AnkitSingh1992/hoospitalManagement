import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosistypeRoutingModule } from './diagnosistype-routing.module';
import { DiagnosistypeComponent } from './diagnosistype.component';

import { MatFormFieldModule, MatPaginatorModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule, MatButtonToggleModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [DiagnosistypeComponent],
  imports: [
    CommonModule,
    DiagnosistypeRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    DashboardModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class DiagnosistypeModule { }
