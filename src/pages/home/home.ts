import { NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Entry } from '../../domain/entry';
import { AddPage } from '../add/add';
import { GoalPage } from '../goal/goal';
import { Goal } from '../../domain/goal';
import { EntriesPage } from '../entries/entries';
import { RangePage } from '../range/range';
import { ChartComponent } from '../../components/chart/chart';
import { Model } from '../../domain/model';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private latestEntry: Entry = null;
  private averageWeight = 0;
  private currentGoal: Goal = null;
  private currentRange:String="week";

  constructor(
    public navCtrl: NavController,
    public model: Model, 
    private storage: Storage) {
    storage.get('goal').then((goal) => {
      model.initGoalFromStorage(goal);
      this.currentGoal = goal;
    })
    storage.get('entries').then((entries) => {
      model.initEntriesFromStorage(entries);
      this.latestEntry = this.model.getLatestEntry();
      this.averageWeight = this.model.getAverageWeight();
    });
    storage.get('range').then((range) => {
        model.initRangeFromStorage(range);
        this.currentRange=this.model.getRangeAsString();
    }); 
    this.averageWeight=model.getAverageWeight();
  }

  //refreshes data when returning by pop() from another page
  ionViewWillEnter(){
    this.currentRange =this.model.getRangeAsString();
    this.currentGoal = this.model.getGoal();
    this.latestEntry = this.model.getLatestEntry();
    this.averageWeight = this.model.getAverageWeight();
  }

  openAddPage() {
    this.navCtrl.push(AddPage);
  }

  openEntriesPage() {
    this.navCtrl.push(EntriesPage);
  }

  openGoalPage() {
    this.navCtrl.push(GoalPage);
  }

  openRangePage() {
    this.navCtrl.push(RangePage);
  }

  noSavedGoal() {
    return this.currentGoal == null;
  }

  noEntry() {
    return this.latestEntry == null;
  }


}







