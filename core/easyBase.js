const program = require('commander');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const Loader = require('./loader');
const events = require('events');
const eventEmitter = new events.EventEmitter();

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

		console.log(this.getFile("keys","keys.json"))
		var configAPI = this.getKeyAPI();
		
		
		_config.key = configAPI.key;
		_config.secret = configAPI.secret;
		_config.dirs = this.getDir()
		//var Exchange = require(this.getDir().exchange + _config.trader.exchange);
		//var ctlExchange = new Exchange(_config);
		//var Trader = require(this.getDir().core + "trader/"+ _config.trader.method.toLowerCase())(_config);
		
		var LoaderStrem = new Loader(_config)
		
		
	},

	
	stopBot : function(){

	},
	getFile : function(subfolder, file, exitFile=false){
		var getfile = "";
		getPath = _.filter(this.getDir(), function(data, value){
				if(value === subfolder){
					return data;
				}
			})[0];

		if(exitFile && !fs.existsSync(getPath + file)){
			getfile =  getPath + file;
		}else{
			getfile = getPath + file;
		}
		return getfile;
	},

	getJSON : function(file, keys){

		jsonObject = JSON.parse( fs.readFileSync(file, 'utf8') );
		if(keys){
			return this.getObject(jsonObject, keys);
		}
		return jsonObject;
	},
	getObject : function(object, keys){
		if(!_.isObject(object)) return;
		data = _.filter(object, function(data, value){
        	if(value === keys){
        		return data;
        	}
        });
        return data[0];
	},
	getKeyAPI : function(){
		var filekeys = this.getFile("keys","keys.json",true);

		if(!filekeys){
	      console.log('Cannot find the specified config file.');
	      process.exit(1);
		}

		return this.getJSON(filekeys, _config.trader.exchange);

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