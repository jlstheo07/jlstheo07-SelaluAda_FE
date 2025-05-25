import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plafond',
  templateUrl: './plafond.html',
})
export class PlafondComponent implements OnInit {
  @ViewChild('addPlafondModal') addPlafondModal!: NgxCustomModalComponent;

  searchPlafond = '';
  plafondParams!: FormGroup;

  plafondList: any[] = [
    { id: 1, level: 'Topaz', maxLoan: 6000000, maxTenor: 12, maxInterest: 10 },
    { id: 2, level: 'Emerald', maxLoan: 15000000, maxTenor: 12, maxInterest: 8 },
    { id: 3, level: 'Sapphire', maxLoan: 30000000, maxTenor: 12, maxInterest: 6 },
    { id: 4, level: 'Ruby', maxLoan: 45000000, maxTenor: 12, maxInterest: 4 },
    { id: 5, level: 'Diamond', maxLoan: 60000000, maxTenor: 12, maxInterest: 2 },    
  ];
    
  filteredPlafondList: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initPlafondForm();
    this.searchPlafonds();
  }

  initPlafondForm() {
    this.plafondParams = this.fb.group({
      id: [0],
      level: ['', Validators.required],
      maxLoan: [0, [Validators.required, Validators.min(1)]],
      maxTenor: [0, [Validators.required, Validators.min(1)]],
      maxInterest: [0, [Validators.required, Validators.min(0)]],
    });
  }

  searchPlafonds() {
    const search = this.searchPlafond.toLowerCase();
    this.filteredPlafondList = this.plafondList.filter(p =>
      p.level.toLowerCase().includes(search)
    );
  }

  editPlafond(plafond: any = null) {
    this.initPlafondForm();
    if (plafond) {
      this.plafondParams.patchValue({
        id: plafond.id,
        level: plafond.level,
        maxLoan: plafond.maxLoan,
        maxTenor: plafond.maxTenor,
        maxInterest: plafond.maxInterest,
      });
    }
    this.addPlafondModal.open();
  }

  savePlafond() {
    if (this.plafondParams.invalid) {
      this.showMessage('Please complete the form correctly.', 'error');
      return;
    }

    const form = this.plafondParams.value;

    if (form.id) {
      // Update existing
      const plaf = this.plafondList.find(p => p.id === form.id);
      if (plaf) {
        plaf.level = form.level;
        plaf.maxLoan = form.maxLoan;
        plaf.maxTenor = form.maxTenor;
        plaf.maxInterest = form.maxInterest;
      }
    } else {
      // Add new
      const newId = this.plafondList.length
        ? Math.max(...this.plafondList.map(p => p.id)) + 1
        : 1;
      this.plafondList.unshift({
        id: newId,
        level: form.level,
        maxLoan: form.maxLoan,
        maxTenor: form.maxTenor,
        maxInterest: form.maxInterest,
      });
    }

    this.searchPlafonds();
    this.showMessage('Plafond saved successfully.');
    this.addPlafondModal.close();
  }

  deletePlafond(plafond: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete plafond level "${plafond.level}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        this.plafondList = this.plafondList.filter(p => p.id !== plafond.id);
        this.searchPlafonds();
        this.showMessage('Plafond deleted successfully.');
      }
    });
  }

  showMessage(message: string, type: 'success' | 'error' = 'success') {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      icon: type,
      title: message,
      padding: '10px 20px',
      customClass: { container: 'toast' },
    });
  }
}
