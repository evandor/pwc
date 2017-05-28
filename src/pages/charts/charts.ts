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
import { PwcModel } from '../../model/pwcModel';

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
  private startDate;
  private minWeight: number = 70;
  private maxWeight: number = 80;
  private range: String = "week";
  private currentRange: String;
  private latestReading: Reading = null;
  private averageWeight = 0;

  private lineChartData: Array<any> = [
    { data: new Array(), label: 'IST' },
    { data: new Array(), label: 'SOLL' }
  ];

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private model: PwcModel) {
    this.startDate = moment().add(-7, 'd');
    this.range = "week";
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log("charts.ts: reading model data...")
    this.setChartData(this.model.getReadings())
    console.log("charts.ts: ", this.model.getReadings())
    console.log("onInit charts: " + this.model.getRange());
    this.setRange("year");
    this.currentRange = this.model.getRangeAsString2();
    this.latestReading = this.model.getLatestReading();
    this.averageWeight = this.model.getAverageWeight();
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
      //backgroundColor: 'rgba(255, 102, 153,0.2)',
      borderColor: 'rgba(132,202,202,1)',
      borderWidth: 5,
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#999',
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

  openTargetPage() {
    this.navCtrl.push(TargetPage);
  }

  openRangePage() {
    this.navCtrl.push(RangePage);
  }

  setRange(range: string) {
    this.setStartDate(range);
  }



}
