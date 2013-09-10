var cfg = { 
        task:'launchFeedback',//[launchFeedback|contactUs|viewForum|postIdea]
        
        site:'dolidiaries.uservoice.com',
        key:'UFU9pwhS027Qhg2ChgBNg',
        secret:'EWBzhNArCNLg1ISFxyaJq20OdjQaAV3nhDxJu2cJc',
        
        topicId:0,//[0|453|333 (any valid topicId as interger)]
        showContactUs:1,//[0|1], Show/hide Contact us button
        showForum:1,//[0|1] Show/hide Forum button
        showPostIdea:1,//[0|1] Show/hide Post an idea button
        showKnowledgeBase:1//[0|1] Show/hide KnowledgeBase items
};


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
		
		//Load images from the filesystem
		window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onFileSystemTempSuccess, fail);
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
		
    },

};
app.initialize();

function onFileSystemSuccess(fileSystem) {
	fileSystem.root.getDirectory("Photos", {create: true, exclusive: false}, getDirSuccess, fail);

}
function onFileSystemTempSuccess(fileSystem) {
	window.fileSystem = fileSystem;
}

function getDirSuccess(dirEntry) {
    // Get a directory reader
	window.photosDir = dirEntry;

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
		navigator.notification.alert(
            "DB Error:"+err.message + "\nCode="+err.code,  // message
            function() {},         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
	
}

$(document).delegate('#loginBtn', 'click', function () {
	//hideLogin(); return;
	// Check if have already the user on this device
    mixpanel.track("User login button");
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
					
						$( "#emailId" ).val(results.rows.item(0).name);
						hideLogin();
					}
				},
				dbErrorHandler);
			}, 
			dbErrorHandler);
		});

	


});
function hideLogin() {
		$('#loginContainer').hide();
		$('#loginForm').hide();
		$('#mainPage').show();
		$('#mainContent').show();
		showContent("profile",".content_div");

		
}

function serverLogin(loginSuccess) {
	// Call the server o make sure user exists
	$.ajax
	({
	  type: "GET",
	  url: "http://ec2-54-211-79-105.compute-1.amazonaws.com/api/v1/token/?format=json",
	  dataType: 'json',
	  async: false,

	  beforeSend: function (xhr) { 
		xhr.setRequestHeader("Authorization", 
			"Basic " + Base64.encode ($( "#emailId" ).val()+':'+  $( "#password" ).val()) )
		}
	}) .done(function(data) { 
		$('#profile').append('<img src=\"css/images/profile.jpg\">');
		$('#profile').append('<div>' +$( "#emailId" ).val() +'</div>');
		loginSuccess();
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

$(document).delegate("#emailId, #password", "focus", function() {
	
    $('#loginForm').css({position: 'relative'});
	
});
$(document).delegate("#emailId, #password", "blur", function() {
    $('#loginForm').css({position: 'absolute'});
});

$(document).delegate("#s_userName, #s_emailId, #s_password, #s_password2", "focus", function() {
	
    $('#signupForm').css({position: 'relative'});
	
});
$(document).delegate("#s_userName, #s_emailId, #s_password, #s_password2", "blur", function() {
    $('#signupForm').css({position: 'absolute'});
});

$(document).delegate('#signPostUpBtn', 'click', function () {



	$.ajax
	({
		type: "POST",
		url:  "http://ec2-54-211-79-105.compute-1.amazonaws.com/api/v1/newuser/?username=dolimobile&api_key=393efdd24a1cb2c7cfc12e26303de4a2c0fdc999&genid="+(new Date()).getTime(),
		dataType: 'application/json',
		contentType: 'application/json',
		processData: false,
		async: false,
		cache: false,
		data: 
			JSON.stringify (
				{
					username: $( "#s_userName" ).val(), 
					password: $( "#s_password" ).val(), 
					email: $( "#s_emailId" ).val()
					
					} ) 
		 
	}) .done(function(data) { 
		navigator.notification.alert(
            "Please check your e-mail to complete registration.",  // message
            function() {$( "#password" ).val('')},         // callback
            'Done,',            // title
            'OK'                  // buttonName
        );
		$('#signUpContainer').hide();
		$('#loginForm').show();
		$('#loginContainer').show();

		
	})
    .fail(function(err) { 
		if(err.status == '201') {
				navigator.notification.alert(
					"User account created successfully! Please use your username to log in.",  // message
					function() {$( "#password" ).val('')},         // callback
					'Done,',            // title
					'OK'                  // buttonName
				);
				$('#signUpContainer').hide();
				$('#loginContainer').show();
				$('#loginForm').show();
		} else if(err.status == '404') {
		
			navigator.notification.alert(
				"Sorry, the username already exists, please try another username."+err,  // message
				function() {$( "#s_userName" ).val(''); $( "#s_password" ).val(''); $( "#s_emailId" ).val('');},     
				'Error',            // title
				'OK'                  // buttonName
			);
		} else {
			navigator.notification.alert(
				"There was a problem during registration."+err,  // message
				function() {$( "#password" ).val('')},         // callback
				'Error',            // title
				'OK'                  // buttonName
			);
		}
	})
    ;
	


});
$(document).delegate('#signOffBtn', 'click', function () {
		$('#mainPage').hide();
		$('#profile').empty();
		$('#loginForm').show();
		$('#loginContainer').show();

});

$(document).delegate('#signUpBackBtn', 'click', function () {
		$('#signUpContainer').hide();
		$('#loginForm').show();
		$('#loginContainer').show();
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
			$(this).show(); 
		}
		else {
			$(this).hide();
		}
		
	});
	$(classname ).each(function( index ) {
		if(this.id == target) { 
			if(eval("typeof init" + target) == "function") {
				eval("init" + target+ "();");
			}
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

$(document).delegate('#userVoiceBtn', 'click',function() {
    mixpanel.track("User voice button");
    showUserVoice(cfg);
});
