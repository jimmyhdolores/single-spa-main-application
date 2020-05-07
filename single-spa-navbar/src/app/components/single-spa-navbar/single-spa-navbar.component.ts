import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'navbar-single-spa-navbar',
  templateUrl: './single-spa-navbar.component.html',
  styleUrls: ['./single-spa-navbar.component.css']
})
export class SingleSpaNavbarComponent implements OnInit {

  headerDiv = true;
  constructor() { }

  ngOnInit(): void {
  }

  hideDiv() {
    this.headerDiv = false;
  }

  showDiv() {
    this.headerDiv = true;
  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
