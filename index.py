import os
import webapp2
from google.appengine.ext.webapp import template
from google.appengine.api import users

class MainPage(webapp2.RequestHandler):
  def get(self):
    user = users.get_current_user()

    if user:
      template_values = {'username': user.nickname(), 'logout_url' : users.create_logout_url("/"),}
      template_path = os.path.join(os.path.dirname(__file__), 'index.html')
      self.response.out.write(template.render(template_path, template_values))    
    else:
      self.redirect(users.create_login_url(self.request.uri))

app = webapp2.WSGIApplication([('/', MainPage)
                              ], debug=True)

""" Old code:
def main():
  run_wsgi_app(application)


if __name__ == '__main__':
  main()
"""
