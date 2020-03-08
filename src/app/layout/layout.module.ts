import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatSidenavModule, MatToolbarModule
} from '@angular/material';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { TopnavComponent } from './topnav/topnav.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [LayoutComponent, TopnavComponent, SidebarComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    TranslateModule,
  ]
})
export class LayoutModule { }
