import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { ApiService } from '../app/apiService';

import { QRScanner } from '@ionic-native/qr-scanner';
import { HttpModule } from '@angular/http';

import { ExternalLoginViewModel } from '../app/externalLoginViewModel';

// import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ZBar, ZBarOptions } from '@ionic-native/zbar';

import { AssignDevicePage } from '../pages/assign-device/assign-device';
import { SelectStandPage } from '../pages/select-stand/select-stand';
import { ScanDevicePage } from '../pages/scan-device/scan-device';
import { TransactionsPage } from '../pages/transactions/transactions';
import { EventsListPage } from '../pages/events-list/events-list';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AssignDevicePage,
    SelectStandPage,
    ScanDevicePage,
    TransactionsPage,
    EventsListPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AssignDevicePage,
    SelectStandPage,
    ScanDevicePage,
    TransactionsPage,
    EventsListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    ApiService,
    ZBar,
    QRScanner,
    InAppBrowser,
    ExternalLoginViewModel,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
