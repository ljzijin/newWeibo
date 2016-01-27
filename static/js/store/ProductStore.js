/*
Copyright (c) 2011-2012 Weizoom Inc
*/
var ProductConstant = require('../constant/ProductConstant');
var ShoppingCartConstant = require('../constant/shoppingCartConstant');
var ProductDispatcher = require('../dispatcher/ProductDispatcher');
var EventEmitter = require('events').EventEmitter
var assign = require('object-assign');
var _ = require('underscore');
var debug = require('debug')('mall:ProductStore');
var StoreUtil = require('../util/StoreUtil');

var ProductStore = StoreUtil.createStore(ProductDispatcher, {
	name: 'ProductStore',

	actions: {
		'handleRealtimeDataResource': ProductConstant.PRODUCT_RESOURCE_RESPONSE_REALTIME_DATA,
		'handleWaitRealtimeData': ProductConstant.PRODUCT_WAIT_REALTIME_DATA,
		'handleWaitAddShoppingCartItem': ShoppingCartConstant.SHOPPING_CART_WAIT_CREATE_ITEM,
		'handleAddShoppingCartItemResponse': ShoppingCartConstant.SHOPPING_CART_RESOURCE_RESPONSE
	},

	init: function() {
		this.realtimeData = {
			isLiked: false,
			shoppingCartProductCount: 0,
			shouldShowHint: false,
			hint: '',
		}
	},

	handleRealtimeDataResource: function(action) {
		this.realtimeData.shouldShowHint = false;
		this.realtimeData.hint = '';
		this.realtimeData.isLiked = action.data.isLiked;
		this.__emitChange();
	},

	handleWaitRealtimeData: function(action) {
		this.realtimeData.shouldShowHint = true;
		this.realtimeData.hint = '数据获取...'
		this.__emitChange();
	},

	handleWaitAddShoppingCartItem: function(action) {
		this.realtimeData.shouldShowHint = true;
		this.realtimeData.hint = '添加到购物车...'
		this.__emitChange();
	},

	handleAddShoppingCartItemResponse: function(action) {
		this.realtimeData.shouldShowHint = false;
		this.realtimeData.hint = ''
		this.__emitChange();
	},

	getRealtimeData: function() {
		return this.realtimeData;
	}
})

module.exports = ProductStore;