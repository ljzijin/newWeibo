#-*-coding:utf-8-*-
from django.contrib import admin
from django.conf.urls import *
import views

urlpatterns=patterns('',
	url(r'^index/',views.index),
	url(r'^create_blog/$',views.create_blog),
	url(r'^comment_blog/',views.comment_blog),
	)