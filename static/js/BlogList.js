'use strict';
window.BlogList=React.createClass({
	render:function(){
		var blogs=this.props.blogs;
		var _this = this;
		var items = blogs.map(function(blog){
			return (
				<div className="cui-blog-list mt10">
				    <div>{blog.blog_user}</div>
					<div>{blog.blog_content}</div>
					<div className="cui-created_at">{blog.blog_created_at}</div>
				</div>
				)
		})
		return <div>
					{items}
				</div>;
	}
})