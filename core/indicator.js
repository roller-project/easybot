const program = require('commander');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const util = require('./util');
const events = require('events');
const eventEmitter = new events.EventEmitter();
var registerIndicator = {}

module.exports = {
	create : function(){

	},
	addTalibIndicator : function(name, base, options){

	},
	addIndicator : function(name, base, options){
		//_.bindAll(this,[name]);
		
		json = JSON.parse('{"'+name+'" : "khoa"}');
		_.assign(registerIndicator, json)
		return registerIndicator;
	},
	addTulibIndicator : function(name, base, options){
		this.$(name) = "Khoa"
	},
	getValue : function(){

	}
}
