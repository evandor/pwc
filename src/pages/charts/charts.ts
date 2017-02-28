import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Reading } from '../../domain/reading';
import { Observable } from 'rxjs/Rx';
import { BaseChartDirective } from 'ng2-charts';
import { AddPage } from '../add/add';
import { TargetPage } from '../target/target';
import { DataPage } from '../data/data';

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

  private startDate;

  private minWeight: number = 40;
  private maxWeight: number = 120;

  private lineChartData: Array<any> = [{
    data: new Array(),
    label: 'kg'
  }];



  constructor(
    public navCtrl: NavController, 
    private storage: Storage) {
    this.observable = Observable.fromPromise(storage.get('readings'));
    this.startDate = moment().add(-7, 'd');
  }

  ngOnInit() {
    var ctx = this;
    this.observable.subscribe((result) => {
      ctx.data = result;
      if (result == null) {
        return;
      }
      this.setStartDate('week')
      this.setChartData(result);
    });
  }

  getData(): Array<any> {
    return this.lineChartData
  }

  private setStartDate(range) {
    var rangeDaysBack = 7;
    switch (range) {
      case 'week': {
        this.startDate = moment().add(-7, 'd');
        break;
      }
      case 'month': {
        this.startDate = moment().add(-31, 'd');
        break;
      }
      case 'year': {
        this.startDate = moment().add(-365, 'd');
        break;
      }
      default: {
        this.startDate = moment().add(-7, 'd');
        break;
      }
    }
  }

  private setChartData(result: Array<Reading>) {
    this.lineChartData[0]['data'] = [];
    this.lineChartLabels = [];
    if (result.length > 0) {
      this.minWeight = Number(result[0].weight);
      this.maxWeight = Number(result[0].weight);
    }
    for (let reading of result) {
      var theWeight = Number(reading.weight);
      if (theWeight > this.maxWeight) {
        this.maxWeight = theWeight;
      }
      if (theWeight < this.minWeight) {
        this.minWeight = theWeight;
      }
      this.lineChartData[0]['data'].push(theWeight);
      this.lineChartLabels.push(moment(reading.date));
    }

    var padding = Math.round(0.01 * this.maxWeight);
    this.maxWeight = this.maxWeight + padding;
    this.minWeight = this.minWeight - padding;

    this.chartDirective.chart.update();
  }

  getLineChartOptions() {
    return {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            min: this.minWeight,
            max: this.maxWeight
          }
        }],
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
    this.navCtrl.push(DataPage);
  }

   openTargetPage(){
    this.navCtrl.push(TargetPage);
  }

  setRange(range: string) {
    var referenceDate = this.setStartDate(range);
    this.setStartDate(range);
    this.setChartData(this.data);
  }

}
