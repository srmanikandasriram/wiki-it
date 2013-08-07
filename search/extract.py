#!/usr/bin/python
# -*- coding: utf-8 -*-


def extract_content(string):
    string = string[string.find('<p>'):string.find('id="External_links">External links')] 
    string = string[:string.rfind('<h2>')] 
    return string

def extract_title(string):
    string = string[string.find('<h1'):]
    string = string[:string.find('</h1>')+5]   
    return string

def split_sections(string):
    converted_string = "<div class=\"sections\" id=\"section1\">"
    pos = string.find('<h2>')
    num = 1
    while pos > -1:
        converted_string = converted_string + string[:pos]
        if string[pos+4] != 'C':
            num = num+1
            converted_string = converted_string + "</div><div class=\"sections\" id=\"section" + str(num) + "\"><"
            string = string[pos+1:]
        else:
            converted_string = converted_string + string[pos:pos+4]
            string = string[pos+4:]
        pos = string.find('<h2>')
    converted_string = converted_string +string[:pos] + "</div>"
    return converted_string


