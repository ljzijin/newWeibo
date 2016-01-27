#-*-encoding:utf-8-*-
from django.shortcuts import render, render_to_response
from django.template import Context,RequestContext
from django.conf import settings
from django.contrib import auth
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, HttpResponse, HttpRequest, Http404
from models import *
from core.jsonresponse import create_response
import json
# Create your views here.
def login(request):
	username=request.POST.get('username','')
	password=request.POST.get('password','')
	user=auth.authenticate(username=username,password=password)
	try:
		if user and user.is_active:
			auth.login(request, user)
			c=RequestContext(request,{
				# 'errMsg':u'用户名或密码错误'
				})
			return HttpResponseRedirect('/weibo/index/')
		else:
			c=RequestContext(request,{
				'errMsg':u'用户名或密码错误'
				})		
			return render_to_response('account/login.html',c)
	except Exception,e:	
		c=RequestContext(request,{
				'errMsg':u'用户名或密码错误'
			})		
		return render_to_response('account/login.html',c)		

def logout(request):
	auth.logout(request)
	c=RequestContext(request,{})
	return render_to_response('account/login.html',c)
	return HttpResponseRedirect('/account/login/')		