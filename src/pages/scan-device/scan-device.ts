import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AssignDevicePage } from '../../pages/assign-device/assign-device';
import { SelectStandPage } from '../../pages/select-stand/select-stand';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public qrScanner: QRScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanDevicePage');
    console.log(this.navParams.get('event'));
    console.log(this.navParams.get('stand'));
  }

  StartScan() {
    this.Scan().then(text => {
      alert(text);
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
