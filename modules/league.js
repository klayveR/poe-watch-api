class League {
  /**
  * @constructor
  */
  constructor(data) {
    Object.assign(this, data);
  }

  /**
  * Returns the ID of the league
  *
  * @returns {number}
  */
  getId() {
    return this.id;
  }

  /**
  * Returns the internal name of the league
  *
  * @returns {string}
  */
  getName() {
    return this.name;
  }

  /**
  * Returns the display name of the league
  *
  * @returns {string}
  */
  getDisplayName() {
    return this.display;
  }

  /**
  * Returns `true` if the league is a hardcore league
  *
  * @returns {boolean}
  */
  isHardcore() {
    return this.hardcore;
  }

  /**
  * Returns `true` if the league has not started yet
  *
  * @returns {boolean}
  */
  isUpcoming() {
    return this.upcoming;
  }

  /**
  * Returns `true` if the league is currently active
  *
  * @returns {boolean}
  */
  isActive() {
    return this.active;
  }

  /**
  * Returns `true` if the league is an event league
  *
  * @returns {boolean}
  */
  isEvent() {
    return this.event;
  }

  /**
  * Returns the time the league starts
  *
  * @returns {string} Time in `YYYY-MM-DDThh:mm:ss.sTZD` format
  */
  getStart() {
    return this.start;
  }

  /**
  * Returns the time the league ends
  *
  * @returns {string} Time in `YYYY-MM-DDThh:mm:ss.sTZD` format
  */
  getEnd() {
    return this.end;
  }

  /**
  * Returns an object containing the total, elapsed and remaining seconds of the league
  *
  * @returns {{total: number, elapse: number, remain: number}}
  */
  getDuration() {
    return this.duration;
  }
}

module.exports = League;
