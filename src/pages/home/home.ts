import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ApiService } from '../../app/apiService';
// import { ExternalLoginViewModel } from '../../app/externalLoginViewModel';

import { ReplaySubject } from 'rxjs/Rx';

import { Http } from '@angular/http';

// import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AssignDevicePage } from '../../pages/assign-device/assign-device';
import { SelectStandPage } from '../../pages/select-stand/select-stand';
import { ScanDevicePage } from '../../pages/scan-device/scan-device';
import { TransactionsPage } from '../../pages/transactions/transactions';
import { EventsListPage } from '../../pages/events-list/events-list';
import { LoginPage } from '../../pages/login/login';

declare var window: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public baseUrl: string = "http://tokenmaster.azurewebsites.net";
  public Pages: Array<any> = [TransactionsPage, EventsListPage];

  public LoggedIn: boolean = false;

  private accessTokenSubject: ReplaySubject<any> = new ReplaySubject(1);
  public AccessToken: string;
  public loading = this.loadingCtrl.create({
    content: 'Loading...'
  });

  constructor(public navCtrl: NavController, public apiService: ApiService, public iab: InAppBrowser, public http: Http, public loadingCtrl: LoadingController) {
    if (localStorage.getItem('ApiToken') != null) {
      this.LoggedIn = true;
    }
  }

  LogOut() {
    localStorage.removeItem('ApiToken');
    this.navCtrl.push(LoginPage);
  }

  private getExternalLoginUrl() {
    // Return URL for an HTML app is just a local page. This page does NOT need to exist in the app.
    // var returnUrl = 'http:%2F%2Flocalhost%2Fcallback';
    // var returnUrl = 'http%3A%2F%2Flocalhost%3A16193%2F';
    // var returnUrl = 'http%3A%2F%2Ftokenmaster.azurewebsites.net%3A16193%2F';
    var returnUrl = 'http%3A%2F%2Ftokenmaster.azurewebsites.net';
    return this.http.get(this.baseUrl + '/api/Account/ExternalLogins?returnUrl=' + returnUrl + '&generateState=true')
      .map(response => {
        // In this instance I am just returning the URL for the Facebook login
        let data = response.json()[0];
        return data.Url;
      });
  }

  private getExternalLoginScreen = function (url) {
    let loginScreenSubject = new ReplaySubject(1);
    let browser = this.iab.create(this.baseUrl + url, '_blank', 'location=no,toolbar=no,hardwareback=no,EnableViewPortScale=yes');

    // When the browser is done loading, retrieve the access token and close the
    // InAppBrowser again.
    browser.on("loadstop")
      .subscribe((e) => {
        var accessToken = e.url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
        this.AccessToken = accessToken;
        localStorage.setItem("ApiToken", accessToken);
        this.LoggedIn = true;
        // alert(accessToken);
        browser.close();

        this.loading.dismiss();

        loginScreenSubject.next(accessToken);
        loginScreenSubject.complete();
      },
      err => {
        console.log("InAppBrowser Loadstop Event Error: " + err);
        this.loading.dismiss();
      });

    return loginScreenSubject;
  }

  StartFbAuth() {

    this.loading.present();

    console.log('calling facebook login');
    // Create an observerable which is a flattened call
    // to the getExternalLoginUrl and getExternalLoginScreen helper methods
    var accessTokenObservarable = this.getExternalLoginUrl().flatMap(url =>
      this.getExternalLoginScreen(url));

    accessTokenObservarable.subscribe(
      accessToken => {
        this.accessTokenSubject.next(accessToken);
        this.accessTokenSubject.complete();
      },
      err => {
        console.log("InAppBrowser Loadstop Event Error: " + err);
      });

    return this.accessTokenSubject;
  };

  GetEvents() {
    this.navCtrl.push(AssignDevicePage, {});
  };

  GoToPage(pageNumber: number) {
    this.navCtrl.push(this.Pages[pageNumber]);
  }


  GetStandsForEvent(event) {

  }



}