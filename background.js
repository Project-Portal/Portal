var ports = {};
var activeTab = null;
var curTabID = 0;
var curWinID = 0;
var url = "";

chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
   curTabID = tabId;
});

chrome.runtime.sendMessage("test message", function(response) {
    url = response.farewell;
    console.log("response " + response.farewell);
});

//User Agent Code
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(info) {
    	//get headers
        var headers = info.requestHeaders;
        //find the user agent header
        headers.forEach(function(header, i) {
            if (header.name.toLowerCase() == 'user-agent') { 
                header.value = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7';
            }
        });  
        return {requestHeaders: headers};
    },
    // Request filter
    {
        // Modify the headers for these pages
        urls: [
            url
        ],
        // In the main window and frames
        types: ["main_frame", "sub_frame"]
    },
    ["blocking", "requestHeaders"]
);

/*
//****** OTHER WAY!!!! *********
  // The 'reqestFilter' parameter allows you to only listen for
  // certain requests. Chrome 17 requires that, at the very least,
  // it defines the URLs you wish to subscribe to. In the general
  // case, we want to subscribe to all URL's, so we'll explicitly
  // declare this requirement.
var requestFilter = {
    urls: [ "<all_urls>" ]
  },
  // The 'extraInfoSpec' parameter modifies how Chrome calls your
  // listener function. 'requestHeaders' ensures that the 'details'
  // object has a key called 'requestHeaders' containing the headers,
  // and 'blocking' ensures that the object your function returns is
  // used to overwrite the headers
  extraInfoSpec = ['requestHeaders','blocking'],
  // Chrome will call your listener function in response to every
  // HTTP request
  handler = function( details ) {
 
    var headers = details.requestHeaders,
      blockingResponse = {};
 
    // Each header parameter is stored in an array. Since Chrome
    // makes no guarantee about the contents/order of this array,
    // you'll have to iterate through it to find for the
    // 'User-Agent' element
    for( var i = 0, l = headers.length; i < l; ++i ) {
      if(headers[i].name == 'User-Agent' ) {
      	console.log(headers[i].name);
        headers[i].value = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7';
        break;
      }
      console.log("this ain't working....");
      // If you want to modify other headers, this is the place to
      // do it. Either remove the 'break;' statement and add in more
      // conditionals or use a 'switch' statement on 'headers[i].name'
    }
 
    blockingResponse.requestHeaders = headers;
    return blockingResponse;
  };
  */
 
//chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );

function onMessage(request, sender, sendResponse) {
	sendResponse({}); 
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
     activeTab = arrayOfTabs[0].url;
  });
}


    