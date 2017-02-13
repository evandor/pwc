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

  public lineChartLegend: boolean = true;

  public lineChartType: string = 'line';

  public lineChartData: Array<any> = [{
    data: [80,82.3, 81.9],
    label: 'kg'
  }];

  newDate(days) {
    return moment().add(days, 'd');
  }

  public lineChartLabels: Array<any> = [this.newDate(-4), this.newDate(-3), this.newDate(20)];

  constructor(public navCtrl: NavController, private storage: Storage) {
    storage.get('readings').then((result) => {
      console.log("RESULT", result);
      for (let reading of result) {
        console.log("Reading: ",reading);
      }
      console.log("Labels", this.lineChartLabels);
    });
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
