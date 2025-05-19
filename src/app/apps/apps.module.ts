import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// shared module
import { SharedModule } from 'src/shared.module';

import { ScrumboardComponent } from './scrumboard';
import { ContactsComponent } from './contacts'; //staff management
import { NotesComponent } from './notes';
import { TodolistComponent } from './todolist';
import { InvoicePreviewComponent } from './invoice/preview';
import { InvoiceAddComponent } from './invoice/add';
import { InvoiceEditComponent } from './invoice/edit';
import { CalendarComponent } from './calendar';
import { ChatComponent } from './chat';
import { MailboxComponent } from './mailbox';
import { InvoiceListComponent } from './invoice/list';
import { BranchesComponent } from './branches';
import { RoleControlComponent } from './role-control';
import { ReviewComponent } from './checker/review';
import { title } from 'process';
import { ApprovalComponent } from './checker/approval';
import { DisburseComponent } from './checker/disburse';
import { HistoryComponent } from './history_loan/history';
import { PlafondComponent } from './plafond';



const routes: Routes = [
    { path: 'apps/chat', component: ChatComponent, data: { title: 'Chat' } },
    { path: 'apps/mailbox', component: MailboxComponent, data: { title: 'Mailbox' } },
    { path: 'apps/scrumboard', component: ScrumboardComponent, data: { title: 'Scrumboard' } },
    { path: 'apps/contacts', component: ContactsComponent, data: { title: 'Contacts' } },
    { path: 'apps/notes', component: NotesComponent, data: { title: 'Notes' } },
    { path: 'apps/todolist', component: TodolistComponent, data: { title: 'Todolist' } },
    { path: 'apps/invoice/list', component: InvoiceListComponent, data: { title: 'Invoice List' } },
    { path: 'apps/invoice/preview', component: InvoicePreviewComponent, data: { title: 'Invoice Preview' } },
    { path: 'apps/invoice/add', component: InvoiceAddComponent, data: { title: 'Invoice Add' } },
    { path: 'apps/invoice/edit', component: InvoiceEditComponent, data: { title: 'Invoice Edit' } },
    { path: 'apps/calendar', component: CalendarComponent, data: { title: 'Calendar' } },
    { path: 'apps/branches', component: BranchesComponent,data: {title: 'Branch'}},
    { path: 'apps/role-control', component: RoleControlComponent, data: {title: 'Branch'}},
    { path: 'apps/checker/review', component: ReviewComponent, data: {title: 'Review'}},
    { path: 'apps/checker/approval', component: ApprovalComponent, data: {title: 'Approval'}},
    { path: 'apps/checker/Disburse', component: DisburseComponent, data: {title: 'Disburse'}},
    { path: 'apps/history_loan/history', component: HistoryComponent, data: {title: 'History'}},
    { path: 'apps/plafond', component: PlafondComponent, data: {title: 'Plafond'}},
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule.forRoot()],
    declarations: [
        ChatComponent,
        ScrumboardComponent,
        ContactsComponent,
        NotesComponent,
        TodolistComponent,
        InvoiceListComponent,
        InvoicePreviewComponent,
        InvoiceAddComponent,
        InvoiceEditComponent,
        CalendarComponent,
        MailboxComponent,
        ReviewComponent,
        ApprovalComponent,
        DisburseComponent,
        HistoryComponent,
        PlafondComponent,
    ],
})
export class AppsModule {}
