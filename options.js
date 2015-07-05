///
//saves the user's preferences
function saveOptions() {
	var hotkey = document.getElementById('hotkey').value.toLowerCase();
	var dragResize = document.getElementById('dragResize').checked;
	var defaultHotkey = document.getElementById('defaultHotkey').checked;

	//If the hotkey inputed is a single character, set it.
	if(hotkey.length == 1){
		chrome.storage.sync.set({
	    "hotkey": hotkey,
	    'dragResize': dragResize,
	    'defaultHotkey': defaultHotkey
	  }, function() {
	    // Update status to let user know options were saved.
	    var status = document.getElementById('status');
			status.className = "alert alert-success";
			status.role = "alert";
	    status.textContent = 'SUCCESS!' + ' New Hotkey: ' + hotkey + '. Refresh the page to see your changes take effect.';
	    setTimeout(function() {
	      status.textContent = '';
				status.role = '';
				status.className = '';
	    }, 6000);
	  });
	}
	//If the hotkey is >1 characters, throw an error.
	else{
		chrome.storage.sync.set({
			//NOTHING
		}, function() {
			// Update status to let user know there was an error!
			var status = document.getElementById('status');
			status.className = "alert alert-danger";
			status.role = "alert";
			status.textContent = 'ERROR: Looks like the portal key is a word... Try picking a single key on your keyboard.';
			setTimeout(function() {
				status.textContent = '';
				status.role = '';
				status.className = '';
			}, 6000);
		});
	}
}

function restoreOptions() {
	//Use default value hotkey = 'p' and dragREsize = true and defaultHotkey = true
	chrome.storage.sync.get({
		hotkey: 'p',
		dragResize: 'true',
		defaultHotkey: 'true'
	}, function(items) {
		document.getElementById('hotkey').value = items.hotkey;
		document.getElementById('dragResize').checked = items.dragResize;
		document.getElementById('defaultHotkey').checked = items.defaultHotkey;
	});
}

//Load the users settings when page is loaded
document.addEventListener('DOMContentLoaded', restoreOptions);

//Save the settings when the sasve button is clicked
document.getElementById('saveSettings').addEventListener('click',
    saveOptions);
