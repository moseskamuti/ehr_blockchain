// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21;

import "./Roles.sol";

contract Contract {
    using Roles for Roles.Role;

    Roles.Role private admin;
    Roles.Role private doctor;
    Roles.Role private patient;

    struct Doctor {
        address id;
        string drHash;
    }

    struct Patient {
        address id;
        string patientHash;
    }

    mapping(address => Doctor) private Doctors;
    mapping(address => Patient) private Patients;

    address[] public DrIDs;
    address[] public PatientIDs;

    constructor() {
        admin.add(msg.sender);
    }

    // Admin functions
    function isAdmin() public view returns (bool) {
        return admin.has(msg.sender);
    }

    // Add doctor
    function addDrInfo(address dr_id, string memory _drInfo_hash) public {
        require(admin.has(msg.sender), "Only Admin Can Add Doctors");
        require(!doctor.has(dr_id), "Doctor Already Exists");

        Doctor storage drInfo = Doctors[dr_id];
        drInfo.id = dr_id;
        drInfo.drHash = _drInfo_hash;
        DrIDs.push(dr_id);

        doctor.add(dr_id);
    }

    function getAllDrs() public view returns (address[] memory) {
        return DrIDs;
    }

    function getDr(address _id) public view returns (string memory) {
        return Doctors[_id].drHash;
    }

    function isDr(address id) public view returns (bool) {
        return doctor.has(id);
    }

    // Add patient
    function addPatientInfo(address patient_id, string memory _patientInfo_hash) public {
        require(admin.has(msg.sender), "Only Admin Can Add Patients");
        require(!patient.has(patient_id), "Patient Already Exists");

        Patient storage patientInfo = Patients[patient_id];
        patientInfo.id = patient_id;
        patientInfo.patientHash = _patientInfo_hash;
        PatientIDs.push(patient_id);

        patient.add(patient_id);
    }

    function getAllPatients() public view returns (address[] memory) {
        return PatientIDs;
    }

    function getPatient(address _id) public view returns (string memory) {
        return Patients[_id].patientHash;
    }

    function isPatient(address id) public view returns (bool) {
        return patient.has(id);
    }
}
