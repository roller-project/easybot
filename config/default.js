var config = {};
config.debug = true; // for additional logging / debugging

config.trader = {

  exchange: 'binance',
  currency: 'BTC',
  asset: 'PPT',
  method : 'pagetrader', //bottrader=> auto trader, pagetrader => custom trade
  period : "1m",
}

config.pagetrader = {
	
	balance :{
		asset : 0,
		currency : 0.1
	},
	strategies : {
		name : "RSI",
		config : {
			
		}
	}
}

config.bottrader = {

	balance :{
		asset : 0,
		currency : 0.1
	},
	strategies : {
		name : "RSI",
		config : {
			
		}
	}
	
}

module.exports = config;