import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { RangeEnum } from '../../domain/rangeEnum';
import { Model } from '../../domain/model';

@Component({
  selector: 'page-range',
  templateUrl: 'range.html',
})
export class RangePage {

  availableRanges:any;

  constructor(
    public navCtrl: NavController, 
    private model: Model) {
      this.availableRanges= this.model.getRange();
      console.log("Available Ranges", this.availableRanges);
  }

  setRange(r: RangeEnum) {
    this.model.setRange(r);
    this.navCtrl.pop();
  }

}








  




