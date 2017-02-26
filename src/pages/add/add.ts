import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Reading } from '../../domain/reading';
import { ChartsPage } from '../charts/charts';


@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddPage {

  reading: Reading = new Reading();
  readings: Array<Reading> = new Array();
  date: string = new Date().toISOString();
  weight: any;

  constructor(
    public navCtrl: NavController,
    public storage: Storage) {

    storage.get('readings').then((result) => {
      if (result == null) {
        storage.set("readings", new Array());
      }
    });
  }

  saveWeight() {
    this.storage.get("readings").then((readings) => {
      console.log("Gewicht und Datum: " + this.weight + " " + this.date);
      this.reading.weight = this.weight;
      this.reading.date = this.date;
      readings.push(this.reading);
      readings.sort((r1, r2) => (r1.date.localeCompare(r2.date)));
      this.storage.set("readings", readings).then(() => {this.navCtrl.push(ChartsPage)});
    });
  }

}
