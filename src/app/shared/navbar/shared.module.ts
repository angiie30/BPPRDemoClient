import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar.component";
import { BaseService } from "../base.service";

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [
      NavbarComponent
  ],
  exports: [
      NavbarComponent
  ],
  providers: [BaseService],
  entryComponents: [],
})
export class SharedModule {}