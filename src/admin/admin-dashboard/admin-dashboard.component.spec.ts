import { Component, OnInit, effect } from '@angular/core';
import { BlockchainService } from 'src/services/blockchain.service';

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

  // Dynamic data
  activeDoctors: number = 10; // Replace with actual dynamic data
  totalPatients: number = 120; // Replace with actual dynamic data
  inPatients: number = 30; // Replace with actual dynamic data

  constructor(private bs: BlockchainService) {
    effect(() => {
      this.onCheckAdmin();
    });
  }

  ngOnInit(): void {
    this.onCheckAdmin();
  }

  onCheckAdmin() {
    this.progressMsg = 'Checking Admin Access...';
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
}
