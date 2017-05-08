import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {PwcModel} from '../../model/pwcModel'
import {RangeEnum} from '../../domain/rangeEnum'

@Component({
  selector: 'page-range',
  templateUrl: 'range.html'
})
export class RangePage {

  rangeSelected: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertController: AlertController, private model: PwcModel) {
    console.log(this.model.getRange())
  }

  setRange(i:RangeEnum) {
    this.model.setRange(i)
  }

  showRange() {
    console.log("Range Page", this.rangeSelected);
    let alert = this.alertController.create({
      title: 'Here comes the range ' + this.rangeSelected + '!',
      buttons: ['OK']
    });
    alert.present();
  }

}
