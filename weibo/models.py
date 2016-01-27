#-*- encoding:utf-8 -*-
from django.db import models

# Create your models here.
class Blog(models.Model):
	blog_user=models.IntegerField()#所属用户id
	blog_content=models.CharField(max_length=1024)#微博内容
	created_at=models.DateTimeField(auto_now_add=True)#微博创建时间

	class Meta(object):
		db_table='weibo_blog'

class BlogComment(models.Model):
	comment_user_id = models.IntegerField()#评论所属用户id
	blog_id = models.IntegerField()#微博id
	comment_content = models.CharField(max_length=1024)#评论内容
	created_at = models.DateTimeField(auto_now_add=True)#评论时间

	class Meta(object):
		db_table='blog_comment'
