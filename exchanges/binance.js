const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');
const settings = require(__dirname + '/../core/easyBase');
const dirs = settings.getDir();

const Binance = require('binance');
const ticket = {}
const _data = {}
const Trader = function(config) {
	_.bindAll(this,[])
	this.pair = config.trader.asset + config.trader.currency;
	this.exchange = config.trader.exchange;

	this.binance = new Binance.BinanceRest({
	    key: (config.key ? config.key : ''),
	    secret: (config.secret ? config.secret : ''),
	    timeout: 15000,
	    recvWindow : 60000,
	    disableBeautification: false,
	    handleDrift: true,
	});
}
Trader.prototype.getTrades = function(){
	return "Khoa"
}

Trader.prototype.getPair = function(){
	return "Khoa"
}


Trader.prototype.getTickets = function(){
	return "Khoa"
}

Trader.prototype.getCandle = function(){
	var pair = this.pair;
	var interval = '1m'
	var exchange = this.exchange;

	this.binance.klines({symbol : this.pair, interval : '1m', limit : 240}).then(function(data){
		let pairs = _.map(data, market => {
	      return {
	        "openTime": market.openTime,
		    "open": market.open,
		    "high":  market.high,
		    "low":  market.low,
		    "close":  market.close,
		    "volume":  market.open,
		    "closeTime":  market.closeTime,
		    "trades":  market.trades,
	      };
	    });
	    
	    return pairs;
		//console.log(data)
		
	}).then(function(data){
		fs.writeFileSync(dirs.fetchdata+"/"+pair+"-"+interval+"-"+exchange+".json", JSON.stringify(data, null, 2));
    	console.log(`Done writing Binance market data`);
	});
	
}


Trader.prototype.getTicket24h = function(){
	return "Khoa"
}

Trader.prototype.getOrder = function(){
	return "Khoa"
}

Trader.prototype.checkOrder = function(){
	return "Khoa"
}

Trader.prototype.cancelOrder = function(){
	return "Khoa"
}

Trader.prototype.createdOrder = function(){
	return "Khoa"
}

Trader.prototype.buy = function(){
	return "Khoa"
}

Trader.prototype.sell = function(){
	return "Khoa"
}
Trader.prototype.getBalance = function(){
	
	this.binance.account(function(arv){
		console.log(arv)
		return arv;
	});
	return _data;
}



module.exports = Trader;