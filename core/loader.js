const program = require('commander');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const util = require('./util');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const PromiseTimer = require("bluebird");
const Indicator = new require('./indicator');
const chalk = require('chalk');
const log = console.log;
const figlet = require('figlet');
 
log(figlet.textSync('AI TRADER!', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}));

log(chalk.blue('AI TRADER START WITH INFO!'));
//log(chalk.blue('Date') + chalk.blue('Price') + chalk.blue('RSI') + chalk.blue('Action'));
const startTime = moment();
var _config = false;

var Loader = function(config){
	_.bindAll(this,[]);
	
	this.config = config;

	this.interval = 2;
	this.exchange = false;
	this.pair = this.config.trader.asset.toUpperCase() + this.config.trader.currency.toUpperCase();


	if(this.config.trader.method === "pagetrader"){
		this.tradeMethod = this.config.pagetrader;
		this.tradeMethod.name = "Page Trader";
		const Trader = util.loadFile("core","trader/pagetrader");
		this.traderBot = new Trader(this.config);

	}else{
		this.tradeMethod = this.config.bottrader;
		this.tradeMethod.name = "Bot Trader";
		this.traderBot = util.loadFile("core","trader/botrader");
	}

	this.traderBot.exchange = this.exchange;

	log(chalk.blue('Exchange : '+this.config.trader.exchange+'!'));
	log(chalk.green('Pair : '+this.pair));
	log(chalk.green('Method : '+this.tradeMethod.name+' - Period : '+this.config.trader.period));

	this.getExchange()
	this.getPlugins()

	this.strategies = this.getStrategies(this.tradeMethod.strategies.name.toUpperCase()); // load strategies


	/*
	Create Class Buy Sell
	*/
	
	this.strategies.trade = function(target){
		if(target == "buy"){
			log(this.traderBot);
			//this.traderBot.buy()

		}else if(target == "sell"){
			//this.traderBot.sell()
		}
		//this.strategies.trend = this.traderBot.getTrend()
	};
	

	/*
	Create Indicator
	*/
	var setIndicator = {};
	this.strategies.addTalibIndicator = function(name, lib, options){
		setIndicator = Indicator.addTalibIndicator(name, lib, options);
	};

	this.strategies.addIndicator = function(name, lib, options){
		setIndicator = Indicator.addIndicator(name, lib, options);
	};

	this.strategies.addTubIndicator = function(name, lib, options){
		setIndicator = Indicator.addTubIndicator(name, lib, options);
	};

	
	this.strategies.init();
	log(setIndicator)
	log(chalk.green("Date					"),'Price	','RSI	','Trader 	','Action	','Roundtrip');
	while(true){
		//console.log(`interval Loader`);
        
        //this.getTickets();
        /*
        this.strategies.candles = this.getCandle();
        this.strategies.candle = _.first(this.strategies.candles);

        //getvalue = this.strategies.indicator.getValue(this.strategies.candles);

        console.log(this.strategies.check());
		*/
		this.strategies.candles = this.getCandle();
		this.strategies.candle = _.first(this.strategies.candles);
		
		this.strategies.check();
		log(chalk.green(new Date()),this.strategies._writelog()	,'30	',this.strategies.candle.trades+'		','BUY	','Sell 	');

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
	var Exchange = util.loadFile("exchange",this.config.trader.exchange.toLowerCase());
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
	return util.getJSON("fetchdata",this.pair+"-"+this.config.trader.period+"-"+this.config.trader.exchange+".json");
}

module.exports = Loader;