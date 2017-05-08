import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';

@Component({
  selector: 'page-range',
  templateUrl: 'range.html'
})
export class RangePage {

  rangeSelected: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertController: AlertController) {}

  showRange() {
    console.log(this.rangeSelected);
    let alert = this.alertController.create({
      title: 'Here comes the range ' + this.rangeSelected + '!',
      buttons: ['OK']
    });
    alert.present();
  }


}
