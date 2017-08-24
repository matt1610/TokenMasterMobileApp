import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiService } from '../../app/apiService';

import { SelectStandPage } from '../../pages/select-stand/select-stand';
import { ScanDevicePage } from '../../pages/scan-device/scan-device';

/**
 * Generated class for the AssignDevicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-assign-device',
  templateUrl: 'assign-device.html',
})
export class AssignDevicePage {

  public Events: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignDevicePage');

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();

    this.apiService.GetEvents().subscribe(res => {
      this.Events = res;
      loading.dismiss();
      console.log(res);
    });

  }

  SelectEvent(event) {
    this.navCtrl.push(SelectStandPage, {
      event: event
    });
  }

}
