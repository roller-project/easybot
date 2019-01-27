const settings = require(__dirname + '/core/easyBase');
const dirs = settings.getDir();
const config = settings.getConfig();

const { spawn } = require('child_process');

var children  = [];

if(settings.launchUI()){
	return require(dirs.root+"/web/server");
}

//const child = spawn('node', ['watch.js'],['--config config/config.js']);

//children.push(child);
/*
child.on('exit', function(){
  clearTimeout(to);
  console.log('Child exited!');
});

child.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

child.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});
*/
//settings.getCandle();
settings.startBot();

process.on('exit', function() {
  console.log('killing', children.length, 'child processes');
  children.forEach(function(childs) {
    childs.kill();
  });
});

process.on('close', function() {
  console.log('killing', children.length, 'child processes');
  children.forEach(function(childs) {
    childs.kill();
  });
});