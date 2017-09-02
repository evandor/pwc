import { NavController } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Entry } from '../../domain/entry';
import { AddPage } from '../add/add';
import { GoalPage } from '../goal/goal';
import { EntriesPage } from '../entries/entries';
import { RangePage } from '../range/range';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  constructor(public navCtrl: NavController) {
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


}







