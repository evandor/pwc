import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AddPage } from '../pages/add/add';
import { ChartsPage } from '../pages/charts/charts';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { ChartsModule } from 'ng2-charts';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    AddPage,
    ChartsPage,
    ProfilePage,
    TabsPage
  ],
  imports: [
    ChartsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    ChartsPage,
    ProfilePage,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage
  ]
})
export class AppModule {}
