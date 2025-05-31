import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { slideDownUp } from '../shared/animations';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],

})
export class SidebarComponent {
    active = false;
    store: any;
    activeDropdown: string[] = [];
    parentDropdown: string = '';
    role: string | null = null;
    
    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private authService: AuthService,
    ) {
        this.initStore();
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    ngOnInit() {
        this.role = this.authService.getRole();
        console.log('Sidebar role:', this.role);
        this.setActiveDropdown();
    }

    hasAccess(allowedRoles: string[]): boolean {
        return this.role !== null && allowedRoles.includes(this.role);
    }

    setActiveDropdown() {
        const selector = document.querySelector('.sidebar ul a[routerLink="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }

    toggleMobileMenu() {
        if (window.innerWidth < 1024) {
            this.storeData.dispatch({ type: 'toggleSidebar' });
        }
    }

    toggleAccordion(name: string, parent?: string) {
        if (this.activeDropdown.includes(name)) {
            this.activeDropdown = this.activeDropdown.filter((d) => d !== name);
        } else {
            this.activeDropdown.push(name);
        }
    }
}
