import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationRoutingModule } from './designation-routing.module';
import { DesignationComponent } from './designation.component';
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
  declarations: [DesignationComponent],
  imports: [
    CommonModule,
    DesignationRoutingModule,  
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
export class DesignationModule { }
