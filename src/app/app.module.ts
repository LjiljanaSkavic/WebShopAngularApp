import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HttpClientModule } from "@angular/common/http";
import { CountryService } from "./services/country.service";
import { LoginCardComponent } from './components/login-card/login-card.component';
import { SignUpCardComponent } from './components/sign-up-card/sign-up-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    LoginCardComponent,
    SignUpCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
