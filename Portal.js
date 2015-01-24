//source--> the URL of the link
//s --> settings

var mouse = {x:0, y:0};
var s, source, portalIsShowing, onLink, $topDiv,

PreviewModule = {
	//various variables we may want to retrieve at any given time
	settings: {
		userHeight: screen.height,
		userWidth: screen.width,
		smallWidth: null,
		smallHeight: null,
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

	rotate: function() {

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
				console.log("pressed p");
				PreviewModule.resizePortal();	
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
	resizePortal: function() {
		//h = $('#portal').css('height');
		console.log("PORTAL" + $('#portal').css('width'));
		console.log("FRAME" + $('#frame').css('width'));
		console.log("DEFAULT" + s.defaultWidth);
		$("#portal").animate({
			width: s.largeWidth,
			height: s.largeHeight,
			opacity: 1,
			//left: ("+=50"),
		}, 300);
		$("#frame").animate({
			width: s.largeWidth,
			height: s.largeHeight,
			opacity: 1,
			//left: ("+=50"),
		}, 300);
	},

	//creates the portal at the current location of the cursor
	putPortalAtCursor: function() {
		console.log("Put portal at cursor!!");
		//get mouse position
	    var x = mouse.x + 'px';
	    var y = mouse.y + 'px';
	    topDiv = $('<div>', {
	    	id: "topDiv",
	    	rel: "external",
	    	position: "absolute",
	    	height: '40px',
	    	width: s.defaultWidth + 'px',
	    	zindex: "2000000001"
	    });

	    topDiv.css("background-color", "#DDDDDD");

	    //create the portal div and the frame iFrame
	 	$('<div/>', {id: 'portal', rel: 'external', position: 'absolute', width: 0,height: 0}).appendTo('body');
		$("#portal").css("background-color","white");
		console.log("The source!!: " + source);
		$("#portal").html("<iframe id = 'frame' src =" + source + "></iframe>");
		$("#frame").width(s.defaultWidth).height(s.defaultHeight);
		$('#portal').css({"box-shadow": "10px 10px 5px #888888"});
		//$('#portal').makeResizable();

		//Move the portal to the mouse position
		$('#portal').css({
	            "position": "absolute",                    
	            "left": x,
	            "top": y,
	            "z-index": "2000000000",
	            "width": s.defaultWidth + 'px',
	            "height": s.defaultHeight + 'px'
	        });
		$('#portal').prepend(topDiv);
		//Set the variable
		portalIsShowing = true;
	}
};
