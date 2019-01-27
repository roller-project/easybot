var config = {};
config.debug = true; // for additional logging / debugging

config.trader = {

  exchange: 'binance',
  currency: 'BTC',
  asset: 'PPT',
  method : 'pagetrader'
}

config.pagetrader = {
	balance :{
		asset : 0,
		currency : 0.1
	},
	strategies : {
		name : "test",
		config : {
			
		}
	}
}
module.exports = config;