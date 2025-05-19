import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import Swal from 'sweetalert2';
import { SharedModule } from "../../shared.module";
import { IconModule } from "../shared/icon/icon.module";
import { CommonModule } from '@angular/common';

@Component({
    imports: [SharedModule, IconModule, CommonModule],
    templateUrl: './role-control.html',
    standalone: true,
    selector: 'app-role-feature',
})
export class RoleControlComponent {
    constructor(public fb: FormBuilder) {}

    @ViewChild('addRoleModal') addRoleModal!: NgxCustomModalComponent;
    @ViewChild('addFeatureModal') addFeatureModal!: NgxCustomModalComponent;

    displayType = 'list';
    searchRole = '';
    params!: FormGroup;
    paramsFeature!: FormGroup;

    roleList: any[] = [
        { id: 1, name: 'Customer', features: ['Apply'] },
        { id: 2, name: 'Marketing', features: ['Apply', 'Review'] },
        { id: 3, name: 'Branch Manager', features: ['Review', 'Approval'] },
        { id: 4, name: 'Back Office', features: ['Disbursement'] },
    ];

    featureList: string[] = ['Apply', 'Review', 'Approval', 'Disbursement'];
    filteredRoleList: any[] = [];

    ngOnInit() {
        this.searchRoles();
    }

    initRoleForm() {
        this.params = this.fb.group({
            id: [0],
            name: ['', Validators.required],
            features: [[]],
        });
    }

    initFeatureForm() {
        this.paramsFeature = this.fb.group({
            featureName: ['', Validators.required],
        });
    }

    searchRoles() {
        this.filteredRoleList = this.roleList.filter((r) =>
            r.name.toLowerCase().includes(this.searchRole.toLowerCase())
        );
    }

    editRole(role: any = null) {
        this.addRoleModal.open();
        this.initRoleForm();
        if (role) {
            this.params.setValue({
                id: role.id,
                name: role.name,
                features: role.features,
            });
        }
    }

    saveRole() {
        if (this.params.invalid) {
            this.showMessage('Please complete the form.', 'error');
            return;
        }

        const form = this.params.value;

        if (form.id) {
            let r = this.roleList.find((x) => x.id === form.id);
            if (r) {
                r.name = form.name;
                r.features = form.features;
            }
        } else {
            const newId = this.roleList.length
                ? Math.max(...this.roleList.map((r) => r.id)) + 1
                : 1;
            this.roleList.unshift({
                id: newId,
                name: form.name,
                features: form.features,
            });
        }

        this.searchRoles();
        this.showMessage('Role has been saved successfully.');
        this.addRoleModal.close();
    }

    deleteRole(role: any) {
        this.roleList = this.roleList.filter((r) => r.id !== role.id);
        this.searchRoles();
        this.showMessage('Role has been deleted successfully.');
    }

    addFeature() {
        this.addFeatureModal.open();
        this.initFeatureForm();
    }

    saveFeature() {
        if (this.paramsFeature.invalid) {
            this.showMessage('Please input feature name.', 'error');
            return;
        }

        const newFeature = this.paramsFeature.value.featureName.trim();
        if (!this.featureList.includes(newFeature)) {
            this.featureList.push(newFeature);
            this.showMessage('Feature added successfully.');
        } else {
            this.showMessage('Feature already exists.', 'error');
        }
        this.addFeatureModal.close();
    }

    deleteFeature(feature: string) {
        this.featureList = this.featureList.filter(f => f !== feature);
    
        // Hapus fitur ini dari semua role yang punya fitur tersebut
        this.roleList.forEach(role => {
            role.features = role.features.filter((f: string) => f !== feature);
        });
    
        this.showMessage('Feature deleted successfully.');
    }
    

    toggleFeatureSelection(feature: string) {
        const selectedFeatures = this.params.controls['features'].value || [];
        if (selectedFeatures.includes(feature)) {
            this.params.controls['features'].setValue(selectedFeatures.filter((f: string) => f !== feature));
        } else {
            this.params.controls['features'].setValue([...selectedFeatures, feature]);
        }
    }

    isFeatureSelected(feature: string): boolean {
        return this.params?.controls['features'].value?.includes(feature);
    }

    showMessage(msg = '', type = 'success') {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    }
}
