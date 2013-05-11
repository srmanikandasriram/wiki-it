from dajax.core import Dajax
from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
import urllib2
from extract import extract_content

@dajaxice_register
def query(request, url):
  dajax = Dajax()
  req = urllib2.Request(url)
  opener = urllib2.build_opener()
  req.add_header('User-Agent', 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.70 Safari/537.17')
  response = opener.open(req).read()
  text = extract_content(response)
  #text1 = response.decode('utf-8')
  text = "<link rel='stylesheet' type='text/css' href='/static/css/wiki_style.css' /><link rel='stylesheet' type='text/css' href='/static/css/wiki_style1.css'/>" + text
  #text = text.decode('utf-8')
  #text="mani"
  f = open('contents.html','w')
  f.write(text)
  f.close()
  dajax.assign('#outbox','innerHTML',text)
  return dajax.json()
