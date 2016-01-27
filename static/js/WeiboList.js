'use strict';
window.WeiboList = React.createClass({
    handleClick:function(event){
        content=this.refs.myTextInput.value;
        console.log(content);
        $.ajax({
            url:'/weibo/create_blog/',
            type:'post',
            data:{
            'content':content,    
            },
            success:function(resp){
                if(resp.code==200){
                    location.href="/weibo/index/"
                    console.log(this.props.blogs)
                }
                else{
                    alert(resp.errMsg)
                }
            },
            error:function(){
                console.log('save_blog_content_fail...')
            }
        })

    },

    // handleChange: function(event) {
    //       this.setState({value: event.target.value});
    // },
    render: function() {
        var blogs = JSON.parse(this.props.blogs);
        console.log("=====");
        var total_count=this.props.total_count;
        console.log(total_count);
        console.log('++++++++++++++++++++')
        return (
            <div className="cui-container">
            	<div>请发布你的微博吧！</div>
                <textarea className="cui-blog-input xa-input" ref="myTextInput"></textarea>
                <button className="btn btn-primary mb20 cui-blog-submit" onClick={this.handleClick}>点我一下</button>
                <BlogList blogs={blogs}/>
            </div>
        )
    }
  });
