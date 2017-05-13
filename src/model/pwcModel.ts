import { Injectable } from '@angular/core';
import { RangeEnum } from '../domain/rangeEnum'

@Injectable()
export class PwcModel {

  constructor() {
    console.log("this must happen only once...")
  }

  private range = RangeEnum.WEEK;

  setRange(r: RangeEnum) {
    this.range = r
    // TODO save in storage
  }

  getRange() {
    return this.range
  }

  

    getRangeAsString() {
      
    switch (this.range) {
      case 0: {
        return "week";
      }
      case 1: {
        return "month";
      }
      case 2: {
        return "year";
      }
      default: {
        return "Unknown";
      }
    }

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