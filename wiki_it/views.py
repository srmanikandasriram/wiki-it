from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.template.context import Context, RequestContext
from django.shortcuts import render_to_response, redirect
from google.appengine.api import users
from django.conf import settings

def home(request):
  
  user = users.get_current_user()
  if user:
    nickname = user.nickname()
  logout_url = users.create_logout_url(settings.SITE_URL)
  login_url = users.create_login_url(settings.SITE_URL)  
  return render_to_response('home.html', locals(), context_instance=RequestContext(request))  

def login(request):
  user = users.get_current_user()
  if user:
    redirect('wiki_it.views.home')
  return HttpResponseRedirect(users.create_login_url(settings.SITE_URL))  
  
