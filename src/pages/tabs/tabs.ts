import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { AddPage } from '../add/add';
import { ChartsPage } from '../charts/charts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ChartsPage;
  tab2Root: any = AddPage;
  tab3Root: any = ProfilePage;

  constructor() {

  }
}
