//source--> the URL of the link
//s --> settings

var mouse = {x:0, y:0};
var s, source, portalIsShowing, barShowing, onLink, $topDiv, portalKey, defaultKey,

 PreviewModule = {
	//various variables we may want to retrieve at any given time
	settings: {
		userHeight: screen.height,
		userWidth: screen.width,
		//smallHeight: Math.floor(screen.height/1.8), 
		//smallWidth: Math.floor(screen.width/2.5),
		largeHeight: Math.floor(screen.height/1.3), 
		largeWidth: Math.floor(screen.width/2.5),
		defaultHeight: Math.floor(screen.height/1.5), //PORTAL
		defaultWidth: Math.floor(screen.width/3.7)
	},

	//Remove portal when you click anywhere outside the portal
	removePortal: function() {
		var iFrame = document.getElementById('frame');
		iFrame.parentNode.removeChild(iFrame);
		$("#portal").remove();
		portalIsShowing = false;
	},

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

	//initialize function
	init: function() {
		s = this.settings;
		this.followMouse();
		this.isOverLink();
		chrome.storage.local.get('defaultHotkey', function (items) {
	        defaultKey = items.defaultHotKey;
    	});

    	if(defaultKey) {
    		portalKey = 'p';
    		alert(portalKey.charCodeAt(0));
    	}
    	else{
    		chrome.storage.local.get('hotkey', function (items) {
	        	portalKey = items.hotKey;
    		});
    		alert(portalKey.charCodeAt(0));
    	}
		

		//listen for 'p' keypress
		$(document).keypress(function(event){
			if(event.which == portalKey.charCodeAt(0) && onLink){
	        	PreviewModule.putPortalAtCursor(); 
        	}    
    	});

		//listen for when user clicks off portal to remove
    	document.addEventListener("click", function(e){
				var toClose = e.target.id != "portal" && e.target.id  != "topDiv" && e.target.id  != "rotateButton" && e.target.id  != "resizeButton" && portalIsShowing;
				if (toClose){
					PreviewModule.removePortal();
				}
				else {
					//do nothing
				}
			});
    	//listen for "g" keypress to grow portal
		$(document).keypress(function(event){
			if(event.which == 103){
				PreviewModule.resizePortal(s.largeWidth,s.largeHeight);	
			}
		});

    	//listen for "s" keypress to grow portal
		$(document).keypress(function(event){
			if(event.which == 115){
				PreviewModule.resizePortal(s.defaultWidth,s.defaultHeight);	
			}
		});

    	//listen for "r" keypress to rotate portal
		$(document).keypress(function(event){
			if(event.which == 114){
				PreviewModule.rotatePortal();
			}
		});
	},

    toggleResize: function() {
        if ($("#portal").width() == s.defaultWidth){
            PreviewModule.resizePortal(s.largeWidth, s.largeHeight,s.largeWidth);
        }
        else if ($("#portal").width() == s.defaultHeight){
            PreviewModule.resizePortal(s.largeHeight, s.largeWidth,s.largeHeight);
        }
        else if ($("#portal").width() == s.largeWidth){
            PreviewModule.resizePortal(s.defaultWidth, s.defaultHeight,s.defaultWidth);
        }
        else if ($("#portal").width() == s.largeHeight){
            PreviewModule.resizePortal(s.defaultHeight, s.defaultWidth,s.defaultHeight);
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
		//console.log("DEFAULT" + s.defaultWidth);
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

	//creates the portal at the current location of the cursor
	putPortalAtCursor: function() {
		//get mouse position
	    var x = mouse.x + 'px';
	    var y = mouse.y + 'px';

	    //top bar that appears above the portal
	    topDiv = $('<div>', {
	    	id: "topDiv",
	    	rel: "external",
	    	position: "absolute",
	    	height: '25px',
	    	width: s.defaultWidth + 'px',
	    	zindex: "2000000001",
            opacity: 0.5
	    });

	    topDiv.css("background-color", "#DDDDDD");

	    //create the portal div and the frame iFrame
	 	$('<div/>', {id: 'portal', rel: 'external', position: 'absolute'}).appendTo('body');
		$("#portal").css("background-color","white");
		$("#portal").html("<iframe id = 'frame' src =" + source + "></iframe>");
		$("#frame").width(s.defaultWidth).height(s.defaultHeight);
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
		PreviewModule.resizePortal(s.defaultWidth,s.defaultHeight,s.defaultWidth);


		//Enable Dragging of Portal
		$("#portal").draggable({
			iframeFix: true
		});

        //OLD ROTATE BUTTON
       /* $('#topDiv')
            .append('<button  type="submit"x value="MyButton"><img src = "https://cdn4.iconfinder.com' +
            '/data/icons/defaulticon/icons/png/256x256/redo.png" height="25" width=25"></button>')
            .button(); */

        //Create Rotate Button
        var rotateButton = document.createElement('button');
        rotateButton.innerHTML = 'Rotate';
        rotateButton.setAttribute("id", "rotateButton");
        //document.getElementById('rotateButton').src =
        $('#topDiv').append(rotateButton);
        rotateButton.onclick = PreviewModule.rotatePortal;
        $('#rotatebutton').css({
            "background-color": "#000000"
        });

        //Create Resize Button
        var resizeButton = document.createElement('button');
        resizeButton.innerHTML = 'Resize';
        resizeButton.setAttribute("id", "resizeButton");
        resizeButton.setAttribute("class", "btnPortal");
        $('#topDiv').append(resizeButton);
        resizeButton.onclick = PreviewModule.toggleResize;


        //document.getElementById("Rotate").addEventListener("click", function(){
        //    console.log("HI!");
        //});

       // PreviewModule.listenForBarHover();
		//Set the variable
		portalIsShowing = true;
	}
};