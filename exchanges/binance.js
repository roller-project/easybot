const moment = require('moment');
const _ = require('lodash');

const Binance = require('binance');

const Trader = function(config) {
	_.bindAll(this,[])
	this.pair = config.trader.asset + config.trader.currency;
	this.binance = new Binance.BinanceRest({
	    key: '',
	    secret: '',
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

Trader.prototype.getCandle = function(){
	return "Khoa"
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



module.exports = Trader;