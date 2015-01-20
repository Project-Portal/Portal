var PreviewModule = {

	settings: {
		userHeight: screen.height,
		userWidth: screen.width,
		largeWidth: null;
		largeHeight: null;
		smallWidth: null;
		smallHeight: null;
	},

	removeFrame: function() {
		var iFrame = document.getElementById('portal');
		iFrame.parentNode.removeChild(iFrame);
		$("container").remove();
	},

	buildFrame: function() {

	},

	buildButtons: function() {

	},

	//TAKE IN DIMENSIONS
	resize: function() {

	},

	rotate: function() {

	}

};
