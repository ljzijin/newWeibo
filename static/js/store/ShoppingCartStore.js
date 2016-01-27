/*
Copyright (c) 2011-2012 Weizoom Inc
*/
var ShoppingCartConstant = require('../constant/ShoppingCartConstant');
var ProductDispatcher = require('../dispatcher/ProductDispatcher');
var EventEmitter = require('events').EventEmitter
var assign = require('object-assign');
var _ = require('underscore');
var debug = require('debug')('mall:ShoppingCartStore');
var StoreUtil = require('../util/StoreUtil');

var ShoppingCartStore = StoreUtil.createStore(ProductDispatcher, {
	name: 'ShoppingCartStore',

	actions: {
		'handleShoppingCartResponse': ShoppingCartConstant.SHOPPING_CART_RESOURCE_RESPONSE
	},

	init: function() {
		this.data = {
			productCount: 0,
			products: []
		}
	},

	handleShoppingCartResponse: function(action) {
		this.data.productCount = action.data.productCount;
		this.__emitChange();
	},

	getProductCount: function() {
		return this.data.productCount;
	}
})

module.exports = ShoppingCartStore;