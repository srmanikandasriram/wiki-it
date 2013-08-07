from dajax.core import Dajax
from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from django.conf import settings
import urllib

@dajaxice_register
def parse_query(request, query):
  dajax = Dajax()
  query = query.replace(' ','_')
  if query == "kavymani" :
    pass
  elif query[0:4] != "http" :
    query = "http://en.wikipedia.org/wiki/" + query
  url = settings.SITE_URL + 'search/'+ urllib.quote_plus(query)+"?";
  dajax.assign("#outbox",'src',url);
  dajax.assign("#tools-form>#url","innerHTML",url);	
  return dajax.json()
