
//saves the user's preferences
function saveOptions() {
	var hotkey = document.getElementById('hotkey').value;
	var dragResize = document.getElementById('dragResize').checked;
	var defaultHotkey = document.getElementById('defaultHotkey').checked;

	chrome.storage.sync.set({
    hotkey: hotkey,
    dragResize: dragResize,
    defaultHotkey: defaultHotkey
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 900);
  });
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

/*
    // Saves options to chrome.storage
function save_options() {
  var color = document.getElementById('hotkey').value;
  var likesColor = document.getElementById('dragResize').checked;
  chrome.storage.sync.set({
    favoriteColor: color,
    likesColor: likesColor
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
                                              
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function(items) {
    document.getElementById('hotkey').value = items.favoriteColor;
    document.getElementById('dragResize').checked = items.likesColor;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('saveSettings').addEventListener('click',
    save_options);
*/
    