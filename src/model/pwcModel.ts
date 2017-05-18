import { Injectable } from '@angular/core';
import { RangeEnum } from '../domain/rangeEnum'
import { Reading } from '../domain/reading'
import { Storage } from '@ionic/storage';

import * as moment from 'moment';

@Injectable()
export class PwcModel {

  private range = RangeEnum.WEEK;
  private readings: Array<Reading> = [];

  constructor(private storage: Storage) { }

  public setRange(r: RangeEnum) {
    console.log("setting range: ", r)
    this.range = r
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

  public setReadings(readings: Array<Reading>) {
    console.log("setting readings: ", readings)
    this.readings = readings
  }

  public getReadings() {
    return this.readings
  }

  public addReadingIfNew(reading: Reading) {
    var collisionIndex = this.getCollisionIndex(reading)
    if (collisionIndex >= 0) {
      return collisionIndex
    }
    this.addReading(reading)
    return -1
  }

  public addReadingAndOverwrite(reading: Reading) {
    var collisionIndex = this.getCollisionIndex(reading)
    if (collisionIndex >= 0) {
      this.readings.splice(collisionIndex, 1, reading);
    }
    this.addReading(reading)
  }

  private addReading(reading: Reading) {
    this.readings.push(reading);
    this.readings.sort((r1, r2) => (r1.date.localeCompare(r2.date)));
    this.storage.set("readings", this.readings);//.then(() => { this.navCtrl.push(ChartsPage) });
  }

  private getCollisionIndex(reading: Reading) {
    for (var i = 0; i < this.readings.length; i++) {
      if (moment(this.readings[i].date).format('YYYY MM DD') == moment(reading.date).format('YYYY MM DD')) {
        return i;
      }
    }
    return -1
  }

  getRangeAsString2() {
      
    switch (this.range) {
      case 0: {
        return "Last 7 days";
      }
      case 1: {
        return "Last 30 days";
      }
      case 2: {
        return "Last 365 days";
      }
      default: {
        return "Unknown";
      }
    }

  }


}