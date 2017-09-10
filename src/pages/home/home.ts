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

  constructor(
    public navCtrl: NavController,
    public model: Model, 
    private storage: Storage) {
    this.latestEntry = this.model.getLatestEntry();
    this.averageWeight = this.model.getAverageWeight();
    this.storage.get('goal').then((goal) => {
      console.log("goal read from storage II...")
      model.setGoal(goal)
      this.currentGoal = goal;
    }) 
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


}







