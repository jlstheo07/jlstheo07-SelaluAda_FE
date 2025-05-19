import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import Swal from 'sweetalert2';
import { SharedModule } from "../../shared.module";
import { IconModule } from "../shared/icon/icon.module";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-branches',
    templateUrl: './branches.html',
    standalone: true,
    imports: [SharedModule, IconModule, CommonModule],
})
export class BranchesComponent {
    constructor(private fb: FormBuilder) {}

    @ViewChild('addProvinceModal') addProvinceModal!: NgxCustomModalComponent;
    @ViewChild('addBranchModal') addBranchModal!: NgxCustomModalComponent;

    searchProvince = '';
    params!: FormGroup;
    paramsBranch!: FormGroup;

    provinceList: any[] = [
        { id: 1, name: 'DKI Jakarta', branch: 'Jawa' },
        { id: 2, name: 'Jawa Barat', branch: 'Jawa' },
        { id: 3, name: 'Jawa Tengah', branch: 'Jawa' },
        { id: 4, name: 'DI Yogyakarta', branch: 'Jawa' },
        { id: 5, name: 'Jawa Timur', branch: 'Jawa' },
        { id: 6, name: 'Banten', branch: 'Jawa' },
        
        { id: 7, name: 'Aceh', branch: 'Sumatra' },
        { id: 8, name: 'Sumatera Utara', branch: 'Sumatra' },
        { id: 9, name: 'Sumatera Barat', branch: 'Sumatra' },
        { id: 10, name: 'Riau', branch: 'Sumatra' },
        { id: 11, name: 'Kepulauan Riau', branch: 'Sumatra' },
        { id: 12, name: 'Jambi', branch: 'Sumatra' },
        { id: 13, name: 'Sumatera Selatan', branch: 'Sumatra' },
        { id: 14, name: 'Bengkulu', branch: 'Sumatra' },
        { id: 15, name: 'Lampung', branch: 'Sumatra' },
        { id: 16, name: 'Bangka Belitung', branch: 'Sumatra' },
        
        { id: 17, name: 'Kalimantan Barat', branch: 'Kalimantan dan Nusa Tenggara' },
        { id: 18, name: 'Kalimantan Tengah', branch: 'Kalimantan dan Nusa Tenggara' },
        { id: 19, name: 'Kalimantan Selatan', branch: 'Kalimantan dan Nusa Tenggara' },
        { id: 20, name: 'Kalimantan Timur', branch: 'Kalimantan dan Nusa Tenggara' },
        { id: 21, name: 'Kalimantan Utara', branch: 'Kalimantan dan Nusa Tenggara' },
        { id: 22, name: 'Nusa Tenggara Barat', branch: 'Kalimantan dan Nusa Tenggara' },
        { id: 23, name: 'Nusa Tenggara Timur', branch: 'Kalimantan dan Nusa Tenggara' },
        
        { id: 24, name: 'Sulawesi Utara', branch: 'Sulawesi dan Papua' },
        { id: 25, name: 'Gorontalo', branch: 'Sulawesi dan Papua' },
        { id: 26, name: 'Sulawesi Tengah', branch: 'Sulawesi dan Papua' },
        { id: 27, name: 'Sulawesi Barat', branch: 'Sulawesi dan Papua' },
        { id: 28, name: 'Sulawesi Selatan', branch: 'Sulawesi dan Papua' },
        { id: 29, name: 'Sulawesi Tenggara', branch: 'Sulawesi dan Papua' },
        { id: 30, name: 'Papua', branch: 'Sulawesi dan Papua' },
        { id: 31, name: 'Papua Barat', branch: 'Sulawesi dan Papua' },
        { id: 32, name: 'Papua Tengah', branch: 'Sulawesi dan Papua' },
        { id: 33, name: 'Papua Pegunungan', branch: 'Sulawesi dan Papua' },
        { id: 34, name: 'Papua Selatan', branch: 'Sulawesi dan Papua' },
        { id: 35, name: 'Papua Barat Daya', branch: 'Sulawesi dan Papua' },
        
        
    ];

    branchList: string[] = ['Jawa', 'Sumatra', 'Kalimantan dan Nusa Tenggara', 'Sulawesi dan Papua'];
    filteredProvinceList: any[] = [];

    ngOnInit() {
        this.searchProvinces();
    }

    initProvinceForm() {
        this.params = this.fb.group({
            id: [0],
            name: ['', Validators.required],
            branch: ['', Validators.required],
        });
    }

    initBranchForm() {
        this.paramsBranch = this.fb.group({
            branchName: ['', Validators.required],
        });
    }

    searchProvinces() {
        const search = this.searchProvince.toLowerCase();
        this.filteredProvinceList = this.provinceList.filter(p =>
            p.name.toLowerCase().includes(search)
        );
    }

    editProvince(province: any = null) {
        this.initProvinceForm();
        if (province) {
            this.params.patchValue({
                id: province.id,
                name: province.name,
                branch: province.branch,
            });
        }
        this.addProvinceModal.open();
    }

    saveProvince() {
        if (this.params.invalid) {
            this.showMessage('Please complete the form.', 'error');
            return;
        }

        const form = this.params.value;

        if (form.id) {
            const province = this.provinceList.find(p => p.id === form.id);
            if (province) {
                province.name = form.name;
                province.branch = form.branch;
            }
        } else {
            const newId = this.provinceList.length
                ? Math.max(...this.provinceList.map(p => p.id)) + 1
                : 1;
            this.provinceList.unshift({
                id: newId,
                name: form.name,
                branch: form.branch,
            });
        }

        this.searchProvinces();
        this.showMessage('Province saved successfully.');
        this.addProvinceModal.close();
    }

    deleteProvince(province: any) {
        this.provinceList = this.provinceList.filter(p => p.id !== province.id);
        this.searchProvinces();
        this.showMessage('Province deleted successfully.');
    }

    addBranch() {
        this.initBranchForm();
        this.addBranchModal.open();
    }

    saveBranch() {
        if (this.paramsBranch.invalid) {
            this.showMessage('Please input branch name.', 'error');
            return;
        }

        const newBranch = this.paramsBranch.value.branchName.trim();
        if (!this.branchList.includes(newBranch)) {
            this.branchList.push(newBranch);
            this.showMessage('Branch added successfully.');
        } else {
            this.showMessage('Branch already exists.', 'error');
        }
        this.addBranchModal.close();
    }

    deleteBranch(branch: string) {
        this.branchList = this.branchList.filter(b => b !== branch);

        // Remove deleted branch from provinces
        this.provinceList.forEach(province => {
            if (province.branch === branch) {
                province.branch = '';
            }
        });

        this.showMessage('Branch deleted successfully.');
    }

    showMessage(message: string, type: 'success' | 'error' = 'success') {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: message,
            padding: '10px 20px',
        });
    }
}
