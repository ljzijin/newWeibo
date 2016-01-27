# -*- coding: utf-8 -*-
import random
import sys
import traceback
from django.conf import settings

def print_stack_trace():
	"""
	DEBUG模式下打印详细的错误堆栈信息
	"""
	if settings.DEBUG:
		error_type,error_value,error_trace = sys.exc_info()
		traceback.print_exception(error_type,error_value,error_trace)