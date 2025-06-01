import { Component } from '@angular/core';

@Component({
    templateUrl: './history.html',
})
export class HistoryComponent {
    constructor() {}
    search1 = '';
    search2 = '';
    datatable1Cols = [
        { field: 'id_loan', title: 'Loan ID' },
        { field: 'firstName', title: 'Name' },
        { field: 'branch', title: 'Branch' },
        { field: 'dob', title: 'Loan Date' },
        { field: 'email', title: 'Email' },
        { field: 'phone', title: 'Phone No.' },
        { field: 'status', title: 'Status' },
    ];

    rows = [
        {
            "id_loan": "0d2235ab-0154-4e76-bc99-25e1f3d5422b",
            "firstName": "Andi",
            "lastName": "Saputra",
            "branch": "Jawa",
            "dob": "2025-05-12",
            "email": "andi.saputra@gmail.com",
            "phone": "+6281234567890",
            "status": "REVIEW"
        },
        {
            "id_loan": "10a7a5d4-ef4e-4130-bb82-4dd4238670c9",
            "firstName": "Dewi",
            "lastName": "Lestari",
            "branch": "Sumatra",
            "dob": "2025-04-01",
            "email": "dewi.lestari@gmail.com",
            "phone": "+6281222233444",
            "status": "APPROVAL"
        },
        {
            "id_loan": "3be07c3f-d3b5-41e3-95ea-f12e135b5db5",
            "firstName": "Rudi",
            "lastName": "Hartono",
            "branch": "Kalimantan dan Nusa Tenggara",
            "dob": "2025-03-20",
            "email": "rudi.hartono@gmail.com",
            "phone": "+6281388888888",
            "status": "DISBURSE"
        },
        {
            "id_loan": "f2f34584-1b1f-4a68-98e4-3303155c6ad8",
            "firstName": "Siti",
            "lastName": "Aminah",
            "branch": "Sulawesi dan Papua",
            "dob": "2025-01-15",
            "email": "siti.aminah@gmail.com",
            "phone": "+6281324567891",
            "status": "REJECT"
        },
        {
            "id_loan": "e77dcd94-8f5f-4e9f-b2f6-c16f9ef6e0e7",
            "firstName": "Budi",
            "lastName": "Santoso",
            "branch": "Jawa",
            "dob": "2025-05-01",
            "email": "budi.santoso@gmail.com",
            "phone": "+6281398765432",
            "status": "COMPLETED"
        },
        {
            "id_loan": "216caa60-463b-40cd-9288-728edfe2308f",
            "firstName": "Lina",
            "lastName": "Kurniawati",
            "branch": "Sumatra",
            "dob": "2025-04-18",
            "email": "lina.kurniawati@gmail.com",
            "phone": "+6281112223334",
            "status": "REVIEW"
        },
        {
            "id_loan": "7c3a6476-c7ee-4562-a143-fdf008a96ec6",
            "firstName": "Hendra",
            "lastName": "Wijaya",
            "branch": "Kalimantan dan Nusa Tenggara",
            "dob": "2025-03-05",
            "email": "hendra.wijaya@gmail.com",
            "phone": "+6281231231231",
            "status": "DISBURSE"
        },
        {
            "id_loan": "26c99a43-f25e-4ab9-8e5e-40f77f3ffad2",
            "firstName": "Mega",
            "lastName": "Putri",
            "branch": "Sulawesi dan Papua",
            "dob": "2025-02-25",
            "email": "mega.putri@gmail.com",
            "phone": "+6281556677889",
            "status": "APPROVAL"
        },
        {
            "id_loan": "a8d0d87d-9c0e-44dc-809c-bc9e56d342ab",
            "firstName": "Fajar",
            "lastName": "Pratama",
            "branch": "Jawa",
            "dob": "2025-04-28",
            "email": "fajar.pratama@gmail.com",
            "phone": "+6281999999999",
            "status": "REVIEW"
        },
        {
            "id_loan": "62741d82-d51e-4d43-97b7-0109fe27a3f6",
            "firstName": "Dian",
            "lastName": "Puspita",
            "branch": "Sumatra",
            "dob": "2025-03-12",
            "email": "dian.puspita@gmail.com",
            "phone": "+6281333444555",
            "status": "REJECT"
        },
        {
            "id_loan": "4d6c4cb3-3a3d-4656-b2ea-6b1194d355dc",
            "firstName": "Yudi",
            "lastName": "Suharto",
            "branch": "Kalimantan dan Nusa Tenggara",
            "dob": "2025-05-22",
            "email": "yudi.suharto@gmail.com",
            "phone": "+6281778899001",
            "status": "DISBURSE"
        },
        {
            "id_loan": "9f6f95b1-f016-40b2-91b5-358f8a1fbe37",
            "firstName": "Indah",
            "lastName": "Sari",
            "branch": "Sulawesi dan Papua",
            "dob": "2025-01-30",
            "email": "indah.sari@gmail.com",
            "phone": "+6281000111222",
            "status": "APPROVAL"
        },
        {
            "id_loan": "75a623ef-8bbf-4b89-88b0-8e6d642007ab",
            "firstName": "Galih",
            "lastName": "Ramadhan",
            "branch": "Jawa",
            "dob": "2025-03-29",
            "email": "galih.ramadhan@gmail.com",
            "phone": "+6281445566778",
            "status": "COMPLETED"
        },
        {
            "id_loan": "607feab4-8d5b-44c4-bf37-7f73b9585828",
            "firstName": "Melati",
            "lastName": "Wijayanti",
            "branch": "Sumatra",
            "dob": "2025-04-15",
            "email": "melati.wijayanti@gmail.com",
            "phone": "+6281122233344",
            "status": "REVIEW"
        },
        {
            "id_loan": "39aaec92-18c4-40aa-b0c6-727937ad0a84",
            "firstName": "Rangga",
            "lastName": "Aditya",
            "branch": "Kalimantan dan Nusa Tenggara",
            "dob": "2025-02-14",
            "email": "rangga.aditya@gmail.com",
            "phone": "+6281239876543",
            "status": "REJECT"
        },
        {
            "id_loan": "f90b3df8-d24b-4ed0-a09d-dde5125d6dc4",
            "firstName": "Ayu",
            "lastName": "Permatasari",
            "branch": "Sulawesi dan Papua",
            "dob": "2025-05-15",
            "email": "ayu.permatasari@gmail.com",
            "phone": "+6281678901234",
            "status": "APPROVAL"
        },
        {
            "id_loan": "fc3cb5ef-cb65-4663-a04d-470b1a6c40ea",
            "firstName": "Reza",
            "lastName": "Maulana",
            "branch": "Jawa",
            "dob": "2025-04-07",
            "email": "reza.maulana@gmail.com",
            "phone": "+6281233211234",
            "status": "DISBURSE"
        },
        {
            "id_loan": "f4a0b3a9-8f36-409c-8dc3-9d67f09bd0ff",
            "firstName": "Fitri",
            "lastName": "Wulandari",
            "branch": "Sumatra",
            "dob": "2025-05-08",
            "email": "fitri.wulandari@gmail.com",
            "phone": "+6281554433221",
            "status": "COMPLETED"
        },
        {
            "id_loan": "4c39a0b0-6df5-4897-bbfa-c9ac23d1d364",
            "firstName": "Agus",
            "lastName": "Susanto",
            "branch": "Kalimantan dan Nusa Tenggara",
            "dob": "2025-01-03",
            "email": "agus.susanto@gmail.com",
            "phone": "+6281993322110",
            "status": "REVIEW"
        },
        {
            "id_loan": "b1fdf08d-30ff-4b42-91c1-9d8b43b34ff2",
            "firstName": "Tiara",
            "lastName": "Hapsari",
            "branch": "Sulawesi dan Papua",
            "dob": "2025-02-08",
            "email": "tiara.hapsari@gmail.com",
            "phone": "+6281443322111",
            "status": "REJECT"
        }
    ];

    ngOnInit() {
    this.rows = this.rows.map((row) => {
        const statusInfo = this.getStatusAndColor();
        return {
            ...row,
            status: statusInfo.status,
            statusColor: statusInfo.color,
        };
    });
    }

    getStatusAndColor() {
        const statusList = [
            { status: 'COMPLETE', color: 'success' },
            { status: 'DISBURSE', color: 'primary' },
            { status: 'APPROVAL', color: 'secondary' },
            { status: 'REVIEW', color: 'warning' },
            { status: 'REJECT', color: 'danger' },
        ];
        const random = Math.floor(Math.random() * statusList.length);
        return statusList[random];
    }


    formatDate(date: any) {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    }


}
