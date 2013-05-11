def static_url(request):
    from django.conf import settings
    return {'static_url': settings.STATIC_URL,}

def site_url(request):
    from django.conf import settings
    return {'site_url': settings.SITE_URL,}
