import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Model } from '../../domain/model';
import { Entry } from '../../domain/entry';



@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html'
})
export class EntriesPage {

  private entries: Array<Entry> = [];
  private mode: String ="edit";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private model: Model) {
    
  }

  ionViewWillEnter(){
    this.entries = this.model.getEntries();
    this.mode = "edit";
  }

  noSavedEntries() {
    return this.entries.length == 0;
  }

  editMode(){
    return this.mode == "edit";
  }

  editEntries(){
    this.mode = "delete";
  }

  deleteEntry(entry: Entry) {
    this.model.deleteEntry(entry);
    this.entries = this.model.getEntries();
  }

  deleteAllEntries() {
    this.model.deleteAllEntries();
    this.entries = [];
  }

}






