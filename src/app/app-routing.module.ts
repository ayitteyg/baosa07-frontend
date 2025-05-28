import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReceiptsDashboardComponent } from './pages/receipts-dashboard/receipts-dashboard.component';
import { ReceiptFormComponent } from './pages/receipt-form/receipt-form.component';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';
import { EventFormComponent } from './pages/event-form/event-form.component';
import { MemberDashboardComponent } from './pages/member-dashboard/member-dashboard.component';


const routes: Routes = [
  { path:'', component:LoginComponent },
  { path:'login', component:LoginComponent },
  { path:'members', component:MemberDashboardComponent },
  { path: 'member/receipts', component: ReceiptsDashboardComponent},
  {path: 'homepage', component: HomepageComponent },
  { path: 'receipts/new', component: ReceiptFormComponent },
  { path: 'payments/new', component: PaymentFormComponent },
  { path: 'event', component: EventFormComponent },
   { path: 'event/new', component: EventFormComponent },
  { path: 'payments/:id/edit', component: PaymentFormComponent },

  { path: '**',   component:ReceiptsDashboardComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
