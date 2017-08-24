import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public qrScanner: QRScanner) {

  }





  public Scan() {

    
    return new Promise( (resolve, reject) => {



      this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {

          if (status.authorized) {
            // camera permission was granted

            document.querySelector('html').style.display = 'none';
            this.qrScanner.show();

            // start scanning
            let scanSub = this.qrScanner.scan().subscribe((text: string) => {
              alert(text);

              document.querySelector('html').style.display = 'block';

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
