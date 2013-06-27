if(localStorage["from"] == null){
	localStorage["from"] = "en";
}
if(localStorage["to"] == null){
	localStorage["to"] = "tr";
}

/**
* 
* @param callback Function If the response from fetching url has a
*     HTTP status of 200, this function is called with a JSON decoded
*     response.  Otherwise, this function is called with null.
*/
function get_translation(word, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(data) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				callback(data);
			} else {
				callback(null);
			}
		}
	}
	// Note that any URL fetched here must be matched by a permission in
	// the manifest.json file!
	var url = 'http://api.seslisozluk.com/?key=1234567890abcdef&query='+ encodeURIComponent(word) +'&lang_from='+ localStorage['from'] +'&lang_to=' + localStorage['to'];
	xhr.open('GET', url, true);
	xhr.send();
};

/**
* Handles data sent via chrome.extension.sendRequest().
* @param request Object Data sent in the request.
* @param sender Object Origin of the request.
* @param callback Function The method to call when the request completes.
*/
function onRequest(request, sender, callback) {
if (request.action == 'get_translation') {
	get_translation(request.word, callback);
}
};

// Wire up the listener.
chrome.extension.onRequest.addListener(onRequest);
