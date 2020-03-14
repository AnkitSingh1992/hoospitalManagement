import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagnosistestComponent } from './diagnosistest.component'


const routes: Routes = [
  {
    path: '',
    component:DiagnosistestComponent    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosistestRoutingModule { }
