const mongoose = require("mongoose");

const equitiesAppSchema = new mongoose.Schema({

    equityName: String,  

    tickerSymbol: String,  

    currentPrice: Number,  

    inPortfolio: Boolean  
});

const EquitiesApp = mongoose.model("EquityApp", equitiesAppSchema); 

module.exports = EquitiesApp;