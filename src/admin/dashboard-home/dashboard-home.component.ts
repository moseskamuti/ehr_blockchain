import { Component, OnInit, effect } from '@angular/core';
import { BlockchainService } from 'src/services/blockchain.service';
import { DoctorService } from 'src/admin/services/doctor.service';  // Import the service to get doctor data
import { PatientService } from 'src/admin/services/patient.service';  // Import the service to get patient data

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.sass']
})
export class DashboardHomeComponent implements OnInit {

  Titles: any = ['Total Patients', 'In Patients', 'Active Doctors', 'Active Nurses']
  Images: any = ['user-injured', 'procedures', 'user-md', 'user-nurse']
  Count: number = 0
  Background: any = ['green', 'orange', 'blue', 'violet']

  accountBalance: any;
  activeDoctors: number = 0;
  totalPatients: number = 0;
  inPatients: number = 0;

  constructor(blockchainService: BlockchainService,
              private doctorService: DoctorService,  // Inject doctor service
              private patientService: PatientService)  // Inject patient service
  {
    effect(() => {
      this.accountBalance = blockchainService.balance();
      console.log(this.accountBalance);
    });
  }

  ngOnInit(): void {
    this.loadData();  // Load the data for doctors and patients
  }

  // Fetch Active Doctors, Total Patients, In Patients
  loadData() {
    this.doctorService.getDrs().then((docs: any) => {
      this.activeDoctors = docs.length;
    });

    this.patientService.getPatients().then((patients: any) => {
      this.totalPatients = patients.length;
      this.inPatients = this.calculateInPatients(patients);  // Calculate inpatients
    });
  }

  // Sample function for calculating inpatients
  calculateInPatients(patients: any[]): number {
    return patients.filter(p => p.status === 'inpatient').length;
  }
}
