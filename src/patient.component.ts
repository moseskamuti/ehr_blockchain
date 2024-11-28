import { Component } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {
  model = {
    fName: '',
    lName: '',
    phone: '',
    patID: '',
    city: '',
    state: ''
  };

  success: boolean = false;
  show: boolean = false;
  warn: boolean = false;
  msg_text: string = '';

  onSubmit() {
    // Mock submission logic; replace this with actual service call
    if (this.model.fName && this.model.phone && this.model.patID && this.model.city) {
      // If all required fields are filled
      this.success = true;
      this.show = true;
      this.warn = false;
      this.msg_text = 'Patient added successfully!';
    } else {
      // If form is incomplete
      this.success = false;
      this.show = true;
      this.warn = true;
      this.msg_text = 'Please fill in all required fields!';
    }
  }

  onClose() {
    // Hide the message card
    this.show = false;
  }
}
