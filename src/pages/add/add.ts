import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Reading } from '../../domain/reading';
import { ChartsPage } from '../charts/charts';


@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddPage {
  
    addWeightFormGroup: FormGroup;
    reading:Reading= new Reading();
    readings: Array<Reading> = new Array();
  

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public storage: Storage,) {

    this.addWeightFormGroup = this.formBuilder.group({
      weight: ['', Validators.required],
      date: ['', Validators.required]
    });

    storage.get('readings').then((result) => {
      if (result == null) {
        storage.set("readings", this.readings);
      }
    });

  }

  saveWeight(){

    this.storage.get("readings").then((readings) => {
      this.reading.weight = this.addWeightFormGroup.value.weight; 
      this.reading.date = this.addWeightFormGroup.value.date;
      readings.push(this.reading);
      this.storage.set("readings", readings);
      this.navCtrl.push(ChartsPage);
  
    });
     
  }
    
}
