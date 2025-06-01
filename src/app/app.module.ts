import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MemberDashboardComponent } from './pages/member-dashboard/member-dashboard.component';
import { ReceiptsDashboardComponent } from './pages/receipts-dashboard/receipts-dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { ReceiptFormComponent } from './pages/receipt-form/receipt-form.component';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';
import { PaymentListComponent } from './pages/payment-list/payment-list.component';
import { EventFormComponent } from './pages/event-form/event-form.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoverPageComponent } from './components/cover-page/cover-page.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { MemberFormComponent } from './pages/member-form/member-form.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomepageComponent,
    MemberDashboardComponent,
    ReceiptsDashboardComponent,
    ReceiptFormComponent,
    PaymentFormComponent,
    PaymentListComponent,
    EventFormComponent,
    SideBarComponent,
    CoverPageComponent,
    FinanceComponent,
    MemberFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,  // Required for forms
    CommonModule,
    FormsModule,
   
  ],


   providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
