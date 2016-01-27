from django.conf.urls import patterns, include, url

from django.contrib import admin
from weibo import views as weibo_view
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'WebZone.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^weibo/', include('weibo.urls')),
    url(r'^account/',include('account.urls')),
)
