/*
Copyright (c) 2011-2012 Weizoom Inc
*/
var ProductConstant = require('../constant/ProductConstant');
var ProductDispatcher = require('../dispatcher/ProductDispatcher');
var debug = require('debug')('mall:ProductAction');
var Resource = require('../util/Resource');
var _ = require('underscore');

var ProductAction = {
	toggleLike: function(productId, isLiked) {
		debug('dispatch %s', ProductConstant.PRODUCT_TOGGLE_LIKE);
		_.delay(function() {
			Resource.post({
				resource: 'mall.product_realtime_data',
				data: {
					id: productId,
					is_liked: isLiked
				},
				dispatch: {
					dispatcher: ProductDispatcher,
					actionType: ProductConstant.PRODUCT_RESOURCE_RESPONSE_REALTIME_DATA,
					data: {
						isLiked: isLiked
					}
				}
			});
		}, 1000);

		ProductDispatcher.dispatch({
			actionType: ProductConstant.PRODUCT_WAIT_REALTIME_DATA
		});
	},

	loadRealtimeData: function(productId) {
		debug('dispatch %s', ProductConstant.PRODUCT_LOAD_REALTIME_DATA);
		Resource.get({
			resource: 'mall.product_realtime_data',
			data: {
				id: productId
			},
			dispatch: {
				dispatcher: ProductDispatcher,
				actionType: ProductConstant.PRODUCT_RESOURCE_RESPONSE_REALTIME_DATA
			}
		});
	}
}

module.exports = ProductAction;