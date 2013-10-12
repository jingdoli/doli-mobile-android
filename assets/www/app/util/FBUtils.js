/*
 *         Author : Madhusudhan Mahale
 *         email  : mahale.labs@gmail.com
 *         Copyright : Doli Diaries 2013
 * 
 * 
 */
 function _onLogin( event ){   
	 alert('logged in')
        alert('status > '+event.status); // 1 - success, 0 - error
        alert('data > '+event.data); //Object response (id, name, email, etc);
        alert('token > '+event.token); // token user login
        alert('message > '+event.message);  
    };
testid1 = "601764969869900";
testid = "113700398662301";
Ext.define("doli.util.FBUtils", {
	singleton : true,
	alternateClassName : 'FBUtils',
	initialize : function() {
		try {
			
			
			 config = {
				        app_id      : '601764969869900',
				        secret      : '34948fc12e42ce026f7f999f3770dadf',
				        scope       : 'publish_stream,email',
				        host        : 'fb.spot-the-differences.com', //App Domain ( Facebook Developer ).
				        onLogin     : _onLogin,
				        //onLogout    : _onLogout
				    };

		} catch (e) {

			alert(e)
		}
	},
	login : function() {
				
		try{ $(document).FaceGap(config);}
		catch (ex){alert("error"+ex) }
		
	}

});