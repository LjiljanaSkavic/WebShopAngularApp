import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HttpClientModule } from "@angular/common/http";
import { CountryService } from "./services/country.service";
import { LoginCardComponent } from './components/login-card/login-card.component';
import { SignUpCardComponent } from './components/sign-up-card/sign-up-card.component';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppRoutingModule } from "./app-routing.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { ContainerComponent } from './components/container/container.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { ActivationCardComponent } from './components/activation-card/activation-card.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CommentComponent } from './components/comment/comment.component';
import { StoreComponent } from './components/store/store.component';
import { ManagePasswordComponent } from './components/manage-password/manage-password.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ProductPurchaseCardComponent } from './components/product-purchase-card/product-purchase-card.component';
import { ContactSupportModalComponent } from './components/contact-support-modal/contact-support-modal.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  AppRoutingModule,
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatTreeModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatDialogModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    LoginCardComponent,
    SignUpCardComponent,
    PageNotFoundComponent,
    ContainerComponent,
    ProfilePageComponent,
    PurchaseHistoryComponent,
    ActivationCardComponent,
    ProductDetailsComponent,
    CommentComponent,
    StoreComponent,
    ManagePasswordComponent,
    ConfirmationModalComponent,
    ProductPurchaseCardComponent,
    ContactSupportModalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MATERIAL_MODULES,
    AppRoutingModule,
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
