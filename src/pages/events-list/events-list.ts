import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { ApiService } from '../../app/apiService';

/**
 * Generated class for the EventsListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-events-list',
  templateUrl: 'events-list.html',
})
export class EventsListPage {

  public TokenAmountToPurchase: number = 50;
  public Events: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    
  }

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();


    console.log('ionViewDidLoad EventsListPage');
    this.apiService.GetEvents().subscribe(res => {

      loading.dismiss();

      this.Events = res;
      console.log(res);
    });
  }

  BuyTickets(eventModel) {
    this.apiService.BuyTokensForEvent(eventModel.Id, this.TokenAmountToPurchase).subscribe(res => {
      alert(res);
    });
  }


  SelectEvent(eventModel) {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy ' + this.TokenAmountToPurchase + ' tokens for this event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
            this.BuyTickets(eventModel);
          }
        }
      ]
    });
    alert.present();
  }





}
