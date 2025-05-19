import { Component } from '@angular/core';

@Component({
    templateUrl: './approval.html',
})
export class ApprovalComponent {
    constructor() {}
    items: any = [];
    selectedFile = null;
    params = {
        title: 'Multiguna',
        invoiceNo: '#0001',
        to: {
            name: 'Mira Setiawan',
            email: 'mirasetiawan@company.com',
            gender: 'wanita',
            address: 'Jl. Pasti Cepat A7/66',
            city: 'Jakarta Barat',
            province : 'DKI Jakarta',
            phone: '(128) 666 070',
            job: 'Pegawai Swasta',
        },

        invoiceDate: new Date().toString(),
        dueDate: '',
        bankInfo: {
            
            no: '1234567890',
            name: 'Bank Central Asia',
            country: 'Indonesia',
        },
        notes: 'Coll 5 saat November 2023',
    };

    selectedCurrency = 'IDR - Indonesia Dollar Rupiah';
    tax = 0;
    discount = 0;
    shippingCharge = 0;
    paymentMethod = 'bank';

    ngOnInit() {
        //set default data
        this.items.push(
            {
                id: 1,
                title: 'Platinum',
                description: 'Max Plafond, Max Bunga, Max Tenor',
                quantity: 2000000,
                amount: 10,
                isTax: false,
            },
        );

        let dt: Date = new Date();
        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
        let date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        this.params.invoiceDate = dt.getFullYear() + '-' + month + '-' + date;
        this.params.dueDate = dt.getFullYear() + '-' + month + '-' + date;
    }

    addItem() {
        let maxId = 0;
        if (this.items && this.items.length) {
            maxId = this.items.reduce((max: number, character: any) => (character.id > max ? character.id : max), this.items[0].id);
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
        this.items = this.items.filter((d: any) => d.id != item.id);
    }
}
