const settings = require(__dirname + '/core/easyBase');
const dirs = settings.getDir();


if(settings.launchUI()){
	settings.logs("Run UI")
	return require(dirs.root+"/web/server");
}
const config = settings.getConfig();
settings.startBot();