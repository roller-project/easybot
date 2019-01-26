const _ = require('lodash');
const fs = require('fs');
const request = require("request-promise")

let getOrderMinSize = currency => {
  if (currency === 'BTC') return 0.001;
  else if (currency === 'ETH') return 0.01;
  else if (currency === 'USDT') return 10;
  else return 1;
};


request({
    url: 'https://www.binance.com/exchange/public/product',
    json: true
}).then(function ( body) {

    if (!body && !body.data) {
      throw new Error('Unable to fetch product list, response was empty');
    }

    let assets = _.uniqBy(_.map(body.data, market => market.baseAsset));
    let currencies = _.uniqBy(_.map(body.data, market => market.quoteAsset));
    let pairs = _.map(body.data, market => {
      return {
        pair: [market.quoteAsset, market.baseAsset],
        minimalOrder: {
          amount: parseFloat(market.minTrade),
          price: parseFloat(market.tickSize),
          order: getOrderMinSize(market.quoteAsset),
        },
      };
    });

    return { assets: assets, currencies: currencies, markets: pairs };

}).then(data => {

	fs.writeFileSync('../../exchanges/binance-markets.json', JSON.stringify(data, null, 2));
    console.log(`Done writing Binance market data`);

}).catch(err => {
    console.log(`Couldn't import products from Binance`);
    console.log(err);
});