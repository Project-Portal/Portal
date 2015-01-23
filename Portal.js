//source--> the URL of the link
//s --> settings

var mouse = {x:0, y:0};
var s, source, portalIsShowing, onLink,

PreviewModule = {
	//various variables we may want to retrieve at any given time
	settings: {
		userHeight: screen.height,
		userWidth: screen.width,
		largeWidth: null,
		largeHeight: null,
		smallWidth: null,
		smallHeight: null,
		defaultHeight: Math.floor(screen.height/1.5),
		defaultWidth: Math.floor(screen.width/3.7)

	},

	//Remove portal when you click anywhere outside the portal
	removePortal: function() {
		var iFrame = document.getElementById('frame');
		iFrame.parentNode.removeChild(iFrame);
		$("#portal").remove();
		portalIsShowing = false;
	},

	buildButtons: function() {

	},

	//TAKE IN DIMENSIONS
	resize: function(h, w) {

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

		this.growListener();
	},

	followMouse: function() {
		$(document).on('mousemove', function(e){
			console.log("im moving");
    		mouse.x = e.pageX;
    		mouse.y = e.pageY;
		});
	},

	growPortal: function() {
		curHeight = $("#portal").height();
		curTop = $("#portal").offset().top;
		newHeight = 200;
		newMargin = curTop - (newHeight - curHeight)/2;
		if (newMargin < 0){
			newMargin = 0;
		}
		$("#portal").animate({height: newHeight + "px", marginTop: newMargin + 'px'});
	},

	growListener: function() {
		$(document).keypress(function(event){
			if(event.which == 103){
				this.growPortal();	
			}
		});
	},

	//creates the portal at the current location of the cursor
	putPortalAtCursor: function() {
		console.log("Put portal at cursor!!");
		//get mouse position
	    var x = mouse.x + 'px';
	    var y = mouse.y + 'px';

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
		//Set the variable
		portalIsShowing = true;
	}
};
