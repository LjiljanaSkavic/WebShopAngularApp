import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginCardComponent } from "./components/login-card/login-card.component";
import { SignUpCardComponent } from "./components/sign-up-card/sign-up-card.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";


const routes: Routes = [
  {
    path: "login",
    component: LoginCardComponent
  },
  {
    path: "sign-up",
    component: SignUpCardComponent
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
