const _ = require("underscore");
const ItemData = require("./itemdata.js");
const PriceData = require("./pricedata.js");
const League = require("./league.js");

/**
* @extends {ItemData}
*/
class Item extends ItemData {
  /**
  * @constructor
  */
  constructor(data, id) {
    super(data);
    this.id = id || null;
  }

  /**
  * Returns price data for every league
  *
  * @returns {PriceData[]} Array of PriceData objects for each league holding the price data for the item
  */
  getPriceData() {
    let priceDataArray = [];

    for(var index in this.data) {
      let priceData = this.data[index];

      priceDataArray.push(new PriceData(priceData));
    }

    return priceDataArray;
  }

  /**
  * Returns price data for a specific league
  *
  * @param   {(string|number)} league Name or ID of the league
  * @returns {PriceData}       PriceData object holding the price data for the item
  */
  getPriceDataByLeague(league) {
    let priceData = _.findWhere(this.data, function(obj) {
      if(Number.isInteger(league)) {
        return obj.league.id === league;
      }

      if(typeof league === "string") {
        return obj.league.name === league;
      }
    });

    return new PriceData(priceData);
  }
}

module.exports = Item;
