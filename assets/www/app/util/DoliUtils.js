/*
 *         Author : Madhusudhan Mahale
 *         email  : mahale.labs@gmail.com
 *         Copyright : Doli Diaries 2013
 * 
 * 
 */

Ext.define("doli.util.DoliUtils",{
	singleton: true,
	alternateClassName: 'DoliUtils',      
	doliController:null,
	COLON:"colon",
	FORWARD_SLASH:'dolifwdslash',
	SPACE:"dolispace",
	SUCCESS:1,
	ERROR:0,
	setLoadingMask:function(text){
		var mask= {
			        xtype: 'loadmask',
			       // messageCls:'loadingmask',
			        message: text,
			        ui:'dark',
			        border:1,
			        style: 'border-color: #00CCFF; border-style: solid; height:100%;width:100%'
			      
			        
			        
        		 };
		Ext.Viewport.setMasked(mask);
	},
	removeLoadingMask:function(){
		Ext.Viewport.setMasked(false);
	},
	
	loginService:function(username,password){
		
		DoliUtils.setLoadingMask("Login in progress...");
		var tok = username + ':' + password;
		var hash = Base64.encode(tok);
		//alert([username,password,tok]);
		var auth= "Basic " + hash;
		Ext.Ajax.request({
		    url : SERVER.host_address,
		    method : 'GET',
		    headers : { Authorization : auth},
		    success: function(response) {
		    	DoliUtils.removeLoadingMask();
		    	var text = response.responseText;
				var data = JSON.parse(text);
				if(data.objects[0].key !== undefined){
					SERVER.auth_token=data.objects[0].key;
					//alert(data.objects[0].key);
					DoliUtils.loginSuccess();
				} else {
					
					Ext.Msg.alert("Authentication Failed","Check your username/password");
				}
		    },
		    failure: function(response) {
		     DoliUtils.removeLoadingMask();
		     //console.log(response);
		     //console.log(response.status);
		     if(response.status == 0){
		     		
		     	
		        Ext.Msg.alert("Server Error","Check username password / Internet connection");
		    	// Testing Only
		    	DoliUtils.loginSuccess();
		    	
		     } else {
		    	 Ext.Msg.alert("Error",response.responseText);
		     }
		    
		      
		    }
		});
	
	},//login service
	
	loginSuccess:function(){
		Ext.Viewport.setMasked(false);
		var diaryscreen=Ext.create('doli.view.diary.Dairy');
		Ext.Viewport.add(diaryscreen);
		Ext.Viewport.animateActiveItem(diaryscreen,{type: 'slide', direction: 'left',duration:500 });
		
	},
	loginFailure:function(){
		
	},
	getRequiredClass:function(classname){
		Ext.require(classname);
	},
	
	mapSpecialChars:function(data){
		var finalString;
		console.log(data)
		finalString = data.replace(new RegExp(":", 'g'),DoliUtils.COLON);
		finalString=finalString.replace(new RegExp("/", 'g'),DoliUtils.FORWARD_SLASH);
		finalString=finalString.replace(new RegExp(" ", 'g'),DoliUtils.SPACE);
		
		return finalString;
		
	},
	reverseMapSpecialChars:function(data){
		
		var finalString;
		finalString=data.replace(new RegExp(DoliUtils.COLON, 'g'),":")
		finalString=finalString.replace(new RegExp(DoliUtils.FORWARD_SLASH,'g'),"/");
		finalString=finalString.replace(new RegExp(DoliUtils.SPACE,'g')," ");
		return finalString;
	},
	
	getDateFormatted:function(date){
		
		var mydate=new Object();
		mydate.year=date.substring(0,4)
		mydate.month=date.substring(4,6);
		mydate.day=date.substring(6,8);
		mydate.hour=date.substring(8,10);
		mydate.minute=date.substring(10,12);
		
		return mydate;
			
			
			
		
	},
	getStoreDataInArrayFormat: function(store){
		var dataArray=new Array()
		 var date = new Date(),d = date.getDate(),m = date.getMonth(),y = date.getFullYear();
		for(i=0;i<store.getAllCount();i++){
			// TODO Need to make wiring right 
			   var event=new Object();
			   //event.id=<store.getAt(i).data.
			   event.title=store.getAt(i).data.title;
			   event.start= new Date(store.getAt(i).data.startdate),
			   event.end= new Date(store.getAt(i).data.enddate),
			   event.allDay=false;
		       dataArray.push(event);
		}
		//return Ext.util.JSON.encode(dataArray);
		console.log("############## INSINDE getStoreDataInArrayFormat ############# ")
		console.log(dataArray);
		return dataArray;
	},
	signupService:function(username,password,email){
	  DoliUtils.setLoadingMask('Sign-up in progress...')
       var user= new Object();
	    user.username=username;
	    user.password=password;
	    user.email=email;
	    console.log(JSON.stringify(user));
       Ext.Ajax.request({
						url: SERVER.signup_address,
						method: "POST",
						params: JSON.stringify(user),
						headers: AUTH_HEADER,
						write: 'json',
						success: function(response) {
						  DoliUtils.removeLoadingMask()
							Ext.Msg.alert("Welcome to Doli Diaries" , "Your account succesfully created.");
							Ext.Viewport.animateActiveItem(DoliUtils.doliController.getLoginscreen(),{type: 'slide', direction: 'down',duration:1000 });
						},
						failure:function(response){
						
							DoliUtils.removeLoadingMask()
							 if(response.status === 0){
		    	  				Ext.Msg.alert("Not able to contact server","Check if you are connected to Internet");
		    					//DoliUtils.loginSuccess();
		     				 } else {
		     				 
		     				 		if(response.responseText.indexOf("already exists") && response.responseText.indexOf("username")){
		     				 		
		     				 			Ext.Msg.alert("Error","This Username is already taken, please try with other.");
		     				 		} else {
		     				 			 Ext.Msg.alert("Error",response.responseText);
		     				 		}
		    					
		    				 }
						}
					});



	},

});