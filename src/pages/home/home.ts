import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as bittrex from 'api-bittrex';

class Token {
  name: string;
  symbol: string;
  balance: string;
  icon: string;
  links: [];
  constructor(){
    this.name = 'Token Name';
    this.description = 'Token Description';
    this.balance = '0';
  }
}

class Link {
  url: string;
  article_xpath: string;
  headline_xpath: string;
  date_xpath: string;
   constructor(){
     this.url = '';
     this.article_xpath = '';
     this.headline_xpath = '';
     this.date_xpath = '';
   }
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  selectedItem: any;
  tokens: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');


    this.tokens = [];

    this.tokens.push(new Token({}))
    this.tokens.push(new Token({}))
    this.tokens.push(new Token({}))
    this.tokens.push(new Token({}))


  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

}
