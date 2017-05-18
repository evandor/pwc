import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Reading } from '../../domain/reading';
import { PwcModel } from '../../model/pwcModel';
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
    public alertCtrl: AlertController,
    private model: PwcModel) {

    this.addWeightFormGroup = this.formBuilder.group({
      date: [new Date().toISOString(), Validators.required],
      weight: ['', Validators.required]
    });

    storage.get('readings').then((result) => {
      if (result == null) {
        storage.set("readings", new Array());
      }
      document.getElementsByTagName("input")[0].focus();
    });

  }

  saveWeight() {
    //create new reading object
    this.reading.weight = this.addWeightFormGroup.value.weight;
    this.reading.date = this.addWeightFormGroup.value.date;

    var collisionIndex = this.model.addReadingIfNew(this.reading)
    if (collisionIndex >= 0) {
      this.showConfirm(collisionIndex);
    }
    this.navCtrl.push(ChartsPage)
  }

  showConfirm(index: number) {
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
            this.model.addReadingAndOverwrite(this.reading)
            this.navCtrl.push(ChartsPage)
          }
        }
      ]
    });
    confirm.present();
  }


}
