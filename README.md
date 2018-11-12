# poe-watch-api
[![NPM version](https://img.shields.io/npm/v/poe-watch-api.svg)](https://www.npmjs.com/package/poe-watch-api)
[![NPM Downloads](https://img.shields.io/npm/dt/poe-watch-api.svg)](https://www.npmjs.com/package/poe-watch-api)
[![NPM License](https://img.shields.io/npm/l/poe-watch-api.svg)](https://www.npmjs.com/package/poe-watch-api)

## Getting Started
**Install with npm:**
```bash
$ npm install poe-watch-api
```

**Integration:**
```javascript
const PoeWatch = require("poe-watch-api");
```

**Example usage:**

Before you can do something with data from the API, `categories`, `leagues` and `itemdata` must be updated.  This happens automatically once you create a new [<code>PoeWatch</code>](#PoeWatch) object unless you set `autoUpdate` to `false`. If you want to start doing things as soon as possible you should consider using the [<code>ready</code>](#PoeWatch+event_ready) event, which is emitted once the above data has been updated.

```javascript
let poeWatch = new PoeWatch();

poeWatch.on("ready", () => {
  // Request data for a 6-linked relic Shavronne's Wrappings
  poeWatch.requestItem({name: "Shavronne's Wrappings", links: 6, relic: true})
  .then((item) => {
    // Get the sparkline of the median value of the last week in Standard league
    let medianSparkline = item.getPriceDataByLeague("Standard").getHistory().getSparkline("median", 7);
    console.log("Median value history of last week: " + medianSparkline.toString());
  })
  .catch((error) => {
    console.error("An error occurred", error);
  });
});
```

You can also update the data yourself by setting `autoUpdate` to `false` and using the [<code>.update()</code>](#PoeWatch+update) method.

```javascript
let poeWatch = new PoeWatch({autoUpdate: false});

poeWatch.update()
.then(() => {
  return poeWatch.requestItem({name: "Exalted Orb"});
})
.then((item) => {
  let meanValue = item.getPriceDataByLeague("Standard").getMean();
  console.log("Exalted Orbs are currently worth " + meanValue + " Chaos Orbs in Standard league");
})
.catch((error) => {
  console.error("An error occurred", error);
});
```

Alternatively you can create a [<code>PoeWatch</code>](#PoeWatch) object and make sure it's ready with the [<code>.isReady()</code>](#PoeWatch+isReady) method if you need the API at a later time.

## Classes

<dl>
<dt><a href="#PoeWatch">PoeWatch</a></dt>
<dd></dd>
<dt><a href="#History">History</a></dt>
<dd></dd>
<dt><a href="#Item">Item</a> ⇐ <code><a href="#ItemData">ItemData</a></code></dt>
<dd></dd>
<dt><a href="#ItemData">ItemData</a></dt>
<dd></dd>
<dt><a href="#League">League</a></dt>
<dd></dd>
<dt><a href="#PriceData">PriceData</a></dt>
<dd></dd>
</dl>

<a name="PoeWatch"></a>

## PoeWatch
**Kind**: global class  

* [PoeWatch](#PoeWatch)
    * [new PoeWatch([options])](#new_PoeWatch_new)
    * [.update()](#PoeWatch+update) ⇒ <code>Promise</code>
    * [.requestLeagues()](#PoeWatch+requestLeagues) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.requestItemdata()](#PoeWatch+requestItemdata) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.requestCategories()](#PoeWatch+requestCategories) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.requestItem(properties)](#PoeWatch+requestItem) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
    * [.getItemData(properties)](#PoeWatch+getItemData) ⇒ [<code>ItemData</code>](#ItemData)
    * [.getLeague(properties)](#PoeWatch+getLeague) ⇒ [<code>League</code>](#League)
    * [.isUpdating()](#PoeWatch+isUpdating) ⇒ <code>boolean</code>
    * [.isReady()](#PoeWatch+isReady) ⇒ <code>boolean</code>
    * [.hasLeagues()](#PoeWatch+hasLeagues) ⇒ <code>boolean</code>
    * [.hasItemData()](#PoeWatch+hasItemData) ⇒ <code>boolean</code>
    * [.hasCategories()](#PoeWatch+hasCategories) ⇒ <code>boolean</code>
    * ["error"](#PoeWatch+event_error)
    * ["ready"](#PoeWatch+event_ready)

<a name="new_PoeWatch_new"></a>

### new PoeWatch([options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.autoUpdate] | <code>boolean</code> | <code>true</code> | Requests league, item data and category data from poe.watch when creating a new `PoeWatch` object |

<a name="PoeWatch+update"></a>

### poeWatch.update() ⇒ <code>Promise</code>
Requests league, item data and category data from poe.watch and stores them

**Kind**: instance method of [<code>PoeWatch</code>](#PoeWatch)  
<a name="PoeWatch+requestLeagues"></a>

### poeWatch.requestLeagues() ⇒ <code>Promise.&lt;Object&gt;</code>
Requests league data from poe.watch

**Kind**: instance method of [<code>PoeWatch</code>](#PoeWatch)  
<a name="PoeWatch+requestItemdata"></a>

### poeWatch.requestItemdata() ⇒ <code>Promise.&lt;Object&gt;</code>
Requests item data data from poe.watch

**Kind**: instance method of [<code>PoeWatch</code>](#PoeWatch)  
<a name="PoeWatch+requestCategories"></a>

### poeWatch.requestCategories() ⇒ <code>Promise.&lt;Object&gt;</code>
Requests category data from poe.watch

**Kind**: instance method of [<code>PoeWatch</code>](#PoeWatch)  
<a name="PoeWatch+requestItem"></a>

### poeWatch.requestItem(properties) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
Returns item data including price data for a specific item

Item data must be requested with [.requestItemdata()](#PoeWatch+requestItemdata) or [.update()](#PoeWatch+update) before using this method

**Kind**: instance method of [<code>PoeWatch</code>](#PoeWatch)  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | An object containing one or more properties of the item |
| [properties.id] | <code>number</code> | poe.watch ID of the item |
| [properties.name] | <code>string</code> | Item name |
| [properties.type] | <code>string</code> | Base type |
| [properties.frame] | <code>number</code> | Frame type |
| [properties.tier] | <code>number</code> | Map tier |
| [properties.lvl] | <code>number</code> | Level (e.g. gem level) |
| [properties.quality] | <code>number</code> | Quality (e.g. gem quality) |
| [properties.corrupted] | <code>boolean</code> | Whether the item is corrupted or not |
| [properties.links] | <code>number</code> | Count of links |
| [properties.ilvl] | <code>number</code> | Item level |
| [properties.var] | <code>string</code> | Variation |
| [properties.relic] | <code>number</code> | Whether the item is a relic or not. `true` always sets `properties.frame` to `9` |
| [properties.icon] | <code>string</code> | Icon URL |
| [properties.category] | <code>string</code> | Item category |
| [properties.group] | <code>string</code> | Item category group |

<a name="PoeWatch+getItemData"></a>

### poeWatch.getItemData(properties) ⇒ [<code>ItemData</code>](#ItemData)
Returns item data for a specific item

Item data must be requested with [.requestItemdata()](#PoeWatch+requestItemdata) or [.update()](#PoeWatch+update) before using this method

**Kind**: instance method of [<code>PoeWatch</code>](#PoeWatch)  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | An object containing one or more properties of the item |
| [properties.id] | <code>number</code> | poe.watch ID of the item |
| [properties.name] | <code>string</code> | Item name |
| [properties.type] | <code>string</code> | Base type |
| [properties.frame] | <code>number</code> | Frame type |
| [properties.tier] | <code>number</code> | Map tier |
| [properties.lvl] | <code>number</code> | Level (e.g. gem level) |
| [properties.quality] | <code>number</code> | Quality (e.g. gem quality) |
| [properties.corrupted] | <code>boolean</code> | Whether the item is corrupted or not |
| [properties.links] | <code>number</code> | Count of links |
| [properties.ilvl] | <code>number</code> | Item level |
| [properties.var] | <code>string</code> | Variation |
| [properties.relic] | <code>number</code> | Whether the item is a relic or not. `true` always sets `properties.frame` to `9` |
| [properties.icon] | <code>string</code> | Icon URL |
| [properties.category] | <code>string</code> | Item category |
| [properties.group] | <code>string</code> | Item category group |

<a name="PoeWatch+getLeague"></a>

### poeWatch.getLeague(properties) ⇒ [<code>League</code>](#League)
Returns league data for a specific league

League data must be requested with [.requestLeagues()](#PoeWatch+requestLeagues) or [.update()](#PoeWatch+update) before using this method

Only the most useful properties are listed below. You can use any property of a league from the poe.watch API though, please refer to the API structure [here](https://api.poe.watch/leagues)

**Kind**: instance method of [<code>PoeWatch</code>](#PoeWatch)  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | An object containing one or more properties of the league |
| [properties.id] | <code>number</code> | ID of the league |
| [properties.name] | <code>string</code> | League name |

<a name="PoeWatch+isUpdating"></a>

### poeWatch.isUpdating() ⇒ <code>boolean</code>
Returns `true` if data is currently being updated

**Kind**: instance method of [<code>PoeWatch</code>](#PoeWatch)  
<a name="PoeWatch+isReady"></a>

### poeWatch.isReady() ⇒ <code>boolean</code>
Returns `true` if all data is available and the API is ready to be used

**Kind**: instance method of [<code>PoeWatch</code>](#PoeWatch)  
<a name="PoeWatch+hasLeagues"></a>

### poeWatch.hasLeagues() ⇒ <code>boolean</code>
Returns `true` if league data is available

**Kind**: instance method of [<code>PoeWatch</code>](#PoeWatch)  
<a name="PoeWatch+hasItemData"></a>

### poeWatch.hasItemData() ⇒ <code>boolean</code>
Returns `true` if item data is currently being updated

**Kind**: instance method of [<code>PoeWatch</code>](#PoeWatch)  
<a name="PoeWatch+hasCategories"></a>

### poeWatch.hasCategories() ⇒ <code>boolean</code>
Returns `true` if category data is currently being updated

**Kind**: instance method of [<code>PoeWatch</code>](#PoeWatch)  
<a name="PoeWatch+event_error"></a>

### "error"
Emitted when an error occurred while updating on creation. Only emitted when `options.autoUpdate` is set to `true`

**Kind**: event emitted by [<code>PoeWatch</code>](#PoeWatch)  
<a name="PoeWatch+event_ready"></a>

### "ready"
Emitted when all data has been requested successfully. Only emitted when `options.autoUpdate` is set to `true`

**Kind**: event emitted by [<code>PoeWatch</code>](#PoeWatch)  
<a name="History"></a>

## History
**Kind**: global class  

* [History](#History)
    * [.getLast([count])](#History+getLast) ⇒ <code>Array</code>
    * [.getSparkline([type], [count])](#History+getSparkline) ⇒ <code>Array</code>

<a name="History+getLast"></a>

### history.getLast([count]) ⇒ <code>Array</code>
Returns the latest `count` entries (days) of the history in an array

**Kind**: instance method of [<code>History</code>](#History)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [count] | <code>Number</code> | <code>max</code> | The count of the last entries (days) that should be returned. Defaults to the full history |

<a name="History+getSparkline"></a>

### history.getSparkline([type], [count]) ⇒ <code>Array</code>
Returns a sparkline, optionally only of the last `count` entries (days) in an array

**Kind**: instance method of [<code>History</code>](#History)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [type] | <code>&#x27;mean&#x27;</code> \| <code>&#x27;median&#x27;</code> \| <code>&#x27;mode&#x27;</code> \| <code>&#x27;quantity&#x27;</code> | <code>mean</code> | Mean, median, mode or quantity |
| [count] | <code>Number</code> | <code>max</code> | The count of the last entries (days) that should be returned. Defaults to the full history |

<a name="Item"></a>

## Item ⇐ [<code>ItemData</code>](#ItemData)
**Kind**: global class  
**Extends**: [<code>ItemData</code>](#ItemData)  

* [Item](#Item) ⇐ [<code>ItemData</code>](#ItemData)
    * [.getPriceData()](#Item+getPriceData) ⇒ [<code>Array.&lt;PriceData&gt;</code>](#PriceData)
    * [.getPriceDataByLeague(league)](#Item+getPriceDataByLeague) ⇒ [<code>PriceData</code>](#PriceData)
    * [.getId()](#ItemData+getId) ⇒ <code>number</code>
    * [.getName()](#ItemData+getName) ⇒ <code>string</code>
    * [.getType()](#ItemData+getType) ⇒ <code>string</code>
    * [.getFrame()](#ItemData+getFrame) ⇒ <code>string</code>
    * [.getTier()](#ItemData+getTier) ⇒ <code>string</code>
    * [.getLevel()](#ItemData+getLevel) ⇒ <code>string</code>
    * [.getQuality()](#ItemData+getQuality) ⇒ <code>string</code>
    * [.isCorrupted()](#ItemData+isCorrupted) ⇒ <code>string</code>
    * [.getLinks()](#ItemData+getLinks) ⇒ <code>number</code>
    * [.getItemLevel()](#ItemData+getItemLevel) ⇒ <code>number</code>
    * [.getVariation()](#ItemData+getVariation) ⇒ <code>string</code>
    * [.getIcon()](#ItemData+getIcon) ⇒ <code>string</code>
    * [.getCategory()](#ItemData+getCategory) ⇒ <code>string</code>
    * [.getGroup()](#ItemData+getGroup) ⇒ <code>string</code>

<a name="Item+getPriceData"></a>

### item.getPriceData() ⇒ [<code>Array.&lt;PriceData&gt;</code>](#PriceData)
Returns price data for every league

**Kind**: instance method of [<code>Item</code>](#Item)  
**Returns**: [<code>Array.&lt;PriceData&gt;</code>](#PriceData) - Array of PriceData objects for each league holding the price data for the item  
<a name="Item+getPriceDataByLeague"></a>

### item.getPriceDataByLeague(league) ⇒ [<code>PriceData</code>](#PriceData)
Returns price data for a specific league

**Kind**: instance method of [<code>Item</code>](#Item)  
**Returns**: [<code>PriceData</code>](#PriceData) - PriceData object holding the price data for the item  

| Param | Type | Description |
| --- | --- | --- |
| league | <code>string</code> \| <code>number</code> | Name or ID of the league |

<a name="ItemData+getId"></a>

### item.getId() ⇒ <code>number</code>
Returns the poe.watch ID of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+getName"></a>

### item.getName() ⇒ <code>string</code>
Returns the name of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+getType"></a>

### item.getType() ⇒ <code>string</code>
Returns the type of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+getFrame"></a>

### item.getFrame() ⇒ <code>string</code>
Returns the frametype of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+getTier"></a>

### item.getTier() ⇒ <code>string</code>
Returns the map tier of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+getLevel"></a>

### item.getLevel() ⇒ <code>string</code>
Returns the level of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+getQuality"></a>

### item.getQuality() ⇒ <code>string</code>
Returns the quality of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+isCorrupted"></a>

### item.isCorrupted() ⇒ <code>string</code>
Returns `true` if the item is corrupted

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+getLinks"></a>

### item.getLinks() ⇒ <code>number</code>
Returns the links of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+getItemLevel"></a>

### item.getItemLevel() ⇒ <code>number</code>
Returns the item level of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+getVariation"></a>

### item.getVariation() ⇒ <code>string</code>
Returns the variation of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+getIcon"></a>

### item.getIcon() ⇒ <code>string</code>
Returns the URL to the icon of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+getCategory"></a>

### item.getCategory() ⇒ <code>string</code>
Returns the category of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData+getGroup"></a>

### item.getGroup() ⇒ <code>string</code>
Returns the category group of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
<a name="ItemData"></a>

## ItemData
**Kind**: global class  

* [ItemData](#ItemData)
    * [.getId()](#ItemData+getId) ⇒ <code>number</code>
    * [.getName()](#ItemData+getName) ⇒ <code>string</code>
    * [.getType()](#ItemData+getType) ⇒ <code>string</code>
    * [.getFrame()](#ItemData+getFrame) ⇒ <code>string</code>
    * [.getTier()](#ItemData+getTier) ⇒ <code>string</code>
    * [.getLevel()](#ItemData+getLevel) ⇒ <code>string</code>
    * [.getQuality()](#ItemData+getQuality) ⇒ <code>string</code>
    * [.isCorrupted()](#ItemData+isCorrupted) ⇒ <code>string</code>
    * [.getLinks()](#ItemData+getLinks) ⇒ <code>number</code>
    * [.getItemLevel()](#ItemData+getItemLevel) ⇒ <code>number</code>
    * [.getVariation()](#ItemData+getVariation) ⇒ <code>string</code>
    * [.getIcon()](#ItemData+getIcon) ⇒ <code>string</code>
    * [.getCategory()](#ItemData+getCategory) ⇒ <code>string</code>
    * [.getGroup()](#ItemData+getGroup) ⇒ <code>string</code>

<a name="ItemData+getId"></a>

### itemData.getId() ⇒ <code>number</code>
Returns the poe.watch ID of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+getName"></a>

### itemData.getName() ⇒ <code>string</code>
Returns the name of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+getType"></a>

### itemData.getType() ⇒ <code>string</code>
Returns the type of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+getFrame"></a>

### itemData.getFrame() ⇒ <code>string</code>
Returns the frametype of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+getTier"></a>

### itemData.getTier() ⇒ <code>string</code>
Returns the map tier of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+getLevel"></a>

### itemData.getLevel() ⇒ <code>string</code>
Returns the level of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+getQuality"></a>

### itemData.getQuality() ⇒ <code>string</code>
Returns the quality of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+isCorrupted"></a>

### itemData.isCorrupted() ⇒ <code>string</code>
Returns `true` if the item is corrupted

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+getLinks"></a>

### itemData.getLinks() ⇒ <code>number</code>
Returns the links of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+getItemLevel"></a>

### itemData.getItemLevel() ⇒ <code>number</code>
Returns the item level of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+getVariation"></a>

### itemData.getVariation() ⇒ <code>string</code>
Returns the variation of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+getIcon"></a>

### itemData.getIcon() ⇒ <code>string</code>
Returns the URL to the icon of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+getCategory"></a>

### itemData.getCategory() ⇒ <code>string</code>
Returns the category of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="ItemData+getGroup"></a>

### itemData.getGroup() ⇒ <code>string</code>
Returns the category group of the item

**Kind**: instance method of [<code>ItemData</code>](#ItemData)  
<a name="League"></a>

## League
**Kind**: global class  

* [League](#League)
    * [.getId()](#League+getId) ⇒ <code>number</code>
    * [.getName()](#League+getName) ⇒ <code>string</code>
    * [.getDisplayName()](#League+getDisplayName) ⇒ <code>string</code>
    * [.isHardcore()](#League+isHardcore) ⇒ <code>boolean</code>
    * [.isUpcoming()](#League+isUpcoming) ⇒ <code>boolean</code>
    * [.isActive()](#League+isActive) ⇒ <code>boolean</code>
    * [.isEvent()](#League+isEvent) ⇒ <code>boolean</code>
    * [.getStart()](#League+getStart) ⇒ <code>string</code>
    * [.getEnd()](#League+getEnd) ⇒ <code>string</code>
    * [.getDuration()](#League+getDuration) ⇒ <code>Object</code>

<a name="League+getId"></a>

### league.getId() ⇒ <code>number</code>
Returns the ID of the league

**Kind**: instance method of [<code>League</code>](#League)  
<a name="League+getName"></a>

### league.getName() ⇒ <code>string</code>
Returns the internal name of the league

**Kind**: instance method of [<code>League</code>](#League)  
<a name="League+getDisplayName"></a>

### league.getDisplayName() ⇒ <code>string</code>
Returns the display name of the league

**Kind**: instance method of [<code>League</code>](#League)  
<a name="League+isHardcore"></a>

### league.isHardcore() ⇒ <code>boolean</code>
Returns `true` if the league is a hardcore league

**Kind**: instance method of [<code>League</code>](#League)  
<a name="League+isUpcoming"></a>

### league.isUpcoming() ⇒ <code>boolean</code>
Returns `true` if the league has not started yet

**Kind**: instance method of [<code>League</code>](#League)  
<a name="League+isActive"></a>

### league.isActive() ⇒ <code>boolean</code>
Returns `true` if the league is currently active

**Kind**: instance method of [<code>League</code>](#League)  
<a name="League+isEvent"></a>

### league.isEvent() ⇒ <code>boolean</code>
Returns `true` if the league is an event league

**Kind**: instance method of [<code>League</code>](#League)  
<a name="League+getStart"></a>

### league.getStart() ⇒ <code>string</code>
Returns the time the league starts

**Kind**: instance method of [<code>League</code>](#League)  
**Returns**: <code>string</code> - Time in `YYYY-MM-DDThh:mm:ss.sTZD` format  
<a name="League+getEnd"></a>

### league.getEnd() ⇒ <code>string</code>
Returns the time the league ends

**Kind**: instance method of [<code>League</code>](#League)  
**Returns**: <code>string</code> - Time in `YYYY-MM-DDThh:mm:ss.sTZD` format  
<a name="League+getDuration"></a>

### league.getDuration() ⇒ <code>Object</code>
Returns an object containing the total, elapsed and remaining seconds of the league

**Kind**: instance method of [<code>League</code>](#League)  
<a name="PriceData"></a>

## PriceData
**Kind**: global class  

* [PriceData](#PriceData)
    * [.getLeague()](#PriceData+getLeague) ⇒ [<code>League</code>](#League)
    * [.getMean()](#PriceData+getMean) ⇒ <code>number</code>
    * [.getMedian()](#PriceData+getMedian) ⇒ <code>number</code>
    * [.getMode()](#PriceData+getMode) ⇒ <code>number</code>
    * [.getMin()](#PriceData+getMin) ⇒ <code>number</code>
    * [.getMax()](#PriceData+getMax) ⇒ <code>number</code>
    * [.getExalted()](#PriceData+getExalted) ⇒ <code>number</code>
    * [.getCount()](#PriceData+getCount) ⇒ <code>number</code>
    * [.getQuantity()](#PriceData+getQuantity) ⇒ <code>number</code>
    * [.getHistory()](#PriceData+getHistory) ⇒ [<code>History</code>](#History)

<a name="PriceData+getLeague"></a>

### priceData.getLeague() ⇒ [<code>League</code>](#League)
Returns the league information

**Kind**: instance method of [<code>PriceData</code>](#PriceData)  
<a name="PriceData+getMean"></a>

### priceData.getMean() ⇒ <code>number</code>
Returns the mean value of the item

**Kind**: instance method of [<code>PriceData</code>](#PriceData)  
<a name="PriceData+getMedian"></a>

### priceData.getMedian() ⇒ <code>number</code>
Returns the median value of the item

**Kind**: instance method of [<code>PriceData</code>](#PriceData)  
<a name="PriceData+getMode"></a>

### priceData.getMode() ⇒ <code>number</code>
Returns the mode value of the item

**Kind**: instance method of [<code>PriceData</code>](#PriceData)  
<a name="PriceData+getMin"></a>

### priceData.getMin() ⇒ <code>number</code>
Returns the minimum value of the item

**Kind**: instance method of [<code>PriceData</code>](#PriceData)  
<a name="PriceData+getMax"></a>

### priceData.getMax() ⇒ <code>number</code>
Returns the maximum value of the item

**Kind**: instance method of [<code>PriceData</code>](#PriceData)  
<a name="PriceData+getExalted"></a>

### priceData.getExalted() ⇒ <code>number</code>
Returns the value of the item in Exalted Orbs

**Kind**: instance method of [<code>PriceData</code>](#PriceData)  
<a name="PriceData+getCount"></a>

### priceData.getCount() ⇒ <code>number</code>
Returns the total count of listed items

**Kind**: instance method of [<code>PriceData</code>](#PriceData)  
<a name="PriceData+getQuantity"></a>

### priceData.getQuantity() ⇒ <code>number</code>
Returns the count of currently listed items

**Kind**: instance method of [<code>PriceData</code>](#PriceData)  
<a name="PriceData+getHistory"></a>

### priceData.getHistory() ⇒ [<code>History</code>](#History)
Returns the price history of the item

**Kind**: instance method of [<code>PriceData</code>](#PriceData)  
