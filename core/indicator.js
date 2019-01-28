const program = require('commander');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const util = require('./util');
const events = require('events');
const eventEmitter = new events.EventEmitter();
var registerIndicator = []
var Indicator = function(name, lib, options){
	_.bindAll(this);
}

Indicator.prototype.addTalibIndicator = function(){

}

Indicator.prototype.addIndicator = function(){

}


Indicator.prototype.addTulibIndicator = function(){

}

Indicator.prototype.getValue = function(){

}

module.exports = Indicator;