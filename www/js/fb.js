if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
	if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
	if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
	
FB.Event.subscribe('auth.login', function(response) {
						//auth.login event
				   });
	
FB.Event.subscribe('auth.logout', function(response) {
						//auth.logout event
				   });

FB.Event.subscribe('auth.sessionChange', function(response) {
						//auth.sessionChange event
				   });

FB.Event.subscribe('auth.statusChange', function(response) {
						//auth.statusChange event
				   });


function getLoginStatus() {
	FB.getLoginStatus(function(response) {
						  if (response.status == 'connected') {
							//logged in
						  } else {
							//not logged in
						  }
					  });
}
var friendIDs = [];
var fdata;
function me() {
			FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
				   if (response.error) {
				   alert(JSON.stringify(response.error));
				   } else {
				   var data = document.getElementById('data');
				   fdata=response.data;
				   console.log("fdata: "+fdata);
				   response.data.forEach(function(item) {
											 var d = document.createElement('div');
											 d.innerHTML = "<img src="+item.picture+"/>"+item.name;
											 data.appendChild(d);
										 });
				   }
				var friends = response.data;
				console.log(friends.length); 
				for (var k = 0; k < friends.length && k < 200; k++) {
					var friend = friends[k];
					var index = 1;

					friendIDs[k] = friend.id;

				}
		  });
}
            
function logout() {
	FB.logout(function(response) {
					//logged out
			  });
}
            
function login() {
	FB.login(
		 function(response) {
				
				 if (response.session) {
						hideLogin();
				 } else {
					alert('not logged in');
				 }
			 },
			 { scope: "email" }
		 );
}
			
			
function facebookWallPost() {
	var params = {
		method: 'feed',
		name: 'Facebook Dialogs',
		link: 'https://developers.facebook.com/docs/reference/dialogs/',
		picture: 'http://fbrell.com/f8.jpg',
		caption: 'Reference Documentation',
		description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
	  };
	FB.ui(params, function(obj) { console.log(obj);});
}
            
function publishStoryFriend() {
	randNum = Math.floor ( Math.random() * friendIDs.length ); 

	var friendID = friendIDs[randNum];
	if (friendID == undefined){
		alert('please click the me button to get a list of friends first');
	}else{
		var params = {
			method: 'feed',
			to: friendID.toString(),
			name: 'Facebook Dialogs',
			link: 'https://developers.facebook.com/docs/reference/dialogs/',
			picture: 'http://fbrell.com/f8.jpg',
			caption: 'Reference Documentation',
			description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
		};
		FB.ui(params, function(obj) { console.log(obj);});
	}
}
			
$(document).delegate('#fbLoginBtn', 'click',function() {
	login();
});