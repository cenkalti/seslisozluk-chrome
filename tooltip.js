function Tooltip() {

    var maxw = 300;
    
    var $div = null;
    
    this.hide = function(){
        //console.log("hide()");
        if($div){
            $div.remove();
            $div = null;
        }
    };
    
    this.show = function(html){
        //console.log("show()");
        
        this.hide();
        
        var selection = window.getSelection();
        var text = selection.toString();
        if (selection.rangeCount==0) return;

        var range = selection.getRangeAt(0);
        var $span= $("<span/>");

        newRange = document.createRange();
        newRange.setStart(selection.focusNode, range.endOffset);
        newRange.insertNode($span[0]); // using 'range' here instead of newRange unselects or causes flicker on chrome/webkit

        var x = $span.offset().left;
        var y = $span.offset().top;
        $div = $("<div style='background-color:orange; color:white; position:absolute; padding: 5px;'>").appendTo($("body"));
        $div.text(html);
        $div.css({left:x,top:y+(range.getBoundingClientRect().height)});
        $span.remove();

        if($div.offsetWidth > maxw){$div.style.width = maxw + 'px'}
    };
};
var tooltip = new Tooltip();