import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Token } from '../classes/token';
import { Link } from '../classes/link';


/*
  Generated class for the RestapiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestapiServiceProvider {

  apiUrl: any;
  data: any;
  realtimeData: any;

  constructor(private http: Http) {
    this.apiUrl = 'http://138.197.211.254:3000/api';
  }

  //DO NOT CHANGE!!
  getBittrexMarkets() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/getmarkets')
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          this.data = data.result;
          resolve(this.data);
        });
    });
  }

  getRealTimeData(token: Token) {
    if (this.realtimeData) {
      return Promise.resolve(this.realtimeData);
    }
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/getmarketsummary?market=' + token.marketName)
        .map(res => res.json())
        .subscribe(realtimeData => {
          console.log(realtimeData);

          // token.marketData = realtimeData.result[0];
        });
    });
  }


}
