import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TargetPage } from '../pages/target/target';
import { AddPage } from '../pages/add/add';
import { ChartsPage } from '../pages/charts/charts';
import { DataPage } from '../pages/data/data';
import { RangePage } from '../pages/range/range';
import { TabsPage } from '../pages/tabs/tabs';
import { ChartsModule } from 'ng2-charts';
import { Storage } from '@ionic/storage';
import {TimestampPipe} from '../pipes/timestamp-pipe';
import {PwcModel} from '../model/pwcModel'

@NgModule({
  declarations: [
    MyApp,
    TargetPage,
    AddPage,
    ChartsPage,
    DataPage,
    RangePage,
    TabsPage,
    TimestampPipe
  ],
  imports: [
    ChartsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TargetPage,
    AddPage,
    ChartsPage,
    DataPage,
    RangePage,
    TabsPage
  ],
  providers: [
    PwcModel,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage
  ]
})
export class AppModule {}
