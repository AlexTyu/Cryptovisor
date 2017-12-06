export class Token {
  name: string;
  marketName: string;
  tokenName: string;
  baseCurrency: string;
  balance: string;
  logo: string;
  inPortfolio: boolean;
  marketData: any;
  last: any;
  links: Link[];
  constructor(){
    this.balance = '0';
    this.inPortfolio = false;
  }
}
