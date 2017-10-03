import { Injectable } from '@angular/core';
import { RangeEnum } from '../domain/rangeEnum';
import { Entry } from '../domain/entry';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { Goal } from '../domain/goal';
import { Events } from 'ionic-angular';
import { PwcConstants} from '../pwcConstants'

//import * as moment from 'moment';

@Injectable()
export class Model {

  private range = RangeEnum.WEEK;
  private goal: Goal = new Goal(null, null);
  private entries: Array<Entry> = [];


  constructor(private storage: Storage, private events: Events) { }

  /* === Ranges ====================================== */

  public initRangeFromStorage(r: RangeEnum) {
    this.range = r;
    if (this.range == null) {
      this.range = RangeEnum.WEEK
    }
  }

  public setRange(r: RangeEnum) {
    this.range = r;
    this.storage.set("range", this.range);

  }

  public getRange() {
    return this.range;
  }

  getRangeAsString() {
    switch (this.range) {
      case 0: { return "Last 7 days"; }
      case 1: { return "Last 30 days"; }
      case 2: { return "Last 365 days"; }
      default: { return "Unknown"; }
    }
  }

  /* === Entries ====================================== */

  public initEntriesFromStorage(entries: Array<Entry>) {
    console.log("reading (init) entries: ", entries)
    this.entries = entries;
    if (this.entries == null) {
      this.entries = [];
    }
    this.events.publish(PwcConstants.modelEntriesInitializedEvent, Date.now())
  }

  public getEntries() {
    return this.entries;
  }

  public addEntry(entry: Entry) {
    this.entries.push(entry);
    this.entries.sort((r1, r2) => (r1.date.localeCompare(r2.date)));
    this.storage.set("entries", this.entries);
  }

  public deleteEntry(entry: Entry) {
    for (var i = 0; i < this.entries.length; i++) {
      if (this.entries[i] == entry) {
        this.entries.splice(i, 1);
      }
    }
    this.storage.set("entries", this.entries);
  }

  public deleteAllEntries() {
    this.entries = [];
    this.storage.set("entries", this.entries);
  }

  public getLatestEntry() {
    if (this.entries.length > 0) {
      return this.entries[this.entries.length - 1]
    }
    return null;
  }

  public getAverageWeight() {
    if (this.entries.length == 0) {
      return 0;
    }
    var sum = this.entries.map(entry => entry.weight).map(Number).reduce((a1, a2) => a1 + a2, 0);
    return sum / this.entries.length;
  }

  /* === Goal ====================================== */
  //setting goal during initialization from storage
  public initGoalFromStorage(g: Goal) {
      this.goal = g;
    
  }
  //adding a new goal
  public setGoal(myGoal: Goal) {
    this.goal = myGoal;
    this.storage.set("goal", this.goal);
  }

  public getGoal(): Goal {
    return this.goal;
  }


}