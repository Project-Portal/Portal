var ports = {};
var activeTab = null;
var curTabID = 0;
var curWinID = 0;

chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
   curTabID = tabId;
});

function onMessage(request, sender, sendResponse) {
	
	sendResponse({}); 
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
     activeTab = arrayOfTabs[0].url;
  });

    