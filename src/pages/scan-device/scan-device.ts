import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { AssignDevicePage } from '../../pages/assign-device/assign-device';
import { SelectStandPage } from '../../pages/select-stand/select-stand';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { ApiService } from '../../app/apiService';
import { AssignDeviceModel } from '../../models/AssignDeviceModel';
import { ZBar, ZBarOptions } from '@ionic-native/zbar';

/**
 * Generated class for the ScanDevicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-scan-device',
  templateUrl: 'scan-device.html',
})
export class ScanDevicePage {

  public DeviceId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public qrScanner: QRScanner,
    public alertCtrl: AlertController, public apiService: ApiService, public zbar: ZBar) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanDevicePage');
    console.log(this.navParams.get('event'));
    console.log(this.navParams.get('stand'));
  }

  StartScan() {
    this.ZScan().then(text => {
      this.DeviceId = text.toString();
      console.log(this.DeviceId);
      this.presentConfirm();
    });
  }

  presentConfirm() {
    let alertPrompt = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Assign Device',
          handler: () => {

            let assignDeviceModel: AssignDeviceModel = new AssignDeviceModel(this.DeviceId, this.navParams.get('stand').StandId, this.navParams.get('event').Id);
            console.log(assignDeviceModel);
            this.apiService.assignDeviceToStand(assignDeviceModel).subscribe(res => {
              console.log(res);
            });

          }
        }
      ]
    });
    alertPrompt.present();
  }

  public ZScan() {
    return new Promise((resolve, reject) => {
      let options: ZBarOptions = {
        flash: 'off',
        drawSight: true
      };

      this.zbar.scan(options)
        .then(result => {
          resolve(result); // Scanned code
        })
        .catch(error => {
          reject(error); // Error message
        });
    });
  }

  public Scan() {
    window.document.querySelector('ion-app').classList.add('transparentBody');
    window.document.querySelector('html').classList.add('transparentBody');
    return new Promise((resolve, reject) => {
      this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {

          if (status.authorized) {
            // camera permission was granted

            document.querySelector('html').style.display = 'none';
            this.qrScanner.show();

            // start scanning
            let scanSub = this.qrScanner.scan().subscribe((text: string) => {
              resolve(text);
              window.document.querySelector('ion-app').classList.remove('transparentBody');
              window.document.querySelector('html').classList.add('transparentBody');

              // document.querySelector('html').style.display = 'block';

              this.qrScanner.hide();
              scanSub.unsubscribe();
            });


            this.qrScanner.show();

            // wait for user to scan something, then the observable callback will be called

          }
        })
        .catch((e: any) => console.log('Error is', e));



    });

  }

}
