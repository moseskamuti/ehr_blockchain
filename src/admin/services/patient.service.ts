import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPFSHTTPClient } from 'ipfs-http-client/dist/src/types';
import { IPFS } from 'src/environments/environment';
import { BlockchainService } from 'src/services/blockchain.service';
import { IpfsService } from 'src/services/ipfs.service';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  web3: any;
  abi: any = {};
  netWorkData: any = {};
  netId: any;
  address: any;
  contract: any;
  account: any;

  ipfs: IPFSHTTPClient;

  msg_text: string = '';

  result: any;

  Patients: any;

  PatientDetails: string[] = [];

  patInfoload: boolean = false;

  constructor(
    private bs: BlockchainService,
    private ipfsService: IpfsService,
    private http: HttpClient
  ) {
    this.contract = bs.getContract().then((c: any) => {
      return c;
    });
    this.ipfs = ipfsService.getIPFS();
  }

  // Get all patients from the blockchain
  getPatients(): Promise<any> {
    return new Promise((resolve) => {
      this.bs.getContract().then((contract: any) => {
        this.Patients = contract.methods.getAllPatients()
          .call()
          .then((patients: any) => {
            this.Patients = patients;
            console.log(this.Patients);
            resolve(this.Patients);
          });
      });
    });
  }

  // Get patient details based on the patient ID
  getPatientDetails(patID: any): Promise<any> {
    console.log(patID);

    return new Promise((resolve) => {
      this.bs.getContract().then((contract: any) => {
        contract.methods
          .getPatient(patID)
          .call()
          .then((ipfsHash: string) => {
            console.log(ipfsHash);
            this.http.get(IPFS.localIPFSGet + ipfsHash)
              .subscribe((data: any) => {
                console.log(data);
                resolve(data);
              });
          });
      });
    });
  }

  // Add a new patient to the blockchain and IPFS
  addPatient(patId: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.bs.getContract().then((c) => {
        this.bs.getCurrentAccount().then((a) => {
          this.addRecord(data).then((ipfsHash) => {
            c.methods
              .addPatientInfo(patId, ipfsHash)
              .send({ from: a })
              .on('confirmation', (result: any) => {
                if (result) {
                  resolve(result);
                }
                reject(false);
              })
              .catch((err: any) => {
                reject(false);
              });
          });
        });
      });
    });
  }

  // Add record to IPFS and return the IPFS hash
  async addRecord(data: any) {
    let IPFSHash = await (
      await this.ipfs.add(Buffer.from(JSON.stringify(data)))
    ).path;
    return IPFSHash;
  }
}
