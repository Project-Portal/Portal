/*
 * Creates the portal
 */

//source--> the URL of the link

var mouse = {x:0, y:0};
var portalSettings, source, portalIsShowing, newHotKey, barShowing, onLink, $topDiv, portalKey, defaultKey

 PreviewModule = {
	//various variables we may want to retrieve at any given time
	settings: {
		userHeight: screen.height,
		userWidth: screen.width,
		largeHeight: Math.floor(screen.height/1.3),
		largeWidth: Math.floor(screen.width/2.5),
		defaultHeight: Math.floor(screen.height/1.5), //PORTAL
		defaultWidth: Math.floor(screen.width/3.7),
    // This is very hacky, but its the only way I've been able to get the key out
    // of chrome storage
    getStorageVariables: chrome.storage.sync.get("hotkey", function(obj){
      newHotKey = obj.hotkey;
      })
	},

	//Remove portal when you click anywhere outside the portal
	removePortal: function() {
		var iFrame = document.getElementById('frame');
		iFrame.parentNode.removeChild(iFrame);
		$("#portal").remove();
		portalIsShowing = false;
	},

  /*
   * Returns whether the mouse pointer is over a link
   */
	isOverLink: function() {
		$("a").mouseenter(function(){
				onLink = true;
				//get the url
			    var url = $(this).attr('href');
			    //print url
				source = url;

                chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
                    //url = message;
                    console.log("Message:   " + message);
                    sendResponse({farewell:"How are you?"});
                });


			})
			//set onLink to false when mouse leaves
			.mouseleave(function(){
				onLink = false;
			});
		},

  /*
  * Initialize the portal
  */
	init: function() {
		portalSettings = this.settings;
		this.followMouse();
		this.isOverLink();
		chrome.storage.local.get('defaultHotkey', function (items) {
	        defaultKey = items.defaultHotKey;
    	});

    	if(defaultKey) {
    		portalKey = 'p';
    		//alert(portalKey.charCodeAt(0));
    	}
    	else{
    		chrome.storage.local.get('hotkey', function (items) {
	        	portalKey = items.hotKey;
    		});
    		//alert(portalKey.charCodeAt(0));
    	}

		//listen for 'p' keypress
		$(document).keypress(function(event){
			if(event.which ==  newHotKey.charCodeAt(0) && onLink){
	        	PreviewModule.putPortalAtCursor();
        	}
    	});

		//listen for when user clicks off portal to remove
    	document.addEventListener("click", function(e){
				var toClose = e.target.id != "portal" && e.target.id  != "topDiv"
                      && e.target.id  != "rotateButton"
                      && e.target.id  != "resizeButton"
                      && portalIsShowing;
				if (toClose){
          PreviewModule.removePortal();
				}
				else {
					//do nothing
				}
			});
    	//listen for "g" keypress to grow portal
		// $(document).keypress(function(event){
		// 	if(event.which == 103){
		// 		PreviewModule.resizePortal(portalSettings.largeWidth,portalSettings.largeHeight);
		// 	}
		// });
    //
    // 	//listen for "s" keypress to grow portal
		// $(document).keypress(function(event){
		// 	if(event.which == 115){
		// 		PreviewModule.resizePortal(portalSettings.defaultWidth,portalSettings.defaultHeight);
		// 	}
		// });
    //
    // 	//listen for "r" keypress to rotate portal
		// $(document).keypress(function(event){
		// 	if(event.which == 114){
		// 		PreviewModule.rotatePortal();
		// 	}
		// });
	},

    toggleResize: function() {
        if ($("#portal").width() == portalSettings.defaultWidth){
            PreviewModule.resizePortal(portalSettings.largeWidth, portalSettings.largeHeight,portalSettings.largeWidth);
        }
        else if ($("#portal").width() == portalSettings.defaultHeight){
            PreviewModule.resizePortal(portalSettings.largeHeight, portalSettings.largeWidth,portalSettings.largeHeight);
        }
        else if ($("#portal").width() == portalSettings.largeWidth){
            PreviewModule.resizePortal(portalSettings.defaultWidth, portalSettings.defaultHeight,portalSettings.defaultWidth);
        }
        else if ($("#portal").width() == portalSettings.largeHeight){
            PreviewModule.resizePortal(portalSettings.defaultHeight, portalSettings.defaultWidth,portalSettings.defaultHeight);
        }
    },

	followMouse: function() {
		$(document).on('mousemove', function(e){
    		mouse.x = e.pageX;
    		mouse.y = e.pageY;
		});
	},

	//http://css-tricks.com/examples/jQueryStop/
	resizePortal: function(w, h, t) {
		//console.log("DEFAULT" + portalSettings.defaultWidth);
		$("#portal").animate({
			width: w,
			height: h,
			opacity: 1
			//left: ("+=50"),
		}, 300);

		$("#frame").animate({
			width: w,
			height: h,
			opacity: 1
			//left: ("+=50"),
		}, 300);

        $("#topDiv").animate({
            height: '25px',
            width: t
        }, 100);
	},

	rotatePortal: function(){
		h = $('#portal').width();
		w = $('#portal').height();
		PreviewModule.resizePortal(w,h,w);
	},

	showBar: function() {
        barShowing = true;
		topDiv.animate({
			height: 40
		}, 250);
	},

	hideBar: function() {
        barShowing = false;
		topDiv.animate({
			height: 20
		}, 250);
	},

    listenForBarHover: function(){
        $('#topDiv').mouseover(function() {
            PreviewModule.showBar();
        }).mouseleave(function() {
            PreviewModule.hideBar();
        })
    },

	/*
  * Creates the portal at the current location of the cursor
  */
	putPortalAtCursor: function() {
    //Offset values
    var offset_x = 0;
    var offset_y = 0;

    //Window dimensions
    var window_width = window.innerWidth;
    var window_height = window.innerHeight;

    // TODO(mrosenfield): Implement Y-Axis intelligence
    // TODO(mrosenfield): Change growth animation when growing from right
    if ((window_width - mouse.x) < portalSettings.defaultWidth) {
      offset_x = portalSettings.defaultWidth;
    }

    x = mouse.x - offset_x + 'px';
    y = mouse.y - offset_y + 'px';

    //top bar that appears above the portal
    topDiv = $('<div>', {
    	id: "topDiv",
    	rel: "external",
    	position: "absolute",
    	height: '25px',
    	width: portalSettings.defaultWidth + 4 + 'px',
    	zindex: "2000000001",
          opacity: 0.5
    });

    topDiv.css("background-color", "#03A9F4cd ");

	  //create the portal div and the frame iFrame
	 	$('<div/>', {id: 'portal', rel: 'external', position: 'absolute'}).appendTo('body');
		$("#portal").css("background-color","white");
		$("#portal").html("<iframe id = 'frame' src =" + source + "></iframe>");
		$("#frame").width(portalSettings.defaultWidth).height(portalSettings.defaultHeight);
		$('#frame').css({"box-shadow": "10px 10px 5px #888888"});

		//Move the portal to the mouse position
		$('#portal').css({
	            "position": "absolute",
	            "left": x,
	            "top": y,
	            "z-index": "2000000000",
	            "width": 0 + 'px',
	            "height": 0 + 'px'
	        });
        var destination = $('#portal').offset();
		$('#portal').prepend(topDiv);
		PreviewModule.resizePortal(portalSettings.defaultWidth,portalSettings.defaultHeight,portalSettings.defaultWidth);


		//Enable Dragging of Portal
		$("#portal").draggable({
			iframeFix: true
		});

    //Create Rotate Button
    var rotateButton = document.createElement('button');
    rotateButton.innerHTML = 'Rotate';
    rotateButton.setAttribute("id", "rotateButton");
    $('#topDiv').append(rotateButton);
    rotateButton.style.setProperty('background-color', '#E64A19', 'important');
    rotateButton.style.setProperty('height', '26px', 'important');
    rotateButton.style.setProperty('border', '0', 'important');
    rotateButton.style.setProperty('margin', '0', 'important');
    rotateButton.style.setProperty('color', '#FFFFFF', 'important');
    rotateButton.style.setProperty('font-family', 'sans-serif', 'important');
    rotateButton.style.setProperty('text-transform', 'capitalize', 'important');
    rotateButton.style.setProperty('padding', '0px 5px', 'important');
    rotateButton.style.setProperty('font-size', 'medium', 'important');
    rotateButton.onclick = PreviewModule.rotatePortal;

    //Change the color of the button when you hover in and out
    $("#rotateButton").mouseover(function(){
      rotateButton.style.setProperty('background-color', '#FF6838', 'important');
    });

    $("#rotateButton").mouseout(function(){
      rotateButton.style.setProperty('background-color', '#E64A19', 'important');
    });


    //Create Resize Button
    var resizeButton = document.createElement('button');
    resizeButton.innerHTML = 'Resize';
    resizeButton.setAttribute("id", "resizeButton");
    resizeButton.setAttribute("class", "btnPortal");
    resizeButton.onclick = PreviewModule.toggleResize;
    $('#topDiv').append(resizeButton);
    resizeButton.style.setProperty('background-color', '#E64A19', 'important');
    resizeButton.style.setProperty('color', '#FFFFFF', 'important');
    resizeButton.style.setProperty('border', '0', 'important');
    resizeButton.style.setProperty('margin', '0', 'important');
    resizeButton.style.setProperty('text-transform', 'capitalize', 'important');
    resizeButton.style.setProperty('font-family', 'sans-serif', 'important');
    resizeButton.style.setProperty('height', '26px', 'important');
    resizeButton.style.setProperty('padding', '0px 5px', 'important');
    resizeButton.style.setProperty('font-size', 'medium', 'important');

    //Change the color of the button when you hover in and out
    $("#resizeButton").mouseover(function(){
      resizeButton.style.setProperty('background-color', '#FF6838', 'important');
    });

    $("#resizeButton").mouseout(function(){
      resizeButton.style.setProperty('background-color', '#E64A19', 'important');
    });

		portalIsShowing = true;
  }
};
