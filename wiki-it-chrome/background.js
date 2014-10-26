// background.js for Wiki-It Chrome Extension
chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.insertCSS(tab.id, {file: "bootstrap.min.css"});
    chrome.tabs.insertCSS(tab.id, {file: "bootstrap-tour.min.css"});
    chrome.tabs.insertCSS(tab.id, {file: "style.css"});
    chrome.tabs.executeScript(tab.id, {file: "jquery-1.10.min.js"});
    chrome.tabs.executeScript(tab.id, {file: "bootstrap.min.js"});
    chrome.tabs.executeScript(tab.id, {file: "bootstrap-tour.min.js"});
    chrome.tabs.executeScript(tab.id, {file: "main.js"});
});

