import { Injectable } from '@angular/core';
import {RangeEnum} from '../domain/rangeEnum'

@Injectable()
export class PwcModel {

  constructor() {
    console.log("this must happen only once...")
  }
  
  private range = RangeEnum.WEEK

  setRange(r: RangeEnum) {
      this.range = r
      // TODO save in storage
  }

  getRange() {
    return this.range
  }

}