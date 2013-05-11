import urllib2
opener = urllib2.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0')]

newURL = 'http://en.wikipedia.org/w/index.php?title=Special:Random' #URL for a random article
#newURL = 'http://en.wikipedia.org/w/index.php?title=England'

def getNextURL(newURL): #Finds the first link/title (broken when it has a country)
    infile = opener.open(newURL)
    page = infile.read()
    mainP = page[page.find('<p>'):page.find('<p>')+500] #Find the first <p> tag for the main body
    newPage = mainP[mainP.find('<a href="/wiki/')+15:mainP.find('"',mainP.find('<a href="/wiki/')+15)] #Find the first href for the link
    return newPage

newPage = getNextURL(newURL)

counter = 0 #Keeps track of the jumps

if newPage == 'Philosophy':
    print("The Random page chosen was the Philosophy page. Isn't the universe cool?")
else:
    print("We begin our journey on the " + newPage + " page.")
    while newPage !='Philosophy':
        newURL = 'http://en.wikipedia.org/w/index.php?title=' + newPage #Creates the next link to go to based upon the first link
        newPage = getNextURL(newURL)
        print ('Now jumping to the ' + newPage + ' page.')
        counter +=1

print ('It took %d times to get to the Philosophy page on Wikipedia. Thanks Michel for the puzzle!' % counter)   
