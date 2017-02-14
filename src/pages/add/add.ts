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
    myDate: String = new Date().toISOString();

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public storage: Storage) {

    this.addWeightFormGroup = this.formBuilder.group({
      kilogram: ['', Validators.required],
      gram: ['', Validators.required],
      date: ['', Validators.required]
    });

    storage.get('readings').then((result) => {
      if (result == null) {
        storage.set("readings", new Array());
      }
    });

     //this.addWeightFormGroup.controls['date'].setValue(new Date());

  }

  saveWeight(){

    this.storage.get("readings").then((readings) => {
      this.reading.weight = Number(this.addWeightFormGroup.value.kilogram+"."+this.addWeightFormGroup.value.gram);
      console.log(typeof(this.reading.weight));
      this.reading.date = this.addWeightFormGroup.value.date;
      readings.push(this.reading);

      readings.sort((r1,r2) => (r1.date.localeCompare(r2.date)));

      this.storage.set("readings", readings);
      this.navCtrl.push(ChartsPage);
  
    });
     
  }
    
}
