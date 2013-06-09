


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



	$.ajax
	({
	  type: "GET",
	  url: "http://ec2-23-22-241-127.compute-1.amazonaws.com/api/v1/token/?format=json",
	  dataType: 'json',
	  async: false,

	  beforeSend: function (xhr) { 
		xhr.setRequestHeader("Authorization", 
			"Basic " + Base64.encode ($( "#emailId" ).val()+':'+  $( "#password" ).val()) )
		}
	}) .done(function(data) { 
		alert("key "+data.objects[0].key); 
		$('#loginContainer').hide();
		$('#loginForm').hide();
		$('#mainPage').show();
	
	})
    .fail(function() { alert("error"); })
    ;
	


});

$(document).delegate('#openPage a', 'click',function() {

	event.preventDefault();
    
    var $toSlide= $("#mainContent"), $fromSlide= $("#openPage");
	

	$fromSlide.animate({"width":"-100%"},500,'swing');
	$toSlide.animate({"with":"0%"},500,'swing',function()
	{  
			
		$fromSlide.hide();
		$toSlide.show();
		$("#profile").show();
	});
    return false;                   
});


$(document).delegate('#mainNavigation a', 'click',function() {
	var target = this.attributes["data-href"].value;
	showContent(target, ".content_div");
	
	$( "#mainNavigation a img" ).removeClass('lighten');
	$( "#mainNavigation a img" ).addClass('darken');
	$(this).children(":first").removeClass('darken');
	$(this).children(":first").addClass('lighten');
});

$(document).delegate('#newNoteSubmitButton', 'click',function() {
	showEdit(-1);
});


function showContent(target, classname) {
	$(classname ).each(function( index ) {
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




$(document).delegate('#calendarNavigation a', 'click',function() {
	var target = this.attributes["data-href"].value;
	showContent(target, ".calendar_content_div");
	
	$( "#calendarNavigation a img" ).removeClass('lighten');
	$( "#calendarNavigation a img" ).addClass('darken');
	$(this).children(":first").removeClass('darken');
	$(this).children(":first").addClass('lighten');
});

