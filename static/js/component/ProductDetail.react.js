/*
Copyright (c) 2011-2012 Weizoom Inc
*/
var React = require('react');
var ProductStore = require('../store/ProductStore');
var ShoppingCartStore = require('../store/ShoppingCartStore');
var ProductAction = require('../action/ProductAction');
var ShoppingCartAction = require('../action/ShoppingCartAction');
var debug = require('debug')('mall:ProductDetailView');
var classNames = require('classnames');

var ProductDetail = React.createClass({
	getInitialState: function() {
		return {
			isLiked: false,
			shoppingCartProductCount: 0,
		}
	},

	componentDidMount: function() {
		ProductStore.addListener(this.onProductStoreChange);
		ShoppingCartStore.addListener(this.onShoppingCartStoreChange);
		ProductAction.loadRealtimeData(this.props.product._id);
		ShoppingCartAction.getProductCount();
	},

	onProductStoreChange: function() {
		debug('re render with %s', JSON.stringify(ProductStore.getRealtimeData()));
		this.setState(ProductStore.getRealtimeData());
	},

	onShoppingCartStoreChange: function() {
		debug('re render with %s', ShoppingCartStore.getProductCount());
		this.setState({
			shoppingCartProductCount: ShoppingCartStore.getProductCount()
		});
	},

	onClickLikeBtn: function(event) {
		debug('handle click like button');
		ProductAction.toggleLike(this.props.product._id, !this.state.isLiked);
	},

	onClickAddShoppingCartBtn: function(event) {
		debug('handle click add_to_shopping_cart button');
		ShoppingCartAction.addProduct(this.props.product._id, 1);
	},

	render: function() {
		var product = this.props.product;
		var likeBtnClass = classNames({
			btn: true,
			"cui-i-likeBtn": true,
			"btn-default": this.state.isLiked,
			"btn-danger": !this.state.isLiked
		});
		//var likeBtnClass = this.state.isLiked ? 'btn btn-default cui-i-likeBtn' : 'btn btn-danger cui-i-likeBtn';
		var productCountClass = this.state.shoppingCartProductCount == 0 ? 'xui-hide' : 'cui-i-productCount'; 
		var hintClass = this.state.shouldShowHint ? 'cui-i-flyHint' : 'xui-hide';

		var style = {
			width: "85%"
		};

		return (
			<div className="cui-productDetail pr">
				<div className="cui-i-pic">
					<img src={product.thumbnails_url} />
				</div>

				<div className="cui-i-header pr">
					<h3 className="cui-i-productName m10">
						{product.name}
					</h3>

					<button className={likeBtnClass} onClick={this.onClickLikeBtn}>{this.state.isLiked ? '取消收藏' : '收藏'}</button>
				</div>

				<div className="cui-i-shoppingCart">
					<div className="cui-i-cart pr">
						<div className={productCountClass}>{this.state.shoppingCartProductCount}</div>
					</div>
					<button className="btn btn-success ml10" onClick={this.onClickAddShoppingCartBtn} style={style}>加入购物车</button>
				</div>

				<div className={hintClass}>
					{this.state.hint}
				</div>
			</div>
		);
	}
});

module.exports = ProductDetail;