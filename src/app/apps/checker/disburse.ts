import { Component } from '@angular/core';

@Component({
    templateUrl: './disburse.html',
})
export class DisburseComponent {
    constructor() {}

    items: any = [];
    selectedFile = null;
    selectedCurrency = 'IDR - Indonesia Dollar Rupiah';
    tax = 0;
    discount = 0;
    shippingCharge = 0;
    paymentMethod = 'bank';

    params = {
        title: 'Multiguna',
        invoiceNo: '#0001',
        to: {
            name: 'Mira Setiawan',
            email: 'mirasetiawan@company.com',
            gender: 'wanita',
            address: 'Jl. Pasti Cepat A7/66',
            city: 'Jakarta Barat',
            province: 'DKI Jakarta',
            phone: '(128) 666 070',
            job: 'Pegawai Swasta',
        },
        invoiceDate: '',
        dueDate: '', // akan diisi saat init
        bankInfo: {
            no: '1234567890',
            name: 'Bank Central Asia',
            country: 'Indonesia',
            branch:'Jawa',
            plafond:'Topaz',
        },
        notes: 'Lengkap',
    };

    ngOnInit() {
        // Format tanggal ke yyyy-MM-dd
        const dt = new Date();
        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
        const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        const today = dt.getFullYear() + '-' + month + '-' + date;

        this.params.invoiceDate = today;
        this.params.dueDate = today;

        // Set item default
        this.items.push({
            id: 1,
            title: 'Platinum',
            description: 'Max Plafond, Max Bunga, Max Tenor',
            quantity: 1000000,
            amount: 5,
            isTax: false,
        });
    }

    addItem() {
        let maxId = 0;
        if (this.items.length) {
            maxId = this.items.reduce(
                (max: number, item: any) => (item.id > max ? item.id : max),
                this.items[0].id
            );
        }
        this.items.push({
            id: maxId + 1,
            title: '',
            description: '',
            rate: 0,
            quantity: 0,
            amount: 0,
        });
    }

    removeItem(item: any = null) {
        this.items = this.items.filter((d: any) => d.id !== item.id);
    }
}
