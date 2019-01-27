const program = require('commander');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const toml = require('toml');

const _root = __dirname + "/../";
var setDir = false;

module.exports = {
	getDir: function(){
		if(setDir) return setDir;
		var dir = {
			root : _root,
			core : _root + "core/",
			plugins: _root + "plugins/",
			strategie : _root + "strategies/",
			web : _root + "web/",
			exchange : _root + "exchanges/",
			keys : _root + "account/",
			fetchdata : _root + "fetchdata/",
			config : _root + "config/"
		}
		setDir = dir;
		return dir;
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

	getJSON : function(subfolder, file, keys){
		var files = "";
		if(subfolder){
			files = this.getFile(subfolder, file)
		}else{
			files = file
		}

		jsonObject = JSON.parse( fs.readFileSync(files, 'utf8') );
		if(keys){
			return this.getObject(jsonObject, keys);
		}
		return jsonObject;
	},
	getToml : function(file){
		var files = this.getFile('config',file);
		return toml.parse(fs.readFileSync(files, 'utf8'))
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
	loadFile : function(subfolder, file){
		var files = this.getFile(subfolder, file+".js", true);
		if(files) return require(files);
	}
}