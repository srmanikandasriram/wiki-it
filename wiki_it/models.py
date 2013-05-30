from google.appengine.ext import db

class Addon(db.Model):
    """
    Models a request for an Addon
    submitted by an User
    """
    email   = db.StringProperty()
    comment = db.TextProperty()
