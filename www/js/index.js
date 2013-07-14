


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
		document.addEventListener("backbutton", onBackButton, true);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        try {
			FB.init({ appId: "634897163203187",
			nativeInterface : CDV.FB,
			useCachedDialogs : false});
			
		} catch (e) {
			alert(e);
		}
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
    },

};
app.initialize();

function onFileSystemSuccess(fileSystem) {
	fileSystem.root.getDirectory("Photos", {create: true, exclusive: false}, getDirSuccess, fail);
	
}

function getDirSuccess(dirEntry) {
    // Get a directory reader
    var directoryReader = dirEntry.createReader();
	window.photosDir = dirEntry;
    // Get a list of all the entries in the directory
    directoryReader.readEntries(readerSuccess,fail);
	
}

function readerSuccess(entries) {
    var i;
    for (i=0; i<entries.length; i++) {
        alert(entries[i].name);
    }
}

function onBackButton(e) {
	showContent("notes", ".content_div");
}

function fail(err){
	alert("Error: "+err.code);
	for(var a in err.code)
		alert(a + ' ' + err[a]);
}

function dbErrorHandler(err){
	alert("DB Error: "+err.message + "\nCode="+err.code);
}

$(document).delegate('#loginBtn', 'click', function () {

	// Check if have already the user on this device
	if(!dbShell) {
		dbShell = window.openDatabase("DD", 2, "DD", 1000000);
	}
	dbShell.transaction(function (tx) {
			tx.executeSql("CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY,name,pass)");
		},
		dbErrorHandler,
		function (tx) {
			dbShell.transaction(function(tx) {
				tx.executeSql("select id, name, pass from user",[],
				function (tx,results){
					if (results.rows.length == 0) {
						serverLogin(function () {
							hideLogin();
							tx.executeSql("insert into user(name,pass) values(?,?)",
								[$( "#emailId" ).val(),$( "#password" ).val()]);
						}
						);
					} else {
						hideLogin();
					}
				},
				dbErrorHandler);
			}, dbErrorHandler);
		});

	


});
function hideLogin() {
		$('#loginContainer').hide();
		$('#loginForm').hide();
		$('#mainPage').show();
}
function serverLogin(loginSucess) {
	// Call the server o make sure user exists
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
		loginSucess();
	})
    .fail(function() { 
		navigator.notification.alert(
            "Username and password don't match our records.",  // message
            function() {$( "#password" ).val('')},         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
	})
    ;
}

$(document).delegate('#signUpBtn', 'click', function () {
		$('#loginContainer').hide();
		$('#loginForm').hide();
		$('#signUpContainer').show();
});

$(document).delegate('#signPostUpBtn', 'click', function () {
	$.ajax
	({
		type: "POST",
		url: "http://ec2-23-22-241-127.compute-1.amazonaws.com/api/v1/newuser/?username=dolimobile&api_key=57018a04ac265719812f18b034c89288e24ec56f",
		dataType: 'json',
		async: false,
		 data: { username: $( "#s_userName" ).val(), password: $( "#s_password" ).val(), email: $( "#s_emailId" ).val() }
	}) .done(function(data) { 
		navigator.notification.alert(
            "Please check your e-mail to complete registration.",  // message
            function() {$( "#password" ).val('')},         // callback
            'Done,',            // title
            'OK'                  // buttonName
        );
		$('#signUpContainer').hide();
		$('#loginContainer').show();
		$('#loginForm').show();
		
	})
    .fail(function() {
		navigator.notification.alert(
            "There was a problem during registration.",  // message
            function() {$( "#password" ).val('')},         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
	})
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

