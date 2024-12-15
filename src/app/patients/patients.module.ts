import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';



@NgModule({
  declarations: [
    PatientListComponent,
    PatientDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PatientsModule { }
