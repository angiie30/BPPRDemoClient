import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: "users", component: UserComponent },
  { path: "users/:id", component: UserFormComponent },
  {
    path: "",
    redirectTo: "users",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "users",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
