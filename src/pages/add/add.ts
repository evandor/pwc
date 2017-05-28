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

  addWeightFormGroup: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private model: PwcModel) {

    this.addWeightFormGroup = this.formBuilder.group({
      date: [new Date().toISOString(), Validators.required],
      weight: ['', Validators.required]
    });
  }

  saveWeight() {
    var reading = new Reading();
    reading.weight = this.addWeightFormGroup.value.weight;
    reading.date = this.addWeightFormGroup.value.date;
    this.model.addReading(reading)
    this.navCtrl.push(ChartsPage)
  }
}
