from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.template.context import Context, RequestContext
from django.shortcuts import render_to_response
from django.conf import settings
from extract import extract_content
import urllib2, json, urllib, urlparse
import datetime
import os

def search(request, url=None):
  if url:
    req = urllib2.Request(url)
    opener = urllib2.build_opener()
    req.add_header('User-Agent', 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.70 Safari/537.17')
    try:
      response = opener.open(req)
      content = response.read()
      text = extract_content(content)
      text = text.replace("href=","target=\"_blank\" href=");
      text = text.replace("href=\"/wiki/","class=\"wiki_link\" href=\"http://en.wikipedia.org/wiki/");
    except urllib2.URLError, e:
      text = "The query did not correspond to a valid wikipedia URL. The query could neither be mapped to a standard wikipedia article as well. :(. Copy and paste the URL of the article for best results. Thank you for using Wiki-It :)"
    '''
    article_name = str(request.POST.get('search-q',''))
    if article_name.find(":") != -1 or article_name.find("Main_Pag") != -1 :
      response = "The URL does not correspond to an article"
    else:
      url = "http://en.wikipedia.org/wiki/" + article_name.replace(' ','_')
      req = urllib2.Request(url)
      opener = urllib2.build_opener()
      req.add_header('User-Agent', 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.70 Safari/537.17')
      response = opener.open(req).read()
      start = response.find("<!-- bodycontent -->")
      response = response[start+20:]
      end = response.find("<!-- /bodycontent -->")
      response = response[:end-1]
      response = response.decode('utf-8')
    return render_to_response('search.html', {'response':response,}, context_instance=RequestContext(request))
    '''
    return render_to_response('contents.html', locals(), context_instance=RequestContext(request))
  else:
    return HttpResponseRedirect('/')
