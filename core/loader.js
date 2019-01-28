const program = require('commander');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const util = require('./util');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const PromiseTimer = require("bluebird");
const Indicator = require('./indicator');
const startTime = moment();
var _config = false;

var Loader = function(config){
	_.bindAll(this,[]);
	
	this.config = config;

	this.interval = 2;
	this.exchange = false;

	this.getExchange()
	this.getPlugins()
	this.strategies = this.getStrategies('RSI')
	this.strategies.trade = function(target){
		if(target == "buy"){
			return "Buy";
		}else if(target == "sell"){
			return "Sell";
		}
	};
	

	this.strategies.addTalibIndicator = function(name, lib, options){
		return new Indicator(name, lib, options);
	};

	this.strategies.addIndicator = function(name, lib, options){
		var setIndicator = new Indicator(name, lib, options);
	};

	this.strategies.addTubIndicator = function(name, lib, options){
		var setIndicator = new Indicator(name, lib, options);
	};


	this.strategies.init();
	while(true){
		//console.log(`interval Loader`);
        console.log(new Date());
        //this.getTickets();

        this.strategies.candles = this.getCandle();
        this.strategies.candle = _.first(this.strategies.candles);

        //getvalue = this.strategies.indicator.getValue(this.strategies.candles);

        console.log(this.strategies.check());

		this.sleep(this.interval)
	}
	//setInterval(this.StartsUp(), this.interval );
}


Loader.prototype.sleep =  function(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > (milliseconds * 10000)){
      break;
    }
  }
}

Loader.prototype.getExchange = function(){
	console.log(`Get Exchange`);
	var Exchange = util.loadFile("exchange",this.config.trader.exchange);
	this.exchange = new Exchange(this.config);
	//var Trader = require(this.getDir().core + "trader/"+ _config.trader.method.toLowerCase())(_config);

}

Loader.prototype.getBalance = function(){
}

Loader.prototype.getTickets = function(){
	console.log(`Get getTickets Exchange : ${this.config.trader.exchange}`);
	this.exchange.getTickets()
}

Loader.prototype.getAllorder = function(){
}

Loader.prototype.getTraderMethod = function(){
}

Loader.prototype.getStrategies = function(isStrategies){
	console.log(`Get Strategies`);
	return util.loadFile("strategie",isStrategies);
}

Loader.prototype.getPlugins = function(){
	var json = util.getJSON("root","plugins.json");
	_.forEach(json, function(item, index){
		if(item.enable === true){
			console.log(item);
			console.log(index);
		}
		
	});
	
	/*
	fs.readdirSync(uril.getDirs().plugins).forEach(file => {
	  console.log(file);
	})
	*/
}

Loader.prototype.getCandle = function(){
	return util.getJSON("fetchdata","PPTBTC-1m-binance.json");
}

module.exports = Loader;