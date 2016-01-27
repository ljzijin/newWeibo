/*
Copyright (c) 2011-2012 Weizoom Inc
*/
var ProductConstant = require('../constant/ProductConstant');
var ProductDispatcher = require('../dispatcher/ProductDispatcher');
var EventEmitter = require('events').EventEmitter
var assign = require('object-assign');
var _ = require('underscore');
var debug = require('debug')('mall:ProductStore');
var StoreUtil = require('../util/StoreUtil');

var realTimeData = {
	isLiked: false,
	shoppingCartProductCount: 0
}

var like = function() {
	realTimeData.isLiked = true;
}

var unlike = function() {
	realTimeData.isLiked = false;	
}

var addProductToShoppingCart = function(count) {
	realTimeData.shoppingCartProductCount = realTimeData.shoppingCartProductCount + count;
}

var CHANGE_EVENT = 'change';

var ProductStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		debug('emit change event');
		this.emit(CHANGE_EVENT);
	},

	getRealtimeData: function() {
		debug('load realtime data');
		return realTimeData;
	},

	loadRealtimeData: function() {
		debug('load realtime data');
		_.delay(_.bind(function() {
			this.emitChange();
		}, this), 1000);
	}
});


ProductDispatcher.register(function(action) {
	switch(action.actionType) {
		case ProductConstant.PRODUCT_LIKE:
			like();
			ProductStore.emitChange();
			break;
		case ProductConstant.PRODUCT_UNLIKE:
			unlike();
			ProductStore.emitChange();
			break;
		case ProductConstant.PRODUCT_ADD_TO_SHOPPING_CART:
			addProductToShoppingCart(action.count)
			ProductStore.emitChange();
			break;
		default:
			//no op
	}
});

module.exports = ProductStore;