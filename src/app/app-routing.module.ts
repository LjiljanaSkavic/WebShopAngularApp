import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginCardComponent } from "./components/login-card/login-card.component";
import { SignUpCardComponent } from "./components/sign-up-card/sign-up-card.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { ActivationCardComponent } from "./components/activation-card/activation-card.component";
import { ProfilePageComponent } from "./components/profile-page/profile-page.component";
import { ContainerComponent } from "./components/container/container.component";


const routes: Routes = [
  {
    path: "",
    component: ContainerComponent
  },
  {
    path: "web-shop",
    component: ContainerComponent
  },
  {
    path: "profile-activation",
    component: ActivationCardComponent
  },
  {
    path: "profile-activation/:id",
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
    path: "profile-page",
    component: ProfilePageComponent
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
