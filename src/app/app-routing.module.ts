import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginCardComponent } from "./components/login-card/login-card.component";
import { SignUpCardComponent } from "./components/sign-up-card/sign-up-card.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { PurchaseHistoryComponent } from "./components/purchase-history/purchase-history.component";
import { ActivationCardComponent } from "./components/activation-card/activation-card.component";
import { ProfilePageComponent } from "./components/profile-page/profile-page.component";
import { ContainerComponent } from "./components/container/container.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { ManagePasswordComponent } from "./components/manage-password/manage-password.component";
import { StoreComponent } from "./components/store/store.component";


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
    path: "profile-page/:id",
    component: ProfilePageComponent
  },
  {
    path: "manage-password",
    component: ManagePasswordComponent
  },
  {
    path: "manage-password/:id",
    component: ManagePasswordComponent
  },
  {
    path: "store",
    component: StoreComponent
  },
  {
    path: "store/:id",
    component: StoreComponent
  },
  {
    path: "product-details",
    component: ProductDetailsComponent
  },
  {
    path: "product-details/:id",
    component: ProductDetailsComponent
  },
  {
    path: "purchase-history",
    component: PurchaseHistoryComponent
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
