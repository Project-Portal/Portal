var PreviewModule = {

	settings: {
		userHeight: screen.height,
		userWidth: screen.width,
		largeWidth;
		largeHeight;
		smallWidth;
		smallHeight;
	},

	removeFrame: function() {
		var iFrame = document.getElementById('portal');
		iFrame.parentNode.removeChild(iFrame);
		$("container").remove();
	};
}