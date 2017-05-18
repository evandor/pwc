import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Reading } from '../../domain/reading';
import { Observable } from 'rxjs/Rx';
import { BaseChartDirective } from 'ng2-charts';
import { AddPage } from '../add/add';
import { TargetPage } from '../target/target';
import { DataPage } from '../data/data';
import { RangePage } from '../range/range';
import { PwcModel} from '../../model/pwcModel';

import * as moment from 'moment';

@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html'
})
export class ChartsPage implements OnInit {

  @ViewChild(BaseChartDirective)
  private chartDirective: BaseChartDirective;

  private lineChartLegend: boolean = false;
  private lineChartType: string = 'line';
  private lineChartLabels: Array<any> = [];

  //private readings: Observable<Array<Reading>>;
  private target: Observable<Reading>;

 // private data: Array<Reading> = [];
  private targetData:Reading;

  private startDate;

  private minWeight: number = 70;
  private maxWeight: number = 80;

  private range: String = "week";
  private currentRange: String;

  private lineChartData: Array<any> = [
    { data: new Array(), label: 'IST' },
    { data: new Array(), label: 'SOLL' }
  ];

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private model: PwcModel) {
    //this.readings = Observable.fromPromise(storage.get('readings'));
    this.target = Observable.fromPromise(storage.get('target'));
    this.startDate = moment().add(-7, 'd');
    this.range = "week";
    
  }

  ngOnInit() {
    //this.data = 
    this.setChartData(this.model.getReadings())
    /*var ctx = this;
    this.readings.subscribe((result) => {
      ctx.data = result;
      if (result == null) {
        return;
      }
      this.setStartDate('week')
      //var innerCtx = ctx;
      this.target.subscribe((targetValue) => {
        ctx.targetData = targetValue;
        this.setChartData(result, targetValue)
      });
    });*/
  }

  ionViewWillEnter() {
    console.log("onInit charts: " + this.model.getRange());
    this.setRange("year");
    this.currentRange=this.model.getRangeAsString2();
  }

  getData(): Array<any> {
    return this.lineChartData
  }

  private setStartDate(range) {
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

  private setChartData(result: Array<Reading>) { //, targetValue: Reading) {
    this.lineChartData[0]['data'] = [];
    this.lineChartData[1]['data'] = [];
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

    /*if (targetValue != null && result.length > 0) {
      this.lineChartData[1]['data'] = [{
        x: moment(result[0].date),
        y: 79
      }, {
        x: moment(targetValue.date),
        y: 75
      }]
    }*/

    if (this.chartDirective.chart != null) {
      console.log("updating chart")
      this.chartDirective.chart.update();
    }
  }

  getLineChartOptions() {
    return {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            min: this.minWeight,
            max: this.maxWeight,
            stepSize: 2
          }
        }],
        xAxes: [{
          type: 'time',
          time: {
            min: this.startDate.format("YYYY-MM-DD"),
            unitStepSize: 12,
            displayFormats: {
              'millisecond': 'MMM DD [ms]',
              'second': 'MMM DD [s]',
              'minute': 'MMM DD [m]',
              'hour': 'MMM DD',
              'day': 'MMM DD',
              'week': 'MMM DD',
              'month': 'MMM DD [mo]',
              'quarter': 'MMM YYYY [q]',
              'year': 'MMM YYYY [y]',
            }
          }
        }],
      },
    }
  }

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255, 102, 153,0.2)',
      borderColor: 'rgba(255, 102, 153,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  openAddPage() {
    this.navCtrl.push(AddPage);
  }

  openDataPage() {
    this.navCtrl.push(DataPage);
  }

  openTargetPage() {
    this.navCtrl.push(TargetPage);
  }

  openRangePage(){
    this.navCtrl.push(RangePage);
  }

  setRange(range: string) {
    this.setStartDate(range);
    //this.setChartData(this.data)//, this.targetData);
  }



}
