// angular import
import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';

// project import
import { NavigationItem } from '../navigation';
import { environment } from 'src/environments/environment';
import { SharedFacade } from '../../shared.facade';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent {
  // public props
  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;
  @Output() onNavCollapsedMob = new EventEmitter();
  navigation: any;
  windowWidth: number;

  // constructor
  constructor(
    public nav: NavigationItem,
    private location: Location,

    private sharedFacade: SharedFacade,
  ) {
    this.windowWidth = window.innerWidth;
    this.navigation = this.nav.get();
  }

  // public method
  navMob() {
    if (this.windowWidth < 992 && document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
      this.onNavCollapsedMob.emit();
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent.parentElement.parentElement;
      const last_parent = up_parent.parentElement;
      if (parent.classList.contains('pcoded-hasmenu')) {
        parent.classList.add('pcoded-trigger');
        parent.classList.add('active');
      } else if (up_parent.classList.contains('pcoded-hasmenu')) {
        up_parent.classList.add('pcoded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent.classList.contains('pcoded-hasmenu')) {
        last_parent.classList.add('pcoded-trigger');
        last_parent.classList.add('active');
      }
    }
  }

  checkPermission(permissions: string []) {
    let hasPermission = permissions.length === 0;
    for(let i = 0; i < permissions.length; i++) {
      let permTitle = permissions[i];
      if(this.sharedFacade.hasPermission(permTitle)) {
        hasPermission = true;
        break;
      }
    }

    return hasPermission;
  }
}
