import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.html',
})
export class ApprovalComponent implements OnInit {
  rows: any[] = [];
  filteredRows: any[] = [];
  searchNamaCustomer: string = '';
  selectedPengajuan: any = null;
  catatanManager: string = '';

  ngOnInit(): void {
    this.rows = [
      {
        id: 1,
        namaCustomer: 'Mira Setiawan',
        amount: 2000000,
        tenor: '12 bulan',
        tanggalPengajuan: new Date(),
        status: 'Menunggu',
        catatanMarketing: 'Pengajuan awal, dokumen lengkap',
      },
      {
        id: 2,
        namaCustomer: 'Andi Pratama',
        amount: 5000000,
        tenor: '24 bulan',
        tanggalPengajuan: new Date(),
        status: 'Menunggu',
        catatanMarketing: 'Butuh konfirmasi alamat',
      },
      // Tambahkan data dummy lainnya jika diperlukan
    ];

    this.filteredRows = [...this.rows];
  }

  filterPengajuan(): void {
    const keyword = this.searchNamaCustomer.toLowerCase();
    this.filteredRows = this.rows.filter(item =>
      item.namaCustomer.toLowerCase().includes(keyword)
    );
  }

  openReviewModal(pengajuan: any): void {
    this.selectedPengajuan = { ...pengajuan };
    this.catatanManager = '';
    // Modal dibuka dari HTML via #modalReview reference
  }

  submitReview(disetujui: boolean): void {
    if (!this.selectedPengajuan) return;

    const statusBaru = disetujui ? 'Disetujui' : 'Ditolak';
    const index = this.rows.findIndex(r => r.id === this.selectedPengajuan.id);

    if (index > -1) {
      this.rows[index].status = statusBaru;
      this.rows[index].catatanManager = this.catatanManager || '-';
    }

    this.filteredRows = [...this.rows];
    this.selectedPengajuan = null;
    this.catatanManager = '';
    const modal = document.querySelector('#modalReview') as any;
    if (modal?.close) modal.close();
  }

  get reviewFields() {
    if (!this.selectedPengajuan) return [];
    return [
      { label: 'Nama Customer', value: this.selectedPengajuan.namaCustomer },
      { label: 'Jumlah Pinjaman', value: this.selectedPengajuan.amount },
      { label: 'Tenor', value: this.selectedPengajuan.tenor },
      { label: 'Tanggal Pengajuan', value: this.selectedPengajuan.tanggalPengajuan },
      { label: 'Catatan Marketing', value: this.selectedPengajuan.catatanMarketing },
      { label: 'Status', value: this.selectedPengajuan.status }
    ];
  }
}
