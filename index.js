const EventEmitter = require("events");
const Bottleneck = require("bottleneck");
const request = require("request-promise-native");
const _ = require("underscore");

const ItemData = require("./modules/itemdata.js");
const Item = require("./modules/item.js");
const League = require("./modules/league.js");

const API = {
  itemData: "https://api.poe.watch/itemdata",
  categories: "https://api.poe.watch/categories",
  leagues: "https://api.poe.watch/leagues",
  item: "https://api.poe.watch/item",
}

const DEFAULT_OPTIONS = {
  autoUpdate: true
}

const limiter = new Bottleneck({
  maxConcurrent: 5,
  reservoir: 5,
  reservoirRefreshAmount: 5,
  reservoirRefreshInterval: 1000
});

class PoeWatch extends EventEmitter {
  /**
  * @constructor
  * @param {Object}   [options]
  * @param {boolean}  [options.autoUpdate=true] Requests league, item data and category data from poe.watch when creating a new `PoeWatch` object
  */
  constructor(options) {
    super();

    this.options = _.defaults(options, DEFAULT_OPTIONS);
    this.updating = false;
    this.ready = false;

    this.itemData = [];
    this.categories = [];
    this.leagues = [];

    if(this.options.autoUpdate) {
      this.update()
      .catch((error) => {
        /**
        * Emitted when an error occurred while updating on creation. Only emitted when `options.autoUpdate` is set to `true`
        *
        * @event PoeWatch#error
        * @type {Object}
        */
        this.emit("error", error);
      })
    }
  }

  /**
  * Requests league, item data and category data from poe.watch and stores them
  *
  * @returns {Promise}
  */
  update() {
    let self = this;

    return new Promise(function(resolve, reject) {
      if(!self.updating) {
        self.updating = true;

        Promise.all([self.requestCategories(), self.requestLeagues(), self.requestItemdata()])
        .then(() => {
          return resolve();
        })
        .catch((error) => {
          return reject(error);
        })
        .then(() => {
          self.updating = false;
          return;
        });
      } else {
        return reject(new Error("An update is already in progress"));
      }
    });
  }

