export interface StaffResponseDTO {
    employeeId: string;
    nip: string;
    namaCabang: string;
    username: string;
    email: string;
    nama_lengkap: string;
    role: string;
  }
  
  export interface RegisterStaffRequestDTO {
    nip: string;
    branchId: string;
    username: string;
    email: string;
    namaLengkap: string;
    password: string;
    roleId: string;
  }  

  export interface Branch {
    id: string;
    namaCabang: string;
  }
  
  export interface Role {
    id: string;
    nama: string;
  }