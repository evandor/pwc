import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Reading } from '../../domain/reading';
import { ChartsPage } from '../charts/charts';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddPage {

  reading: Reading = new Reading();
  readings: Array<Reading> = new Array();
  addWeightFormGroup: FormGroup;
  weight: any;
  

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public storage: Storage) {

    this.addWeightFormGroup = this.formBuilder.group({
      date: ['', Validators.required],
      weight: ['', Validators.required]
    });

    storage.get('readings').then((result) => {
      if (result == null) {
        storage.set("readings", new Array());
      }
    });

    this.addWeightFormGroup.controls['date'].setValue(new Date().toISOString());
    
  }

  saveWeight() {
    this.storage.get("readings").then((readings) => {
      this.reading.weight = this.addWeightFormGroup.value.weight;
      this.reading.date = this.addWeightFormGroup.value.date;
      readings.push(this.reading);
      readings.sort((r1, r2) => (r1.date.localeCompare(r2.date)));
      this.storage.set("readings", readings).then(() => {this.navCtrl.push(ChartsPage)});
    });
  }
 

}
