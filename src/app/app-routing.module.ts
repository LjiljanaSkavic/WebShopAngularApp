import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginCardComponent } from "./components/login-card/login-card.component";
import { SignUpCardComponent } from "./components/sign-up-card/sign-up-card.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { MyProfileComponent } from "./components/my-profile/my-profile.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { ActivationCardComponent } from "./components/activation-card/activation-card.component";
import { HeaderComponent } from "./components/header/header.component";


const routes: Routes = [
  {
    path: "",
    component: HeaderComponent
  },
  {
    path: "web-shop",
    component: HeaderComponent
  },
  {
    path: "profile-activation",
    component: ActivationCardComponent
  },
  {
    path: "login",
    component: LoginCardComponent
  },
  {
    path: "sign-up",
    component: SignUpCardComponent
  },
  {
    path: "my-profile",
    component: MyProfileComponent
  },
  {
    path: "shopping-cart",
    component: ShoppingCartComponent
  },
  {
    path: "**",
    pathMatch: 'full',
    component: PageNotFoundComponent

  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
