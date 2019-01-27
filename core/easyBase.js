const program = require('commander');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const startTime = moment();
var _config = false;

var easyBase = {
	launchUI: function() {
	    if(program['ui'])
	      return true;
	    else
	      return false;
	},
	getDir: function(){
		var _root = __dirname + "/../";
		var dir = {
			root : _root,
			core : _root + "core/",
			plugins: _root + "plugins/",
			strategie : _root + "strategies/",
			web : _root + "web/",
			exchange : _root + "exchanges/",
			keys : _root + "account/",
			fetchdata : _root + "fetchdata/"
		}
		return dir;
	},
	getConfig : function(){
		
		if(_config) return _config;

		if(!program.config){
			program.config = "config/default.js";
		}
		if(!fs.existsSync(this.getDir().root + program.config)){
	      console.log('Cannot find the specified config file.');
	      process.exit(1);
		}

	    _config = require(this.getDir().root + program.config);
	    return _config;

	},
	logs: function(msg){
		var log = console.log.bind(console);
		log(msg);
	},

	startBot : function(){
		var configAPI = this.getKeyAPI();
		var Exchange = require(this.getDir().exchange + _config.trader.exchange);
		
		_config.key = configAPI.key;
		_config.secret = configAPI.secret;

		var ctlExchange = new Exchange(_config);
		var Trader = require(this.getDir().core + "trader/"+ _config.trader.method.toLowerCase())(_config);

		
		
	},

	
	stopBot : function(){

	},
	getKeyAPI : function(){
		_package = JSON.parse( fs.readFileSync(this.getDir().keys + "keys.json", 'utf8') );
		var exchange = _config.trader.exchange;

        data = _.filter(_package, function(data, value){
        	if(value === exchange){
        		return data;
        	}
        });
        return data[0];
	},
	getCandle : function(){
		var Exchange = require(this.getDir().exchange + _config.trader.exchange);
		var ctlExchange = new Exchange(_config);

		setInterval(function() {
                ctlExchange.getCandle()
        }, 15000 );
	}

}

program
  .version("1.0.1")
  .option('-c, --config <file>', 'Config file')
  .option('-b, --backtest', 'backtesting mode')
  .option('-i, --import', 'importer mode')
  .option('--ui', 'launch a web UI')
  .option('--candle', 'launch a candle')
  .parse(process.argv);

module.exports = easyBase;