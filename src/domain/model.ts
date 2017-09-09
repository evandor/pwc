import { Injectable } from '@angular/core';
import { RangeEnum } from '../domain/rangeEnum'
import { Entry } from '../domain/entry'
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { Goal } from '../domain/goal';

//import * as moment from 'moment';

@Injectable()
export class Model {

  private range = RangeEnum.WEEK;
  private goal: Goal = null;
  private entries: Array<Entry> = [];

  constructor(private storage: Storage) {
    this.entries.push(new Entry(80,new Date().toISOString()))
    this.entries.push(new Entry(82,new Date().toISOString()))
   }

  /* === Ranges ====================================== */

  public setRange(r: RangeEnum) {
    this.range = r
    if (this.range == null) {
      this.range = RangeEnum.WEEK
    }
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

  public setEntries(entries: Array<Entry>) {
    this.entries = entries;
    if (this.entries == null) {
      this.entries = [];
    }
    console.log("currentEntries: ", this.entries)
  }

  public getEntries() {
    return this.entries;
  }

  public addEntry(entry: Entry) {
    console.log("adding Entry ", entry)
    this.entries.push(entry);
    this.entries.sort((r1, r2) => (r1.date.localeCompare(r2.date)));
    this.storage.set("entries", this.entries);
    console.log("currentEntries: ", this.entries)
  }

  public deleteEntry(entry: Entry) {
    for (var i = 0; i < this.entries.length; i++) {
      if (this.entries[i] == entry) {
        this.entries.splice(i, 1);
      }
    }
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
    var sum = this.entries.map(entry => entry.weight).reduce((a1,a2) => a1+a2,0)
    return sum / this.entries.length
  }
/* === Goal ====================================== */
  //setting goal during initialization from storage
  public setGoal (g:Goal){  
    this.goal=g;
  }
  //adding a new goal
  public addGoal (myGoal:Goal){
    this.goal=myGoal;
    this.storage.set("goal", this.goal);
  }

  public getGoal(){
    return this.goal;
  }

 

}