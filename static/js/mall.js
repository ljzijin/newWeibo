/*
Copyright (c) 2011-2016 Weizoom Inc
*/

'use strict';

require('../css/component.css');

var React = require('react');
var ReactDOM = require('react-dom');

var Mall = require('./component.js');
var ProductList = require('./component/ProductList.react');
var ProductDetail = require('./component/ProductDetail.react');

window.myDebug = require("debug");

$(document).ready(function() {
	myDebug.enable("mall:*");
	
	var $page = $('#page').eq(0);
	var pageNode = $page.get(0);
	var pageName = $page.data('pageName');
	console.log(pageName);

	if (pageName === 'products') {
		ReactDOM.render(<ProductList products={W.products} />, pageNode);
	} else if (pageName === 'product') {
		ReactDOM.render(<ProductDetail product={W.product} />, pageNode);
	}
});