import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Reading } from '../../domain/reading';
import { ChartsPage } from '../charts/charts';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';

import * as moment from 'moment';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddPage {

  reading: Reading = new Reading();
  //readings: Array<Reading> = new Array();
  addWeightFormGroup: FormGroup;
  weight: any;
  overwrite: any;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public storage: Storage,
    public alertCtrl: AlertController) {

    this.addWeightFormGroup = this.formBuilder.group({
      date: [new Date().toISOString(), Validators.required],
      weight: ['', Validators.required]
    });

    storage.get('readings').then((result) => {
      if (result == null) {
        storage.set("readings", new Array());
      }
    });

  }

  saveWeight() {
    //create new reading object
    this.reading.weight = this.addWeightFormGroup.value.weight;
    this.reading.date = this.addWeightFormGroup.value.date;

    //get already stored objects from storage
    this.storage.get("readings").then((result) => {

      var collisionIndex = null;

      //go through existing objects to check if entry for the entered date already exists
      for (var i = 0; i < result.length; i++) {
        //if entry already exists aks if entry should be replaced
        if (moment(result[i].date).format('YYYY MM DD') == moment(this.reading.date).format('YYYY MM DD')) {
          collisionIndex = i;
          break;
        }
      }

      console.log("Collision Index", collisionIndex);

      if (collisionIndex != null) {
        this.showConfirm(collisionIndex, result);
      } else {
        console.log("business as usual");
        result.push(this.reading);
        result.sort((r1, r2) => (r1.date.localeCompare(r2.date)));
        this.storage.set("readings", result).then(() => { this.navCtrl.push(ChartsPage) });
      }

    });
  }

  showConfirm(index: number, readings: Array<Reading>) {
    let confirm = this.alertCtrl.create({
      message: 'Do you wish to overwrite existing entry?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
            this.navCtrl.push(ChartsPage);
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            console.log("Reading", readings);
            var deletedItem = readings.splice(index, 1, this.reading);
            console.log("DEL: " + deletedItem);
            console.log("Reading", readings);
            this.storage.set("readings", readings).then(() => { this.navCtrl.push(ChartsPage) });
          }
        }
      ]
    });
    confirm.present();
  }


}
