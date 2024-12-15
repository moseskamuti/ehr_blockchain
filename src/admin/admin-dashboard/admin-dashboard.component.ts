import { Component, OnInit, effect } from '@angular/core';
import { Router } from '@angular/router';
import { BlockchainService } from 'src/services/blockchain.service';
import { DoctorService } from 'src/admin/services/doctor.service';  // Import the service to get doctor data
import { PatientService } from 'src/admin/services/patient.service'; // Import the service to get patient data

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass'],
})
export class AdminDashboardComponent implements OnInit {

  isCollapse: boolean = true;
  isAdmin: boolean = false;

  checkProgress: boolean = true;
  progressWarn: boolean = false;
  progressMsg: string = 'Checking Admin....';

  // New variables for the fetched data
  activeDoctors: number = 0;
  totalPatients: number = 0;
  inPatients: number = 0;

  constructor(
    private router: Router,
    private bs: BlockchainService,
    private doctorService: DoctorService, // Inject doctor service
    private patientService: PatientService  // Inject patient service
  ) {
    effect(() => {
      this.onCheckAdmin();
    });
  }

  ngOnInit(): void {
    this.onCheckAdmin();
    this.router.navigate(['admin/admin-dashboard']);
    this.loadData(); // Load data for doctors and patients
  }

  // Check admin access
  onCheckAdmin() {
    this.progressMsg = 'Checking Admin Acess...';
    this.progressWarn = false;
    console.log("check admin");

    this.bs.checkIsAdmin().then(r => {
      console.log(r);
      if (r) {
        this.isAdmin = true;
      }
    }).catch((er: any) => {
      this.checkProgress = false;
      this.progressWarn = true;
      this.progressMsg = '<span class="text-danger">Only admin have Access to this Page.... </span><br> ' +
        'Connect Metamask to your Admin account';
    });
  }

  // Fetch Active Doctors, Total Patients, In Patients
  loadData() {
    this.doctorService.getDrs().then((docs: any) => {
      this.activeDoctors = docs.length;  // Assuming docs.length gives the number of active doctors
    });

    this.patientService.getPatients().then((patients: any) => {
      this.totalPatients = patients.length; // Assuming patients.length gives the number of total patients
      this.inPatients = this.calculateInPatients(patients); // Assuming you have logic for inpatients calculation
    });
  }

  // Sample function for calculating inpatients
  calculateInPatients(patients: any[]): number {
    return patients.filter(p => p.status === 'inpatient').length;  // Example: filtering based on 'status'
  }
}
