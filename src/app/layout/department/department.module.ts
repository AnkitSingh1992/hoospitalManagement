import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
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
  declarations: [DepartmentComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
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
export class DepartmentModule { }
