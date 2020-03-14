import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      
      {
        path: 'doctor',
        loadChildren: './doctor/doctor.module#DoctorModule'
      },

      {
        path: 'department',
        loadChildren: './department/department.module#DepartmentModule'
      },
      {
        path: 'designation',
        loadChildren: './designation/designation.module#DesignationModule'
      },
      {
        path: 'patient',
        loadChildren: './patient/patient.module#PatientModule'
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
      },
      {
        path: 'feedback',
        loadChildren: './feedback/feedback.module#FeedbackModule'
      },
      {
        path: 'diagnosis-type',
        loadChildren: './diagnosistype/diagnosistype.module#DiagnosistypeModule'
      },
      {
        path: 'appointment',
        loadChildren: './appointment/appointment.module#AppointmentModule'
      },
      {
        path: 'diagnosis-test',
        loadChildren: './diagnosistest/diagnosistest.module#DiagnosistestModule'
      },
    ]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
