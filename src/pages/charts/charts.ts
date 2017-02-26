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
  private range:String = "week";

  private lineChartData: Array<any> = [{
    data: new Array(),
    label: 'kg'
  }];

  newDate(days) {
    return moment().add(days, 'd');
  }

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.observable = Observable.fromPromise(storage.get('readings'));
  }

  ngOnInit() {
    this.observable.subscribe((result) => {
      if (result == null) {
        return;
      }
      for (let reading of result) {
        this.lineChartData[0]['data'].push(Number(reading.weight));
        this.lineChartLabels.push(moment(reading.date));
      }
      this.chartDirective.chart.update();
    });
  }

  getData(): Array<any> {
    return this.lineChartData
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

  openAddPage(){
    this.navCtrl.push(AddPage);
  }

  openDataPage(){
    console.log("ShowAllData clicked");
  }

}
