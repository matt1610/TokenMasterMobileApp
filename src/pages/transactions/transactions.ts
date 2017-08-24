import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { ApiService } from '../../app/apiService';

/**
 * Generated class for the TransactionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  public Res: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public qrScanner: QRScanner, public apiService: ApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
    this.StartScan();
  }




  StartScan() {
    this.Scan().then(text => {
      alert(text);
      this.apiService.AttemptTransaction(text.toString(), 2).subscribe(res => {
        console.log(res);
        this.Res = res;
        alert(res);
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
              // document.querySelector('html').style.display = 'block';

              this.qrScanner.hide();
              scanSub.unsubscribe();

              window.document.querySelector('ion-app').classList.remove('transparentBody');
              window.document.querySelector('html').classList.add('transparentBody');
            });


            this.qrScanner.show();

            // wait for user to scan something, then the observable callback will be called

          }
        })
        .catch((e: any) => console.log('Error is', e));



    });

  }





}
