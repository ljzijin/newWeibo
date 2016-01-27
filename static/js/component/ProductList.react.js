/*
Copyright (c) 2011-2012 Weizoom Inc
*/
var React = require('react');

var ProductList = React.createClass({
	displayName: 'ProductList',

	render: function() {
		var productNodes = this.props.products.map(function(product) {
			console.log(product);
			var productUrl = "/mall/product/?id=" + product._id;
			return (
				<div className="cui-productList-productWrapper">
				<div className="cui-productList-product">
					<a href={productUrl}>
						<img src={product.thumbnails_url} className="cui-i-image" />
						<div className="cui-i-name">
							{product.name}
						</div>
						<div className="cui-i-price">
							{product.price_info.display_price}
						</div>
					</a>
				</div>
				</div>
			)
		});

		return (
			<div className="cui-productList">
				{productNodes}
			</div>
		);
	}
});

module.exports = ProductList;