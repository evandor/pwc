import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Model } from '../../domain/model';
import { Entry } from '../../domain/entry';

/**
 * Generated class for the EntriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html'
})
export class EntriesPage {

  private entries: Array<Entry> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private model: Model) {
    this.entries = model.getEntries();
  }

  public noSavedEntries() {
    return this.entries.length == 0;
  }

  removeEntry(entry: Entry) {
    this.model.deleteEntry(entry);
  }

  deleteAllEntries() {
    this.entries = [];
  }

}






