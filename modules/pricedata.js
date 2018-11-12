const League = require("./league.js");
const History = require("./history.js");

class PriceData {
  /**
  * @constructor
  */
  constructor(data) {
    Object.assign(this, data);

    this.league = new League(this.league);
    this.history = new History(this.history);
  }

  /**
  * Returns the league information
  *
  * @returns {League}
  */
  getLeague() {
    return this.league;
  }

  /**
  * Returns the mean value of the item
  *
  * @returns {number}
  */
  getMean() {
    return this.mean;
  }

  /**
  * Returns the median value of the item
  *
  * @returns {number}
  */
  getMedian() {
    return this.median;
  }

  /**
  * Returns the mode value of the item
  *
  * @returns {number}
  */
  getMode() {
    return this.mode;
  }

  /**
  * Returns the minimum value of the item
  *
  * @returns {number}
  */
  getMin() {
    return this.min;
  }

  /**
  * Returns the maximum value of the item
  *
  * @returns {number}
  */
  getMax() {
    return this.max;
  }

  /**
  * Returns the value of the item in Exalted Orbs
  *
  * @returns {number}
  */
  getExalted() {
    return this.exalted;
  }

  /**
  * Returns the total count of listed items
  *
  * @returns {number}
  */
  getCount() {
    return this.count;
  }

  /**
  * Returns the count of currently listed items
  *
  * @returns {number}
  */
  getQuantity() {
    return this.quantity;
  }

  /**
  * Returns the price history of the item
  *
  * @returns {History}
  */
  getHistory() {
    return this.league;
  }
}

module.exports = PriceData;
