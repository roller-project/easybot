const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');
const settings = require(__dirname + '/../../core/easyBase');
const dirs = settings.getDir();
const exchange = false;

const Trader = function(config) {
	_.bindAll(this);
	
	this.trend = {
		direction: 'none',
	    duration: 0,
	    persisted: false,
	    adviced: false
	}
	this.exchange = config.trader.exchange
	console.log(this.exchange);

}


Trader.prototype.getBalance = function(){
	console.log(this.exchange.getBalance())
}

Trader.prototype.getFee = function(){
	console.log(this.exchange.getBalance())
}

Trader.prototype.getAmount = function(){
	console.log(this.exchange.getBalance())
}


Trader.prototype.buy = function(){

	if(this.trend.direction !== "buy"){
		var fee = this.getFee();
		var amount = this.getAmount();
		this.trend.direction = "buy";
		console.log("Buy")
	}
}


Trader.prototype.sell = function(){
	if(this.trend.direction !== "sell"){
		this.trend.direction = "sell";
		console.log("Sell")
	}
}

Trader.prototype.getTrend = function(){
	return this.trend;
}

module.exports = Trader;