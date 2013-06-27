chrome.extension.onRequest.addListener(
	function(request, sender, callBack) {
		if (request.action == 'get_selected_text'){
			callBack({selected_text: window.getSelection().toString()});
        }else{
			callBack(null);
        }
	}
);

function onClick (e) {
    tooltip.hide();
}

function onTranslation(data){
    //console.log(data);
    if(data.translations.length > 0){
        tooltip.show(data.translations[0].translation);
    }else{
        tooltip.show(':(');
    }
}
    
function onKeyUp (e) { 
    //console.log('keyup keycode: ' + e.which);
    
    var selection = window.getSelection();
    var text = selection.toString().trim();
    
    switch(e.which) { 
        case 115:   // s key
        case 83:    // S key
            if(text != ""){
                chrome.extension.sendRequest({'action' : 'get_translation', 'word' : text}, onTranslation);            
            }
        break; 
    }
}

$("body").keyup(onKeyUp);
$("body").click(onClick);
