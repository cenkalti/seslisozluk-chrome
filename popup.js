function onSelectedText(response){
    document.getElementById('main').src = 
        "http://m.seslisozluk.com/?word=" + encodeURIComponent(response.selected_text);
};


chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {action: "get_selected_text"}, onSelectedText);
});
