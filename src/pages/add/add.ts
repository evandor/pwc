import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddPage {
  
    myWeight:any;
    myDate:any;
    addWeightFormGroup: FormGroup;
  

  constructor(public navCtrl: NavController,private formBuilder: FormBuilder) {

    this.addWeightFormGroup = this.formBuilder.group({
      pwcWeight: ['', Validators.required],
      pwcDate: ['', Validators.required]
    });

  }

  saveWeight(){
     
      this.myWeight = this.addWeightFormGroup.value.pwcWeight; 
      this.myDate = this.addWeightFormGroup.value.pwcDate;
      document.getElementById("showWeight").innerHTML="Meine Eingabe lautet "+this.myWeight+" am "+this.myDate;
  }
    

      
  

}
