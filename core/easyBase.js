const program = require('commander');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

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
			plugins: _root + "plugins/",
			strategie : _root + "strategies/",
			web : _root + "web/",
			exchange : _root + "exchanges/"
		}
		return dir;
	},
	getConfig : function(){
		
		if(_config) return _config;

		if(!program.config){
			console.log('Cannot find the specified config file.');
	        process.exit(1);
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
		var Exchange = require(this.getDir().exchange + _config.trader.exchange);
		var ctlExchange = new Exchange(_config);

		console.log(ctlExchange.getTrades());
	},

	
	stopBot : function(){

	}

}

program
  .version("1.0.1")
  .option('-c, --config <file>', 'Config file')
  .option('-b, --backtest', 'backtesting mode')
  .option('-i, --import', 'importer mode')
  .option('--ui', 'launch a web UI')
  .parse(process.argv);

module.exports = easyBase;