import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PwcModel } from '../../model/pwcModel';
import { Reading } from '../../domain/reading';

@Component({
  selector: 'page-data',
  templateUrl: 'data.html'
})
export class DataPage {

  private readings: Array<Reading> = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private model: PwcModel) {
    this.readings = model.getReadings()
  }


  public noSavedData() {
    return this.readings.length == 0;
  }

  deleteAllData() {
    this.readings = [];

  }

  editEntries() {

  }

  removeItem(reading: Reading) {
    this.model.deleteReading(reading)
  }

}
