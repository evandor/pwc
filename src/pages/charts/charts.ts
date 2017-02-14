import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Reading } from '../../domain/reading';

import * as moment from 'moment';

@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html'
})
export class ChartsPage {

  private readings: Array<Reading> = new Array();

  private weightData = [80,81];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  private lineChartData: Array<any> = [{
    data: this.weightData,
    label: 'kg'
  }];

  newDate(days) {
    return moment().add(days, 'd');
  }

  public lineChartLabels: Array<any> = [this.newDate(-1),this.newDate(1)];

  constructor(public navCtrl: NavController, private storage: Storage) {
    storage.get('readings').then((result) => {
      for (let reading of result) {
        console.log("Reading.weight: ",reading.weight);
        this.weightData.push(Number(reading.weight));
        this.lineChartLabels.push(moment(reading.date));
      }
      console.log("Weight", this.weightData);
      console.log("labels", this.lineChartLabels);
      this.refresh();
    });
  }

  getData():Array<any> {
    console.log("getting data...", this.lineChartData);
    return this.lineChartData
  }

  public refresh():void {
    // hmm... how to refresh without making a copy?
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = this.lineChartData[i].data[j];//Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  public lineChartOptions: any = {
    responsive: false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
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
  };
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

}
