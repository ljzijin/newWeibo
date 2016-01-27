/*
Copyright (c) 2011-2012 Weizoom Inc
*/
var ShoppingCartConstant = require('../constant/ShoppingCartConstant');
var ProductDispatcher = require('../dispatcher/ProductDispatcher');
var debug = require('debug')('mall:ShoppingCartAction');
var Resource = require('../util/Resource');
var _ = require('underscore');

var ShoppingCartAction = {
	getProductCount: function() {
		Resource.get({
			resource: 'mall.shopping_cart_product_count',
			data: {},
			dispatch: {
				dispatcher: ProductDispatcher,
				actionType: ShoppingCartConstant.SHOPPING_CART_RESOURCE_RESPONSE,
			}
		});
	},

	addProduct: function(productId, count) {
		_.delay(function() {
			Resource.put({
				resource: 'mall.shopping_cart_item',
				data: {
					product_id: productId,
					count: count
				},
				dispatch: {
					dispatcher: ProductDispatcher,
					actionType: ShoppingCartConstant.SHOPPING_CART_RESOURCE_RESPONSE,
				}
			});
		}, 1000);

		ProductDispatcher.dispatch({
			actionType: ShoppingCartConstant.SHOPPING_CART_WAIT_CREATE_ITEM
		});
	}
}

module.exports = ShoppingCartAction;