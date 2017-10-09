import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';




@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  termsClickedFlag: Boolean = false;
  privacyClickedFlag: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  changeTermsFlagValue(){
    if(this.termsClickedFlag==false){
      this.termsClickedFlag=true;
    }else{
      this.termsClickedFlag=false;
    }
  }
  termsClicked() {
    return this.termsClickedFlag;
  }

  changePrivacyFlagValue(){
    if(this.privacyClickedFlag==false){
      this.privacyClickedFlag=true;
    }else{
      this.privacyClickedFlag=false;
    }
  }
  privacyClicked() {
    return this.privacyClickedFlag;
  }

}
