//source--> the URL of the link
//s --> settings

var mouse = {x:0, y:0};
var s, source, portalIsShowing, barShowing, onLink, $topDiv,

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
				console.log(url);
				source = url;
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

		//listen for 'p' keypress
		$(document).keypress(function(event){
			if(event.which == 112 && onLink){
				console.log("pressed p");
	        	PreviewModule.putPortalAtCursor(); 
        	}    
    	});

		//listen for when user clicks off portal to remove
    	document.addEventListener("click", function(e){
				var toClose = e.target.id != "portal" && portalIsShowing;
				if (toClose){
					console.log(e.target.id);
					console.log("Removed Portal!!");
					PreviewModule.removePortal();
				}
				else {
					//do nothing
				}
			});
    	//listen for "g" keypress to grow portal
		$(document).keypress(function(event){
			if(event.which == 103){
				console.log("pressed g");
				PreviewModule.resizePortal(s.largeWidth,s.largeHeight);	
			}
		});

    	//listen for "s" keypress to grow portal
		$(document).keypress(function(event){
			if(event.which == 115){
				console.log("pressed s");
				PreviewModule.resizePortal(s.defaultWidth,s.defaultHeight);	
			}
		});

    	//listen for "r" keypress to rotate portal
		$(document).keypress(function(event){
			if(event.which == 114){
				console.log("pressed r");
				PreviewModule.rotatePortal();
			}
		});
	},

	followMouse: function() {
		$(document).on('mousemove', function(e){
			console.log("im moving");
    		mouse.x = e.pageX;
    		mouse.y = e.pageY;
		});
	},

	//http://css-tricks.com/examples/jQueryStop/
	resizePortal: function(w, h) {
		console.log("PORTAL" + $('#portal').css('width'));
		console.log("FRAME" + $('#frame').css('width'));
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
	},

	rotatePortal: function(){
		h = $('#portal').width();
		w = $('#portal').height();
		PreviewModule.resizePortal(w,h);
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
	 	$('<div/>', {id: 'portal', rel: 'external', position: 'absolute', width: s.defaultWidth,height: s.defaultHeight}).appendTo('body');
		$("#portal").css("background-color","white");
		$("#portal").html("<iframe id = 'frame' src =" + source + "></iframe>");
		$("#frame").width(s.defaultWidth).height(s.defaultHeight);
		$('#frame').css({"box-shadow": "10px 10px 5px #888888"});

		//Move the portal to the mouse position
		$('#portal').css({
	            "position": "fixed",
	            "left": x,
	            "top": y,
	            "z-index": "2000000000",
	            "width": 0 + 'px',
	            "height": 0 + 'px'
	        });
        var destination = $('#portal').offset();
		$('#portal').prepend(topDiv);
		//PreviewModule.resizePortal(s.defaultWidth,s.defaultHeight);


		//Enable Dragging of Portal
		$("#portal").draggable({
			iframeFix: true
		});

        $('#topDiv')
            .append('<button type="submit" value="My button"><img src = "https://cdn4.iconfinder.com' +
            '/data/icons/defaulticon/icons/png/256x256/redo.png" height="25" width=25"></button>')
            .button();

       // PreviewModule.listenForBarHover();
		//Set the variable
		portalIsShowing = true;
	}
};