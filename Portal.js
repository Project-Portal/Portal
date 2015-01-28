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
				console.log("pressed g");
				PreviewModule.resizePortal(s.largeWidth,s.largeHeight);	
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
			opacity: 1,
			//left: ("+=50"),
		}, 300);
		$("#frame").animate({
			width: w,
			height: h,
			opacity: 1,
			//left: ("+=50"),
		}, 300);
	},

<<<<<<< HEAD
	/*ANIMATEDrotatePortal: function() {
		h = $('#frame').width();
		w = $('#frame').height();
		$('#portal').animate({  borderSpacing: 90 }, {
		    step: function(now,fx) {
		      $(this).css('-webkit-transform','rotate('+now+'deg)'); 
		      $(this).css('-moz-transform','rotate('+now+'deg)');
		      $(this).css('transform','rotate('+now+'deg)');
		    },
		    duration:'slow'
		},'linear');

		$('#frame').animate({width: w, height: h, opacity: 1}, {  borderSpacing: 90 }, {
		    step: function(now,fx) {
		      $(this).css('-webkit-transform','rotate('+now+'deg)'); 
		      $(this).css('-moz-transform','rotate('+now+'deg)');
		      $(this).css('transform','rotate('+now+'deg)');

		    },
		    duration:'slow'
		},'linear');


		h = $('#frame').width();
		w = $('#frame').height();
		$("#frame").animate({
			width: w,
			height: h,
			opacity: 1,
			//left: ("+=50"),
		}, 300);
	},*/

	rotatePortal: function(){
		h = $('#frame').width();
		w = $('#frame').height();
		PreviewModule.resizePortal(w,h);
	},

=======
>>>>>>> FETCH_HEAD
	showBar: function() {
		topDiv.animate({
			height: 40,
			opacity: 1,
		}, 300);
	},

	hideBar: function() {
		topDiv.animate({
			height: 0,
			opacity: 1,
		}, 300);
	},

	listenForPortalHover: function(){
		$('#portal').mouseover(function() {
			PreviewModule.showBar();
		}).mouseout(function(){
			PreviewModule.hideBar();
		});
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
	    	height: '0px',
	    	width: s.defaultWidth + 'px',
	    	zindex: "2000000001",
	    });

	    topDiv.css("background-color", "#DDDDDD");

	    //create the portal div and the frame iFrame
	 	$('<div/>', {id: 'portal', rel: 'external', position: 'absolute', width: 0,height: 0}).appendTo('body');
		$("#portal").css("background-color","white");
		$("#portal").html("<iframe id = 'frame' src =" + source + "></iframe>");
		$("#frame").width(0).height(0);
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
		$('#portal').prepend(topDiv);
		PreviewModule.resizePortal(s.defaultWidth,s.defaultHeight);
<<<<<<< HEAD

		//Enable Dragging of Portal
		$("#portal").draggable({
			iframeFix: true
		});

=======
>>>>>>> FETCH_HEAD
		PreviewModule.listenForPortalHover();
		//Set the variable
		portalIsShowing = true;
	}
};