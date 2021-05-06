import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoadingComponent } from "./loading/loading.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { BaseService } from "./base.service";

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [
    NavbarComponent,
    LoadingComponent
  ],
  exports: [
      NavbarComponent,
      LoadingComponent
  ],
  providers: [BaseService],
  entryComponents: [],
})
export class SharedModule {}