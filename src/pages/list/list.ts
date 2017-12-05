import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Http, Headers } from '@angular/http';

import * as bittrex from 'api-bittrex';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})






export class ListPage {
  selectedItem: any;
  icons: string[];
  tokens: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    // bittrex.getmarketsummaries( function( data, err ) {
    //   console.log( data );
    // });

    var httpCall = this.http
                   .get('/getmarkets', JSON.stringify(body), {headers: headers});
                   //.map(res => res.json());

    return httpCall;
  }


  itemTapped(event, item) {
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
