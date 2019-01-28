var start = {
	init : function(){
		this.addTalibIndicator("rsi","RSI",{})
		console.log(this);
	},
	update : function(){

	},
	check : function(){
		price = this.candle.close;
		console.log(this);
		//console.log(this.trade("sell"));
	}
}
module.exports = start;