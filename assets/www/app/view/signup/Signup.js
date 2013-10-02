Ext.define("doli.view.signup.Signup",{
	extend:'Ext.Panel',
	alias:'widget.signup',
	config:{
		fullscreen:true,
		cls:'signupscreen',
	},//config
	initialize:function(){
		
		var toolbar = {
				xtype:'label',
				cls:"",
				html:'<div class="notetoolbar_div"><center><img src="app/resources/img/Logo.png" ></img></center></div>',
				
			};
	
		var signuplabel = {
				xtype:'label',
				cls:"signup_signuplabel marginbottom5",
				html:'<div class="notetoolbar_div"><center>Create your Doli Diaries Account  </center></div>',
				
			};
		var username={
				xtype:'textfield',
				//height:'30%',
				cls:'signup_username marginbottom5',
				itemId:'signup_username',
				style: "font-size: 20px; font-family:RobotoRegular;",
				placeHolder: "Username",
				//value:'testusermm21',
				
		};
		var email={
				xtype:'textfield',
				//height:'30%',
				cls:'signup_email marginbottom5',
				itemId:'signup_email',
				style: "font-size: 20px; font-family:RobotoRegular;",
				placeHolder: "Email",
				//value:'testusermm21@gmail.com',
				
		};
		var password={
				xtype : 'passwordfield',
				//height:'30%',
				cls:'signup_password marginbottom5',
				itemId:'signup_password',
				style: "font-size: 20px; font-family:RobotoRegular;",
				placeHolder: "Password",
				//value:'testusermm21',
				
		};
		var confirmpassword={
				xtype : 'passwordfield',
				//height:'30%',
				cls:'signup_confirmpassword marginbottom5',
				itemId:'signup_confirmpassword',
				style: "font-size: 20px; font-family:RobotoRegular;",
				placeHolder: "Confirm Password",
				//value:'testusermm21',
				
		};
		var save ={
				
				xtype:'button',
				text:'Sign-Up',
				ui:'confirm',
				cls:"note_closebtn",
				height:'50px',
				itemId:'signup_signupBtn',
				
		}
		
	    var cancel ={
				
				xtype:'button',
				text: "Cancel",
				ui:'decline',
				cls:"note_cancelbtn",
				height:'50px',
				itemId:'signup_cancelbtn',
				
				
		}
		var  panel={
				xtype:'panel',
				cls:'signup_container_panel',
				items:[signuplabel,username,email,password,confirmpassword,save,cancel],
		}
		this.add([toolbar,panel]);
	}
	
});//define