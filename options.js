var iso639codes;
var xhr;

// Saves options to localStorage.
function save_options() {
    localStorage["from"] = $("#from").val();
    localStorage["to"] = $("#to").val();

    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var from = localStorage["from"];
    if (!from) {
        return;
    }
    var select = document.getElementById("from");
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == from) {
            child.selected = "true";
            break;
        }
    }

    var to = localStorage["to"];
    if (!to) {
        return;
    }
    var select = document.getElementById("to");
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == to) {
            child.selected = "true";
            break;
        }
    }
}

function fillSelects(){
    if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        iso639codes = JSON.parse(xhr.responseText);
        //console.log(resp);
        iso639codes.forEach(function(val, i){
            var option = $("<option value='"+ val.code +"'>"+ val.code + " - " + val.name +"</option>")
            $("#from").append(option);
            $("#to").append(option.clone());
        });
    }
}

xhr = new XMLHttpRequest();
xhr.onreadystatechange = fillSelects;
xhr.open("GET", chrome.extension.getURL('/639.json'), false);

$(function () {
    xhr.send();
    restore_options();
});
