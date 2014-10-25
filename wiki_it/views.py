from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.template.context import Context, RequestContext
from django.shortcuts import render_to_response, redirect
from google.appengine.api import users
from django.conf import settings
from google.appengine.ext.webapp import template
from forms import AddonForm

def home(request):
  
    user = users.get_current_user()
    if user:
        nickname = user.nickname()
    logout_url = users.create_logout_url(settings.SITE_URL)
    login_url = users.create_login_url(settings.SITE_URL)  
    return render_to_response('home.html', locals(), context_instance=RequestContext(request))  

def addon(request):
    if request.method == "POST":
        addon_form = AddonForm(data=request.POST)
        if addon_form.is_valid():
            addon_form.save()
            return HttpResponseRedirect(settings.SITE_URL)
    else:
        addon_form = AddonForm()
    return render_to_response('addon.html', locals(), context_instance=RequestContext(request))  

def upload(request):
    if request.method == "POST":
        html = request.POST.get('html','Nothing received!')
        return HttpResponse(html)
    else:
        return HttpResponse("It must be a POST request!")
