/*
 *         Author : Madhusudhan Mahale
 *         email  : mahale.labs@gmail.com
 *         Copyright : Doli Diaries 2013
 * 
 * 
 */
Ext.define("doli.view.profile.Profile",{
	extend : 'Ext.Panel',
	alias : 'widget.profile',
	xtype:'profile',
	config : {
		cls : 'profile',
		items : [
		         
		         {
		        	 xtype:'panel',
		        	 cls:'profile_image_panel',
		        	 layout:'vbox',
		        	 items:[
		        	        
		        	        {
		        	        	xtype:'label',
		        	        	cls:'profile_image_panel_imgview',
		        	        	html:'<div class="notetoolbar_div"><center><img id="user_label_img" class="user_label_img" src="app/resources/img/Logo.png" ></img></center></div>',
		        	        	
		        	        },
		        	        {
		        	        	xtype:'panel',
		        	        	cls:'profile_image_controls',
		        	        	layout:'hbox',
		        	        	items:[
		        	        	       {
		        	        	    	   xtype:'button',
		        	        	    	   text:'Change Picture',
		        	        	    	   ui: 'round',
		        	        	    	   cls:'profile_click_btn',
		        	        	    	   handler:function(){
		        	        	    		   try{
		        	        	    			   console.log("Profile Pic Clicking....")
			        	        	    		   CameraUtils.getProfilePic();
		        	        	    		   } catch (e) {
		        	        	    			   Ext.Msg.alert("Error"+message)
											}
		        	        	    		   
		        	        	    	   }
		        	        	       },
//		        	        	       {
//		        	        	    	   xtype:'button',
//		        	        	    	   cls:'profile_upload_btn',
//		        	        	    	   text:'upload',
//		        	        	    	   handler:function(){
//		        	        	    		   try{
//		        	        	    			  
//		        	        	    		   } catch (e) {
//		        	        	    			   Ext.Msg.alert("Error"+message)
//											}
//		        	        	    		   
//		        	        	    	   }
//		        	        	       }
		        	        	       
		        	        	]
		        	        }
		        	        
		        	        ]
		         },
		         
		         {
		        	 xtype:'label',
		        	 itemId:'profile_username',
		        	 html:"<div class='profile_username'>USERNAME :" +localStorage.getItem("username")+"</div>",
		         }
		         
			],
			listeners:{
				activate:function(self,eOpts){
					try{
						Ext.ComponentQuery.query("#profile_username").setValue(localStorage.getItem("username"));
					} catch (e) {
						// TODO: handle exception
					}
				
					//localStorage.setItem("userpic","app/resources/img/test.png");
					var userpic=localStorage.getItem("userpic");
					if(userpic != null){
						document.getElementById("user_label_img").src=userpic;
					} else {
						document.getElementById("user_label_img").src=DoliUtils.USER_PIC;
					}
				}
			},
	},


});// define