  /**
  * Requests league data from poe.watch
  *
  * @returns {Promise<Object>}
  */
  requestLeagues() {
    let self = this;

    return new Promise(function(resolve, reject) {
      limiter.schedule(() => request(API.leagues, { json: true }))
      .then((response) => {
        self.leagues = response;
        self._checkReady();

        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
    });
  }

  /**
  * Requests item data data from poe.watch
  *
  * @returns {Promise<Object>}
  */
  requestItemdata() {
    let self = this;

    return new Promise(function(resolve, reject) {
      limiter.schedule(() => request(API.itemData, { json: true }))
      .then((response) => {
        self.itemData = response;
        self._checkReady();

        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
    });
  }

  /**
  * Requests category data from poe.watch
  *
  * @returns {Promise<Object>}
  */
  requestCategories() {
    let self = this;

    return new Promise(function(resolve, reject) {
      limiter.schedule(() => request(API.categories, { json: true }))
      .then((response) => {
        self.categories = response;
        self._checkReady();

        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
    });
  }

  /**
  * Returns item data including price data for a specific item
  * Item data must be requested with [.requestItemdata()](#PoeWatch+requestItemdata) before using this method
  *
  * @param   {Object}    properties An object containing one or more properties of the item
  * @param   {number}    [properties.id] poe.watch ID of the item
  * @param   {string}    [properties.name] Item name
  * @param   {string}    [properties.type] Base type
  * @param   {number}    [properties.frame] Frame type
  * @param   {number}    [properties.tier] Map tier
  * @param   {number}    [properties.lvl] Level (e.g. gem level)
  * @param   {number}    [properties.quality] Quality (e.g. gem quality)
  * @param   {boolean}   [properties.corrupted] Whether the item is corrupted or not
  * @param   {number}    [properties.links] Count of links
  * @param   {number}    [properties.ilvl] Item level
  * @param   {string}    [properties.var] Variation
  * @param   {number}    [properties.relic] Whether the item is a relic or not. `true` always sets `properties.frame` to `9`
  * @param   {string}    [properties.icon] Icon URL
  * @param   {string}    [properties.category] Item category
  * @param   {string}    [properties.group] Item category group
  * @returns {Item}
  */
  requestItem(properties) {
    let self = this;
    let itemData = this.getItemData(properties);

    return new Promise(function(resolve, reject) {
      if(!self.isReady()) {
        return reject(new Error("API data is not updated"))
      }

      if(!itemData) {
        return reject(new Error("Invalid item properties"));
      }

      limiter.schedule(() => request(API.item + "?id=" + itemData.getId(), { json: true }))
      .then((response) => {
        let item = new Item(response, itemData.getId());

        return resolve(item);
      })
      .catch((error) => {
        return reject(error);
      });
    });
  }

  /**
  * Returns item data for a specific item
  * Item data must be requested with [.requestItemdata()](#PoeWatch+requestItemdata) or [.update()](#PoeWatch+update) before using this method
  *
  * @param   {Object}    properties An object containing one or more properties of the item
  * @param   {number}    [properties.id] poe.watch ID of the item
  * @param   {string}    [properties.name] Item name
  * @param   {string}    [properties.type] Base type
  * @param   {number}    [properties.frame] Frame type
  * @param   {number}    [properties.tier] Map tier
  * @param   {number}    [properties.lvl] Level (e.g. gem level)
  * @param   {number}    [properties.quality] Quality (e.g. gem quality)
  * @param   {boolean}   [properties.corrupted] Whether the item is corrupted or not
  * @param   {number}    [properties.links] Count of links
  * @param   {number}    [properties.ilvl] Item level
  * @param   {string}    [properties.var] Variation
  * @param   {number}    [properties.relic] Whether the item is a relic or not. `true` always sets `properties.frame` to `9`
  * @param   {string}    [properties.icon] Icon URL
  * @param   {string}    [properties.category] Item category
  * @param   {string}    [properties.group] Item category group
  * @returns {ItemData}
  */
  getItemData(properties) {
    if(this.hasItemData() && typeof properties === "object" && Object.keys(properties).length > 0) {
      if("relic" in properties) {
        properties.frame = 9;
        delete properties.relic;
      }

      let itemData = _.findWhere(this.itemData, properties);

      if(itemData) {
        return new ItemData(itemData);
      }
    }

    return;
  }

  /**
  * Returns league data for a specific league
  * League data must be requested with [.requestLeagues()](#PoeWatch+requestLeagues) or [.update()](#PoeWatch+update) before using this method
  * Only the most useful properties are listed below. You can use any property of a league from the poe.watch API though, please refer to the API structure [here](https://api.poe.watch/leagues)
  *
  * @param   {Object}    properties An object containing one or more properties of the league
  * @param   {number}    [properties.id] ID of the league
  * @param   {string}    [properties.name] League name
  * @returns {League}
  */
  getLeague(query) {
    if(this.hasLeagues()) {
      let league = _.findWhere(this.leagues, query);

      if(league) {
        return new League(league);
      }
    }

    return;
  }

  /**
  * Returns `true` if data is currently being updated
  *
  * @returns {boolean}
  */
  isUpdating() {
    return this.updating;
  }

  /**
  * Returns `true` if all data is available and the API is ready to be used
  *
  * @returns {boolean}
  */
  isReady() {
    return this.ready;
  }

  /**
  * Returns `true` if league data is available
  *
  * @returns {boolean}
  */
  hasLeagues() {
    if(this.leagues.length !== 0) {
      return true;
    }

    return false;
  }

  /**
  * Returns `true` if item data is currently being updated
  *
  * @returns {boolean}
  */
  hasItemData() {
    if(this.itemData.length !== 0) {
      return true;
    }

    return false;
  }

  /**
  * Returns `true` if category data is currently being updated
  *
  * @returns {boolean}
  */
  hasCategories() {
    if(this.categories.length !== 0) {
      return true;
    }

    return false;
  }

  /**
  * Checks if the API is ready to be used
  *
  * @private
  * @returns {boolean}
  */
  _checkReady() {
    if(!this.ready && this.hasItemData() && this.hasCategories() && this.hasLeagues()) {
      this.ready = true;

      if(this.options.autoUpdate) {
        /**
        * Emitted when all data has been requested successfully. Only emitted when `options.autoUpdate` is set to `true`
        *
        * @event PoeWatch#ready
        * @type {Object}
        */
        this.emit("ready");
      }

      return true;
    }

    return false;
  }
}

module.exports = PoeWatch;
