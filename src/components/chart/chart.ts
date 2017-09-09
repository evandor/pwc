import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Entry } from '../../domain/entry';
import { Observable } from 'rxjs/Rx';
import { BaseChartDirective } from 'ng2-charts';
import { AddPage } from '../../pages/add/add';
import { GoalPage } from '../../pages/goal/goal';
import { EntriesPage } from '../../pages/entries/entries';
import { RangePage } from '../../pages/range/range';
import { Model } from '../../domain/model';
import moment from 'moment';

@Component({
  selector: 'chart',
  templateUrl: 'chart.html'
})
export class ChartComponent implements OnInit {

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
  private latestReading: Entry = null;
  private averageWeight = 0;

  private lineChartData: Array<any> = [
    { data: new Array(), label: 'IST' },
    { data: new Array(), label: 'SOLL' }
  ];

  constructor(public navCtrl: NavController,
    private storage: Storage,
    private model: Model) {

    this.startDate = moment().add(-7, 'd');
    this.range = "week";
  }

  ngOnInit() { }

  ionViewWillEnter() {
    console.log("charts.ts: reading model data...")
    this.setChartData(this.model.getEntries())
    console.log("charts.ts: ", this.model.getEntries())
    console.log("onInit charts: " + this.model.getRange());
    this.setRange("year");
    this.currentRange = this.model.getRangeAsString();
    this.latestReading = this.model.getLatestEntry();
    this.averageWeight = this.model.getAverageWeight();
  }

  getData(): Array<any> {
    console.log("Getting data: ", this.lineChartData)
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

  private setChartData(result: Array<Entry>) { //, targetValue: Reading) {
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
    this.navCtrl.push(EntriesPage);
  }

  openTargetPage() {
    this.navCtrl.push(GoalPage);
  }

  openRangePage() {
    this.navCtrl.push(RangePage);
  }

  setRange(range: string) {
    this.setStartDate(range);
  }

}
