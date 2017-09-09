import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Model } from '../../domain/model';
import { Goal } from '../../domain/goal';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-goal',
  templateUrl: 'goal.html',
})
export class GoalPage {

  addGoalFormGroup: FormGroup;
  @ViewChild('inputGoal') myInput ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private model: Model) {

      this.addGoalFormGroup = this.formBuilder.group({
        date: [new Date().toISOString(), Validators.required],
        targetWeight: ['', Validators.required]
      });
  }

  ionViewLoaded() {
    setTimeout(() => {
      this.myInput.setFocus();
    },150);

 }

  saveGoal(){
    var goal = new Goal();
    goal.targetWeight = this.addGoalFormGroup.value.targetWeight;
    goal.date = this.addGoalFormGroup.value.date;
    this.model.addGoal(goal);
    this.navCtrl.push(HomePage);

  }

}



