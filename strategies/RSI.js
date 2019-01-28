var start = {
	init : function(){
		this.addIndicator("rsi","RSI",{})
		this.addIndicator("rsi2","RSI",{})
		console.log(this.rsi);
	},
	update : function(){

	},
	check : function(){
		price = this.candle.close;
		this.trade("buy");
		this.trade("sell");
		//console.log(this.trade("sell"));
	},
	_writelog : function(){
		return this.candle.close;
	}
}
module.exports = start;