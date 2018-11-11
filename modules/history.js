class History {
  /**
  * @constructor
  */
  constructor(data) {
    this.history = data;
  }

  /**
  * Returns the latest `count` entries (days) of the history in an array
  *
  * @param   {Number} [count=max] The count of the last entries (days) that should be returned. Defaults to the full history
  * @returns {Array}
  */
  getLast(count) {
    if(!count || count > this.history.length) {
      count = this.history.length;
    }

    let startIndex = this.history.length - count;

    if(startIndex >= 0) {
      return this.history.slice(startIndex);
    }

    return this.history;
  }

  /**
  * Returns a sparkline, optionally only of the last `count` entries (days) in an array
  *
  * @param   {('mean'|'median'|'mode'|'quantity')} [type=mean] Mean, median, mode or quantity
  * @param   {Number} [count=max] The count of the last entries (days) that should be returned. Defaults to the full history
  * @returns {Array}
  */
  getSparkline(type, count) {
    let sparkline = [];
    let historyArray = this.getLast(count);

    if(!["mean", "median", "mode", "quantity"].includes(type)) {
      type = "mean";
    }

    for(var index in historyArray) {
      sparkline.push(historyArray[index][type]);
    }

    return sparkline;
  }
}

module.exports = History;
