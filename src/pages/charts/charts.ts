import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Reading } from '../../domain/reading';
import { Observable } from 'rxjs/Rx';
import { BaseChartDirective } from 'ng2-charts';
import { AddPage } from '../add/add';

import * as moment from 'moment';

@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html'
})
export class ChartsPage implements OnInit {

  @ViewChild(BaseChartDirective)
  private chartDirective: BaseChartDirective;

  private lineChartLegend: boolean = true;
  private lineChartType: string = 'line';
  private lineChartLabels: Array<any> = [];
  private observable: any;

  private data: Array<Reading> = [];
  private minDate: String;

  private startDate;

  private lineChartData: Array<any> = [{
    data: new Array(),
    label: 'kg'
  }];

  newDate(days) {
    return moment().add(days, 'd');
  }

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.observable = Observable.fromPromise(storage.get('readings'));
    this.minDate = "2016-02-08";
    this.startDate = moment().add(-7, 'd');
  }

  ngOnInit() {
    var ctx = this;
    this.observable.subscribe((result) => {
      ctx.data = result;
      if (result == null) {
        return;
      }
      this.setChartData(result, this.getReferenceDate('week'));
    });
  }

  getData(): Array<any> {
    return this.lineChartData
  }

  private getReferenceDate(range): Date {
    var referenceDate = new Date();
    var rangeDaysBack = 7;
    switch (range) {
      case 'week': {
        referenceDate.setDate(referenceDate.getDate() - 7);
        this.startDate = moment().add(-7, 'd');
        return referenceDate;
      }
      case 'month': {
        referenceDate.setDate(referenceDate.getDate() - 31);
        this.startDate = moment().add(-31, 'd');
        return referenceDate;
      }
      case 'year': {
        referenceDate.setDate(referenceDate.getDate() - 365);
        this.startDate = moment().add(-365, 'd');
        return referenceDate;
      }
      default: {
        referenceDate.setDate(referenceDate.getDate() - 7);
        this.startDate = moment().add(-7, 'd');
        return referenceDate;
      }
    }
  }

  private setChartData(result: Array<Reading>, referenceDate: Date) {
    this.lineChartData[0]['data'] = [];
    this.lineChartLabels = [];
    for (let reading of result) {
      //if (moment(reading.date).isAfter(referenceDate)) {
        this.lineChartData[0]['data'].push(Number(reading.weight));
        this.lineChartLabels.push(moment(reading.date));
      //}
    }
    console.log("Data", this.lineChartData[0]);
    console.log("Labels", this.lineChartLabels);
    this.chartDirective.chart.update();
  }

  getLineChartOptions() {
    return {
      responsive: false,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            min: this.startDate.format("YYYY-MM-DD"),
            displayFormats: {
              'millisecond': 'MMM DD',
              'second': 'MMM DD',
              'minute': 'MMM DD',
              'hour': 'MMM DD',
              'day': 'MMM DD',
              'week': 'MMM DD',
              'month': 'MMM DD',
              'quarter': 'MMM DD',
              'year': 'MMM DD',
            }
          }
        }],
      },
    }
  }

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  openAddPage() {
    this.navCtrl.push(AddPage);
  }

  openDataPage() {
    console.log("ShowAllData clicked");
  }

  setRange(r: string) {
    console.log(r);
    var referenceDate = this.getReferenceDate(r);
    //this.minDate = moment(referenceDate).format("yyyy-MM-dd");
    console.log("MIN date", this.minDate);
    this.setChartData(this.data, referenceDate);
  }

}
