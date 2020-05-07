import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule],
  exports: [CommonModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule],
})
export class CustomMaterialModule { }
