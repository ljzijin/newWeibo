# -*- coding: utf-8 -*-
from django.conf import settings

class PageInfo(object):
	def __init__(self):
		self.has_prev = None
		self.has_next = None
		self.has_head = None
		self.has_tail = None
		self.prev = None
		self.next = None
		self.cur_page = None
		self.max_page = None
		self.object_count = 0
		self.query_string = None
		self.display_pages = []
		
	def __str__(self):
		buffer = []
		buffer.append("has_prev:%s" % self.has_prev)
		buffer.append("has_next:%s" % self.has_next)
		buffer.append("has_head:%s" % self.has_head)
		buffer.append("has_tail:%s" % self.has_tail)
		buffer.append("prev:%s" % self.prev)
		buffer.append("next:%s" % self.next)
		buffer.append("cur_page:%s" % self.cur_page)
		buffer.append("max_page:%s" % self.max_page)
		buffer.append("display_pages:%s" % self.display_pages)
		return '\n'.join(buffer)
	
	def __getstate__(self):
		return self.__dict__
		
	def __setstate__(self, dict):
		self.__dict__.update(dict)


#===============================================================================
# __get_total_page_count : 获取显示页面的总数
#===============================================================================
def __get_total_page_count(item_count, item_count_per_page):
	if item_count % item_count_per_page == 0:
		total_page = item_count/item_count_per_page
		if total_page == 0:
			total_page = 1
	else:
		total_page = item_count/item_count_per_page + 1
	
	return total_page


#===============================================================================
# __get_curpage_item_range : 获得当前页显示的item集合的范围
#===============================================================================
def __get_curpage_item_range(cur_page, item_count_per_page):
	#读取cur_page那个页面对应的数据
	#cur_page从1开始，所以需要减1
	start = (cur_page-1) * item_count_per_page
	end = start + item_count_per_page
	return start, end


#===============================================================================
# __paginate : 进行分页处理
#===============================================================================
def __paginate(objects, cur_page, item_count_per_page):
	#
	#计算page info
	#
	page_info = PageInfo()
	
	#计算总页数
	if hasattr(objects, 'item_count'):
		print 'use item_count'
		item_count = objects.item_count
	else:
		try:
			item_count = objects.count()
		except:
			item_count = len(objects)
	page_info.object_count = item_count
	total = __get_total_page_count(item_count, item_count_per_page)
	
	cur_page = int(cur_page)
	page_info.max_page = total
	page_info.cur_page = cur_page

	if cur_page == total:
		page_info.has_tail = False
	else:
		page_info.has_tail = True

	if cur_page == 1:
		page_info.has_prev = False
		page_info.has_head = False
	else:
		page_info.prev = cur_page - 1
		page_info.has_head = True
		page_info.has_prev = True
	if cur_page >= total:
		page_info.has_next = False
	else:
		page_info.next = cur_page + 1
		page_info.has_next = True
		
	#
	#计算需要显示的页数序列
	#
	if page_info.max_page <= 5:
		page_info.display_pages = range(1, page_info.max_page+1)
	elif cur_page + 2 <= page_info.max_page:
		if cur_page >= 3:
			page_info.display_pages = range(cur_page-2, cur_page+3)
		else:
			page_info.display_pages = range(1, 6)
	else:
		if cur_page >= 5:
			page_info.display_pages = range(page_info.max_page-5, page_info.max_page+1)
		
	#
	#获取当前page应包含的对象列表
	#
	start, end = __get_curpage_item_range(cur_page, item_count_per_page)
	curpage_objects = objects[start:end]

	return page_info, curpage_objects
	 

#===============================================================================
# paginate : 分页的外部接口
#===============================================================================
def paginate(objects, cur_page, item_count_per_page, query_string=None, field=None):
#	if settings.MODE == 'test':
#		item_count_per_page = 2
	
	if field:
		objects = objects.values_list(field, flat=True)
	page_info, curpage_objects = __paginate(objects, cur_page, item_count_per_page)
	if query_string:
		page_info.query_string = query_string
	return page_info, curpage_objects