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
import { HeaderComponent } from "./components/header/header.component";
import { ContainerComponent } from './components/container/container.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ActivationCardComponent } from './components/activation-card/activation-card.component';
import { MatTooltipModule } from "@angular/material/tooltip";

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
  MatTooltipModule
];

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    LoginCardComponent,
    SignUpCardComponent,
    PageNotFoundComponent,
    HeaderComponent,
    ContainerComponent,
    MyProfileComponent,
    ShoppingCartComponent,
    ActivationCardComponent,
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
