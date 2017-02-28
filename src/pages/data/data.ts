import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-data',
  templateUrl: 'data.html'
})
export class DataPage {

  private storedData: Array<any> = [];
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage) {

      storage.get('readings').then((result) => {
        this.storedData=result;
    });
    }

  
  public noSavedData() {
    return this.storedData.length == 0;
  }

  deleteAllData(){
    this.storedData=[];
    this.storage.set("readings", this.storedData);
    
  }

 removeItem(item){
   
   for(var i = 0; i < this.storedData.length; i++) {
      if(this.storedData[i] == item){
        this.storedData.splice(i, 1);
        this.storage.set("readings", this.storedData);
      }
 
    }
 }

}
