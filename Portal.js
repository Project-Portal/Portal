//source--> the URL of the link
//s --> settings

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
		
		$(function () {
		  	$(document).keyup(function (e) {
			  	//console.log(e.which);
			  	if(e.which == 80 && onLink == true){
			  		$("#portal").html("<iframe id = 'frame' src =" + source + "></iframe>");
					$("#frame").width(s.defaultWidth).height(s.defaultHeight);
					$("#portal").css("background-color","black");
				}
			});
		});

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
		this.createPortal();
		this.buildFrame();
	}

};
