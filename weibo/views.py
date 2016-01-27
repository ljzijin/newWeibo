#-*-coding:utf-8 -*-
from django.shortcuts import render, render_to_response
from django.template import Context,RequestContext
from django.conf import settings
from django.contrib import auth
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, HttpResponse, HttpRequest, Http404
from models import *
from core.jsonresponse import create_response, decode_json_str, JsonResponse
import json
HOME_SECOND_NAV=[{
	'navs':[{
		'name':'person_page',
		'title':u'个人主页',
		'url':'',		
		},{
		'name':'friend_list',
		'title':u'好友列表',
		'url':'',
		}]
}]
# Create your views here.
def index(request):
	blogs=Blog.objects.all().order_by('-created_at')
	
	items=[{
		'blog_user':blog.blog_user,
		'blog_content':blog.blog_content,
		'blog_created_at':blog.created_at.strftime('%Y-%m-%d %H:%M:%S'),
	}for blog in blogs]
	total_count=blogs.count()
	c= RequestContext(request,{
		'blogs':json.dumps(items),
		'total_count':total_count,
		})
	return render_to_response('weibo/index.html',c)
#===============================================================
#发布微博
#===============================================================
def create_blog(request):
	blog_user = 1
	blog_content=request.POST.get('content','')
	print blog_content,555555555
	try:
		if blog_content:
			Blog.objects.create(
				blog_user=blog_user,
				blog_content=blog_content,
				)
		response=create_response(200)
	except:
		response=create_response(500)
		response.errMsg='创建失败'
	return response.get_response()			
#===============================================================
#评论微博
#===============================================================	
def comment_blog(request):
	blog_comment=request.POST.get('comment_content','')
	blog_id=request.POST.get('blog_id','')
	comment_user_id=request.user.id
	if blog_id:
		BlogComment.objects.create(
			comment_user_id=comment_user_id,
			blog_id=blog_id,
			comment_content=blog_comment,
			)
		response=create_response(200)
	else:
		response=create_response(500)
		response.errMsg='评论失败'
	return response.get_response()		

