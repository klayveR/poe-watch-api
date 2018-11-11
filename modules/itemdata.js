class ItemData {
  /**
  * @constructor
  */
  constructor(data) {
    Object.assign(this, data);
  }

  /**
  * Returns the poe.watch ID of the item
  *
  * @returns {number}
  */
  getId() {
    return this.id;
  }

  /**
  * Returns the name of the item
  *
  * @returns {string}
  */
  getName() {
    return this.name;
  }

  /**
  * Returns the type of the item
  *
  * @returns {string}
  */
  getType() {
    return this.type;
  }

  /**
  * Returns the frametype of the item
  *
  * @returns {string}
  */
  getFrame() {
    return this.frame;
  }

  /**
  * Returns the map tier of the item
  *
  * @returns {string}
  */
  getTier() {
    return this.tier;
  }

  /**
  * Returns the level of the item
  *
  * @returns {string}
  */
  getLevel() {
    return this.lvl;
  }

  /**
  * Returns the quality of the item
  *
  * @returns {string}
  */
  getQuality() {
    return this.quality;
  }

  /**
  * Returns `true` if the item is corrupted
  *
  * @returns {string}
  */
  isCorrupted() {
    return this.corrupted;
  }

  /**
  * Returns the links of the item
  *
  * @returns {number}
  */
  getLinks() {
    return this.links;
  }

  /**
  * Returns the item level of the item
  *
  * @returns {number}
  */
  getItemLevel() {
    return this.ilvl;
  }

  /**
  * Returns the variation of the item
  *
  * @returns {string}
  */
  getVariation() {
    return this.var;
  }

  /**
  * Returns the URL to the icon of the item
  *
  * @returns {string}
  */
  getIcon() {
    return this.icon;
  }

  /**
  * Returns the category of the item
  *
  * @returns {string}
  */
  getCategory() {
    return this.category;
  }

  /**
  * Returns the category group of the item
  *
  * @returns {group}
  */
  getGroup() {
    return this.group;
  }
}

module.exports = ItemData;
