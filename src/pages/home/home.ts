import { Component } from '@angular/core';
// import { Nav, Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';

import { Token } from '../../classes/token';
import { Link } from '../../classes/link';


@Component({
  selector: 'home',
  templateUrl: 'home.html'
})

export class HomePage {

  tokens: Token[];
  userTokens: Token[];
  selectedToken: Token;
  isTokenScreen: boolean;
  isAddingToken: boolean;
  apiUrl: any;
  BittrexTokens: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restapiService: RestapiServiceProvider) {
    this.selectedToken = navParams.get('item');
    this.isAddingToken = false;
    this.isTokenScreen = false;
    this.tokens = [];
    this.userTokens = [];
    this.getBittrexTokens();
    this.loadData();
  }

  getBittrexTokens() {
    this.restapiService.getBittrexMarkets()
    .then(data => {
      this.BittrexTokens = data;
      this.createListOfTokens();
      });
    }


  public createListOfTokens(){
    for (var m = 0; m < this.BittrexTokens.length; m++){
      var token = new Token();
      token.name = this.BittrexTokens[m].MarketCurrencyLong;
      token.tokenName = this.BittrexTokens[m].MarketCurrency;
      token.baseCurrency = this.BittrexTokens[m].BaseCurrency;
      token.logo = this.BittrexTokens[m].LogoUrl;
      token.marketName = this.BittrexTokens[m].MarketName
      token.marketData = this.restapiService.getRealTimeData(token);
      this.tokens.push(token);
    }
  }

  public saveData(){
    var tokensToSave = JSON.stringify(this.tokens);
    var userTokensToSave = JSON.stringify(this.userTokens);
    window.localStorage.setItem("tokens", tokensToSave);
    window.localStorage.setItem("userTokens", userTokensToSave);
  }

  public loadData(){
    var savedTokens = window.localStorage.getItem("tokens");
    var savedUserTokens = window.localStorage.getItem("userTokens");

    if (savedTokens != null){
      this.tokens = JSON.parse(savedTokens);
      this.userTokens = JSON.parse(savedUserTokens);
    } else {
      this.saveData();
    }
  }

  public addToken(tokenToAdd: Token){
      if (!tokenToAdd.inPortfolio){
        tokenToAdd.inPortfolio = true;
        this.userTokens.push(tokenToAdd);
        this.isAddingToken = false;
        // this.getRealTimeData(tokenToAdd);
      }
      this.saveData();
  }

  public removeToken(tokenToRemove: Token){
    var token = this.userTokens.indexOf(tokenToRemove);
    this.tokens[this.userTokens.indexOf(tokenToRemove)].inPortfolio = false;
    this.userTokens.splice(this.userTokens.indexOf(token), 1);
    this.saveData();
  }

  chooseToken(event, item: Token) {
    if (!this.isTokenScreen && this.selectedToken != item){
      this.selectedToken = item;
      this.isTokenScreen = true;
      // var target = event.target;

      // this.navCtrl.push(HomePage, {
      //   item: item
      // });

      // var demRect = target.getBoundingClientRect();
      // var x = demRect.x;
      // var y = demRect.y;
      // console.log(demRect);
      // target.setAttribute("style", "width: " + (demRect.width) + "px; height: " + (demRect.height * 2) + "px");
      // target.childNodes[1].setAttribute("style","position: fixed; top: " + (demRect.y + 12) + "px; left: " +  12 + "px; width: " + (demRect.width - 24) + "px; height: " + demRect.height + "px");
      //
      // target.setAttribute("style", "width: " + (demRect.width) + "px; height: " + (demRect.height * 2) + "px");
      // target.childNodes[1].setAttribute("style","transform: translate3d(" + (-x) + "px," + (-y) + "px, 0); width: " + (window.innerWidth) + "px; height: " + window.innerHeight + "px");
    }
  }

  closeTokenView(event, item: Token) {
    this.selectedToken = null;
    this.isTokenScreen = false;
    this.navCtrl.push(HomePage);
    // var target = event.target;
    // target.setAttribute("style", "width: 100%; height: 80px);
    // target.childNodes[1].setAttribute("style","position: relative; top: " + (demRect.y + 12) + "px; left: " +  12 + "px; width: " + (demRect.width - 24) + "px; height: " + demRect.height + "px");
  }


}
