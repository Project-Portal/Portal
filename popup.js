window.onload = function(){

var popup_Global = {};

popup_Global.init = function() {
    alert("Fucking work");
    var button1 = document.getElementById("saveStuff");
    button1.onClick = popup_Global.saveOptions;
};

popup_Global.loadOptions = function() {
    var defaultColor = "blue";
    localStorage["favColor"];
    // valid colors are red, blue, green and yellow
    if (favColor == undefined || (favColor != "red" && favColor != "blue"
        && favColor != "green" && favColor != "yellow")) {
        favColor = defaultColor;
    }

    var select = document.getElementById("color");

    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
            if (child.value == favColor) {
            child.selected = "true";
            break;
        }
    }
};

popup_Global.saveOptions = function() {
    //var select = document.getElementById("color");
    //var color = select.children[select.selectedIndex].value;
    //localStorage["favColor"] = color;
    alert("You clicked!!");
};

popup_Global.eraseOptions = function() {
    localStorage.removeItem("favColor");
    location.reload();
    alert("You clicked!!");
};

popup_Global.init();

};
