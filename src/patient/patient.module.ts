import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // For handling forms
import { RouterModule } from '@angular/router'; // For routing

// Import your components
import { AddPatientComponent } from './add-pat.component';
import { PatientComponent } from './patient.component';

@NgModule({
  declarations: [
    AddPatientComponent,
    PatientComponent
  ],
  imports: [
    CommonModule,  // Provides common directives like ngIf, ngFor
    FormsModule,   // If you're using forms (like adding patient form)
    RouterModule   // If you are using routing
  ],
  exports: [
    AddPatientComponent,
    PatientComponent
  ]
})
export class PatientModule { }
