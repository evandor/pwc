import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ChartsPage } from '../pages/charts/charts';
import { PwcModel } from '../model/pwcModel';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = ChartsPage;

  constructor(platform: Platform, model: PwcModel, storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      storage.get('readings').then((readings) => {
        model.setReadings(readings)
        storage.get('range').then((range) => {
          model.setRange(range)
          StatusBar.styleDefault();
          Splashscreen.hide();
        });
      })
    });
  }
}
