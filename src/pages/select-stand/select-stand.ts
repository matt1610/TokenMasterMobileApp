import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AssignDevicePage } from '../../pages/assign-device/assign-device';
import { ScanDevicePage } from '../../pages/scan-device/scan-device';
import { ApiService } from '../../app/apiService';

/**
 * Generated class for the SelectStandPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-stand',
  templateUrl: 'select-stand.html',
})
export class SelectStandPage {

  public Stands: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectStandPage');

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();

    this.apiService.GetStandsForDevice( this.navParams.get('event') ).subscribe(res => {
      this.Stands = res;
      console.log(res);
      loading.dismiss();
    });
  }

  SelectStand(stand) {
    this.navCtrl.push(ScanDevicePage, {
      event: this.navParams.get('event'),
      stand : stand
    });
  }

}
