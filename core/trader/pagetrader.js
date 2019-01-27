const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');
const settings = require(__dirname + '/../../core/easyBase');
const dirs = settings.getDir();

const Trader = function(config) {
	//_.bindAll(this,['getBalance']);

	var Exchange = require(dirs.exchange + config.trader.exchange);
	this.exchange = new Exchange(config);
	console.log(this.exchange.getBalance())

}
Trader.prototype.getBalance = function(){
	console.log(this.exchange.getBalance())
}
module.exports = Trader;