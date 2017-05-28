import { Injectable } from '@angular/core';
import { RangeEnum } from '../domain/rangeEnum'
import { Reading } from '../domain/reading'
import { Storage } from '@ionic/storage';
import { ChartsPage } from '../pages/charts/charts';

import * as moment from 'moment';

@Injectable()
export class PwcModel {

  private range = RangeEnum.WEEK;
  private target: Reading = null
  private readings: Array<Reading> = [];

  constructor(private storage: Storage) { }

  /* === Ranges ====================================== */

  public setRange(r: RangeEnum) {
    this.range = r
    if (this.range == null) {
      this.range = RangeEnum.WEEK
    }
    this.storage.set("range", this.range);
  }

  public getRange() {
    return this.range
  }

  public getRangeAsString() {
    switch (this.range) {
      case 0: { return "Last week" }
      case 1: { return "Last month" }
      case 2: { return "Last year" }
      default: { return "Unknown" }
    }
  }

  getRangeAsString2() {
    switch (this.range) {
      case 0: { return "Last 7 days"; }
      case 1: { return "Last 30 days"; }
      case 2: { return "Last 365 days"; }
      default: { return "Unknown"; }
    }
  }

  /* === Readings ====================================== */

  public setReadings(readings: Array<Reading>) {
    this.readings = readings
    if (this.readings == null) {
      this.readings = [];
    }
    console.log("currentReadings: ", this.readings)
  }

  public getReadings() {
    return this.readings
  }

  public addReading(reading: Reading) {
    console.log("adding Reading ", reading)
    this.readings.push(reading);
    this.readings.sort((r1, r2) => (r1.date.localeCompare(r2.date)));
    this.storage.set("readings", this.readings);
    console.log("currentReadings: ", this.readings)
  }

  public deleteReading(reading: Reading) {
    for (var i = 0; i < this.readings.length; i++) {
      if (this.readings[i] == reading) {
        this.readings.splice(i, 1);
      }
    }
    this.storage.set("readings", this.readings);
  }

  public getLatestReading() {
    if (this.readings.length > 0) {
      return this.readings[this.readings.length - 1]
    }
    return null;
  }

  public getAverageWeight() {
    if (this.readings.length == 0) {
      return 0;
    }
    var sum = this.readings.map(reading => reading.weight).reduce((a1,a2) => a1+a2,0)
    return sum / this.readings.length
  }

}