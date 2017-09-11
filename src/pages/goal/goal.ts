import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Model } from '../../domain/model';
import { Goal } from '../../domain/goal';


@Component({
  selector: 'page-goal',
  templateUrl: 'goal.html',
})
export class GoalPage {
  goal: Goal;
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
    this.goal = new Goal(this.addGoalFormGroup.value.targetWeight, this.addGoalFormGroup.value.date);
    this.model.setGoal(this.goal);
    this.navCtrl.pop();

  }

}



