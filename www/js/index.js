
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
    },

};

$(document).delegate('#loginBtn', 'click', function () {
	$('#loginForm').hide();
	$('#mainPage').show();
});

$(document).delegate('#openPage a', 'click',function() {

	event.preventDefault();
    
    var $toSlide= $("#mainContent"), $fromSlide= $("#openPage");
	

	$fromSlide.animate({"left":"-100%"},500,'swing');
	$toSlide.animate({"left":"0%"},500,'swing',function()
	{  
			
		$fromSlide.hide();
		$toSlide.show();
		$("#profile").show();
	});
    return false;                   
});


$(document).delegate('#mainNavigation a', 'click',function() {
	var target = this.attributes["data-href"].value;
	showContent(target);
	

	
});

$(document).delegate('#newNoteSubmitButton', 'click',function() {
	showEdit(-1);
});


function showContent(target) {
	$( ".content_div" ).each(function( index ) {
		if(this.id == target) { 
			if(eval("typeof init" + target) == "function") {
				eval("init" + target+ "();");
			}
			
			$(this).show(); 
		}
		else {
			$(this).hide();
		}
		
	});
}
