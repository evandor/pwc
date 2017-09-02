import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Entry } from '../../domain/entry';
import { Model } from '../../domain/model';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  addWeightFormGroup: FormGroup;

  constructor(
    private navCtrl: NavController, 
    private formBuilder: FormBuilder,
    private model: Model) {

      this.addWeightFormGroup = this.formBuilder.group({
        date: [new Date().toISOString(), Validators.required],
        weight: ['', Validators.required]
      });
  }

  saveWeight() {
    var entry = new Entry();
    entry.weight = this.addWeightFormGroup.value.weight;
    entry.date = this.addWeightFormGroup.value.date;
    //this.model.addEntry(entry);
    this.navCtrl.push(HomePage);
  }

}
