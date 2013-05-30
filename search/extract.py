#!/usr/bin/python
# -*- coding: utf-8 -*-


def extract_content(string):
    string = string[string.find('<p>'):string.find('id="External_links">External links')] 
    string = string[:string.rfind('<h2>')] 
    return string

def extract_title(string):
    string = string[string.find('<h1'):]
    string = string[:string.find('</h1>')+4]
    print string    
    return string


