import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PwcModel } from '../../model/pwcModel'
import { RangeEnum } from '../../domain/rangeEnum'

@Component({
  selector: 'page-range',
  templateUrl: 'range.html'
})

export class RangePage {

 availableRanges:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private model: PwcModel) {

      this.availableRanges= this.model.getRangeAsString();

  }

  setRange(i: RangeEnum) {
    this.model.setRange(i)
  }


}
