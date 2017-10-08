import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Entry } from '../../domain/entry';
import { AddPage } from '../add/add';
import { GoalPage } from '../goal/goal';
import { Goal } from '../../domain/goal';
import { EntriesPage } from '../entries/entries';
import { RangePage } from '../range/range';
import { SettingsPage } from '../settings/settings';
import { Model } from '../../domain/model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private latestEntry: Entry = null;
  private averageWeight = 0;
  private currentGoal: Goal = null;
  private currentRange = 0;

  constructor(
    public navCtrl: NavController,
    public model: Model,
    private storage: Storage) {
  }

  ngOnInit() {
    console.log("Within ngOnInit on HomePage");
    this.storage.get('goal').then((goal) => {
      this.model.initGoalFromStorage(goal);
      this.currentGoal = goal;
    })
    this.storage.get('entries').then((entries) => {
      this.model.initEntriesFromStorage(entries);
      this.latestEntry = this.model.getLatestEntry();
      this.averageWeight = this.model.getAverageWeight();
    });
    this.storage.get('range').then((range) => {
      this.model.initRangeFromStorage(range);
      this.currentRange = this.model.getRange();
    });
    this.averageWeight = this.model.getAverageWeight();
  }

  //refreshes data when returning by pop() from another page
  ionViewWillEnter() {

    console.log("In Home.ts, ionViewWillEnter");
    
    this.currentRange = this.model.getRange();
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

  openSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  noEntry() {
    return (this.latestEntry == null && this.currentGoal == null);
  }

  noWeightEntry(){
    return this.latestEntry == null;
  }

  noGoalEntry() {
    return this.currentGoal == null;
  }


}







