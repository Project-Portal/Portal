//source--> the URL of the link
//s --> settings
var mouse = {x:0, y:0};
var s, source,

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
		iFrame.parentNode.removeChild(iframe);
		$("#portal").remove();
	},

	//call to build the iframe
	buildFrame: function() {
		PreviewModule.putPortalAtCursor();
	},

	buildButtons: function() {

	},

	//TAKE IN DIMENSIONS
	resize: function(h, w) {

	},

	rotate: function() {

	},

	//call to build the the Portal (div holding the iframe)
	createPortal: function() {
		$('<div/>', {id: 'portal', rel: 'external', position: 'absolute'}
		).appendTo('body');
			$("#portal").width(s.defaultWidth).height(s.defaultHeight);
			$("#portal").css("z-index", "2000000000");
			
			//If mouse is hovered over link
			//set onlink to true when mouse enters
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
		this.createPortal();
		this.buildFrame();
		//this.putPortalAtCursor();
	},

	followMouse: function() {
		$(document).on('mousemove', function(e){
			console.log("im moving");
    		mouse.x = e.pageX;
    		mouse.y = e.pageY;
		});
	},

	//creates the portal at the current location of the cursor
	putPortalAtCursor: function() {
		$(document).keypress(function(event){
			if(event.which == 112 && onLink){
	        	var x = mouse.x + 'px';
	        	var y = mouse.y + 'px';
	 			//alert(x + " " + y);

	 			$("#portal").html("<iframe id = 'frame' src =" + source + "></iframe>");
				$("#frame").width(s.defaultWidth).height(s.defaultHeight);
				$("#portal").css("background-color","black");

	        	var div = $('#portal').css({
	            	"position": "absolute",                    
	            	"left": x,
	            	"top": y
	        	});

	        	$(document.body).append(div);  
        	}    
    	});
	}
};
