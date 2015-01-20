var PreviewModule = {

	settings: {
		userHeight: screen.height,
		userWidth: screen.width,
		largeWidth: null;
		largeHeight: null;
		smallWidth: null;
		smallHeight: null;
	},

	removePortal: function() {
		var iFrame = document.getElementById('frame');
		iFrame.parentNode.removeChild(iframe);
		$("portal").remove();
	},

	buildFrame: function() {

	},

	buildButtons: function() {

	},

	//TAKE IN DIMENSIONS
	resize: function() {

	},

	rotate: function() {

	},

	createPortal: function() {
		$('<div/>', {id: 'monster', rel: 'external', position: 'relative'}
			).appendTo('body');
	}

};
