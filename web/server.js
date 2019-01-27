const settings = require(__dirname + '/../core/easyBase');
const dirs = settings.getDir();
const config = settings.getConfig();

var express = require("express");
var app = express();
var router = express.Router();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.set('views', __dirname + '/views') // specify the views directory
app.set('view engine', 'pug');



router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
	res.render('index', { title: 'Hey', message: 'Hello there!' })
  //res.sendFile(path + "index.html");
});

router.get("/task",function(req,res){
  res.render('pages/task', { title: 'Hey', message: 'Hello there!' })
});


router.get("/api/candle",function(req,res){
  res.sendFile(dirs.fetchdata + "/aapl-ohlcv.json");
});


router.post("/api/*",function(req,res){
  res.sendFile("contact.html");
});
router.get("/script.js",function(req,res){
  res.sendFile(__dirname + '/views/script.js');
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(__dirname + "/views/pages/404.html");
});

server.listen(3000,function(){
  console.log(config)
  console.log("Live at Port 3000");
});


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
