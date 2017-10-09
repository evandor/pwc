import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import {AcknowledgementsPage} from '../acknowledgements/acknowledgements';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  openAboutPage(){
    this.navCtrl.push(AboutPage);
  }

  openAcknowledgementsPage(){
    this.navCtrl.push(AcknowledgementsPage);
  }

}
