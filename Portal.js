var PreviewModule = {

	settings: {
		userHeight: screen.height,
		userWidth: screen.width,
		largeWidth: null,
		largeHeight: null,
		smallWidth: null.
		smallHeight: null,
		defaultHeight: Math.floor(userHeight/1.5),
		defaultWidth: Math.floor(userWidth/3.7)
	},

	removePortal: function() {
		var iFrame = document.getElementById('frame');
		iFrame.parentNode.removeChild(iframe);
		$("#portal").remove();
	},

	buildFrame: function() {

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
	}

};
