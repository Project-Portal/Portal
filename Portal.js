var s,

PreviewModule = {

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

	removePortal: function() {
		var iFrame = document.getElementById('frame');
		iFrame.parentNode.removeChild(iframe);
		$("#portal").remove();
	},

	buildFrame: function() {
		$("#portal").html("<iframe id = 'frame' src =" + "http://www.theverge.com/2015/1/16/7555793/curved-imac-ultrawide" + "></iframe>");
		$("#frame").width(s.defaultWidth).height(s.defaultHeight);

	},

	buildButtons: function() {

	},

	//TAKE IN DIMENSIONS
	resize: function(h, w) {

	},

	rotate: function() {

	},

	createPortal: function() {
		$('<div/>', {id: 'portal', rel: 'external', position: 'relative'}
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

	init: function() {
		s = this.settings;
		this.createPortal();
		this.buildFrame();
	}

};
