import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Model } from '../domain/model';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    model: Model, 
    storage: Storage) {
      
    platform.ready().then(() => {

      

      console.log("in MyApp constructor...")
      storage.get('entries').then((entries) => {
        console.log("entries read from storage...")
        model.setEntries(entries);
        storage.get('range').then((range) => {
          console.log("range read from storage...")
          model.setRange(range);
          
          storage.get('goal').then((goal) => {
            console.log("goal read from storage...")
            model.setGoal(goal);
        
          statusBar.styleDefault();
          console.log("hiding splashscreen")
          splashScreen.hide();
        });

      });


      })
    });
  }
}

