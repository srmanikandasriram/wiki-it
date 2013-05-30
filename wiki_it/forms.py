#!/usr/bin/python
# -*- coding: utf-8 -*-
from google.appengine.ext.webapp import template
import djangoforms
from models import Addon

class AddonForm(djangoforms.ModelForm):
    """
    Form that allows users to submit
    suggestions for new features.
    """
    class Meta:
        model = Addon
