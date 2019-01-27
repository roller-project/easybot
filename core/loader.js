const program = require('commander');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const util = require('./util');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const PromiseTimer = require("bluebird");

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

	while(true){
		//console.log(`interval Loader`);
        console.log(new Date());
        this.getTickets();
        

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

module.exports = Loader;