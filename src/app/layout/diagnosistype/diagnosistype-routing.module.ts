import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagnosistypeComponent } from './diagnosistype.component'

const routes: Routes = [
  {
    path: '',
    component: DiagnosistypeComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosistypeRoutingModule { }
