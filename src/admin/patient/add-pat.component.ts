import { Component, OnInit } from '@angular/core';
import { IPFSHTTPClient } from 'ipfs-http-client/dist/src/types';
import { PatientService } from 'src/admin/services/patient.service';

@Component({
  selector: 'patient-add',
  templateUrl: './add-pat.component.html',
  styleUrls: ['./add-pat.component.sass'],
})
export class AddPatientComponent implements OnInit {
  model: any = {
    patientID: '',
    fName: 'test_name',
    lName: 'test_name',
    DoB: '',
    emailID: 'test_name@mail.com',
    phone: '123456789',
    city: 'city',
    state: 'state',
    imageHash: '',
  };

  image_url: any;
  imageCompressedUrl: string = '';

  show: boolean = false;
  msg_text: string = '';
  warn: boolean = false;
  success: boolean = false;

  ipfs: IPFSHTTPClient;
  IPFShash: string = '';

  constructor(private ps: PatientService) {
    this.ipfs = ps.ipfs;
  }

  ngOnInit(): void {
    this.ipfs = this.ps.ipfs;
  }

  onAddPatientSubmit() {
    this.show = true;
    this.msg_text = 'Adding Patient to the Network....';
    this.warn = false;
    this.success = false;

    this.model.imageHash = this.image_url;

    let data = this.model;

    this.ps.addPatient(this.model.patientID, data).then((r: any) => {
      this.success = true;
      this.msg_text = 'Data added to IPFS...';
      this.msg_text += '<br>Patient Added to the Blockchain';
      console.log('Patient added Successfully');

      this.model = {};
    }).catch((er: any) => {
      this.warn = true;
      this.msg_text =
        'Adding Patient Failed<br> <small class="fw-light text-danger"><b>"</b>' +
        this.model.patientID +
        '<b>"</b></small><br>1. Not a valid address or <br>2. Already have a role';
      console.log(er);
    });
  }

  PreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.image_url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onClose() {
    this.show = false;
    this.warn = false;
  }
}
