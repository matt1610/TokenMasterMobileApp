import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ExternalLoginViewModel } from '../app/externalLoginViewModel';
import { AssignDeviceModel } from '../models/AssignDeviceModel';

// import { DateCheckModel } from './dateCheckModel';

@Injectable()
export class ApiService {

    private apiUrl: string = "https://tokenmaster.azurewebsites.net/";
    // private authEndpoint: string = "/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A16193%2F&state=PD73LENIHmeo2y0XcxukCyR_UAx88hXbKLmPKF33ppA1";
    private authEndpoint: string = "/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Ftokenmaster.azurewebsites.net%2F&state=KEC1SdLGwegTUWmpcMYJ2Hq1WhgCyp7t1Ghbdvd0dT81";

    constructor(private http: Http, public externalLoginViewModel: ExternalLoginViewModel) {

    }

    public AuthStepOne() {
        return this.http.get(this.apiUrl + this.authEndpoint)
            .map(this.extractData)
            .catch(this.handleError);
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleError(error: Response | any) {

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    public assignDeviceToStand(assignDeviceModel: AssignDeviceModel) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({
            url: this.apiUrl + "api/EventDevices/assignDevice",
            headers: headers
        });

        return this.http.post(this.apiUrl + "api/EventDevices/assignDevice", JSON.stringify(assignDeviceModel), options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public GetEvents() {
        return this.http.get(this.apiUrl + "api/events/getevents").map(this.extractData).catch(this.handleError);
    }

    public GetStandsForDevice(event) {
        return this.http.get(this.apiUrl + "api/EventStands/getStandsForEvent/" + event.Id).map(this.extractData).catch(this.handleError);
    }

    public AttemptTransaction(deviceId: string, amount: Number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + localStorage.getItem("ApiToken"));

        let options = new RequestOptions({
            headers: headers
        });
        return this.http.post(this.apiUrl + "api/Transactions", JSON.stringify({DeviceId : deviceId, TokenAmount : amount}), options);
    }

    public BuyTokensForEvent(eventId: string, tokenAmount: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + localStorage.getItem("ApiToken"));

        let options = new RequestOptions({
            headers: headers
        });
        return this.http.post(this.apiUrl + "api/events/joinevent", JSON.stringify({EventId : eventId, Tokens : tokenAmount}), options);
    }


}


