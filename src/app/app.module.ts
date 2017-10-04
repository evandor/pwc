import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { EntriesPage } from '../pages/entries/entries';
import { GoalPage } from '../pages/goal/goal';
import { RangePage } from '../pages/range/range';
import { TimestampPipe } from '../pipes/timestamp/timestamp';
import { Model } from '../domain/model'
import { IonicStorageModule } from '@ionic/storage'
import { ChartComponent } from '../components/chart/chart'
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    EntriesPage,
    GoalPage,
    RangePage,
    TimestampPipe,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      backButtonIcon: 'arrow-round-back'
     }),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    EntriesPage,
    GoalPage,
    RangePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Model,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
