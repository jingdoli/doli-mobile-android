		Ext.define("doli.view.mainpanel.HomeScreen", {
		extend : 'Ext.Container',
		alias : 'widget.homescreen',
		xtype : 'homescreen',
		
		config : {
			cls : 'homescreen',
		items : [
					{
							xtype : 'panel',
							cls : 'homescreen_toppanel',
							itemId : 'homescreen_toppanel',
							layout:'hbox',
							//html:'<div class="notetoolbar_div"><center><img style="background-size:40% 100%;" src="app/resources/img/Logo.png" ></img></center></div>',
							items:[
									{
										xtype:'label',
										cls:'logo_label',
										html:'<div class="notetoolbar_div"><center><img class="logo_label_img" src="app/resources/img/Logo.png" ></img></center></div>',
									},
									{
										
										xtype:'button',
										iconCls:'logout',
										iconAlign:'top' ,
										text:'<div style="font-size: 58%;">Logout</div>',
										cls:'logout_btn',
										handler:function(){
											DoliUtils.logoutService();
										}
									}]
					},
					{
							xtype : 'panel',
							cls : 'homescreen_tabpanel',
							layout:'hbox',
							itemId : 'homescreen_tabpanel',
							items : [
		         
		         {
		        	 		xtype : 'panel',
		        	 		cls:'homescreen_tabpanel_clientarea',
		        	 		 fullscreen:true,
		        	 		id:'homescreen_tabpanel_clientarea',
		        	 		itemid:'homescreen_tabpanel_clientarea',
		        	 		items:[
		        	 		       // This is for default selection
		        	 		       {xtype:'imagegallery'}
					        ],
					      
				  },
				  {
							xtype : 'toolbar',
							docked : 'right',
							cls:'homescreen_tabpanel_toolbar',
							items : [ 
							         
							        
										{
												xtype : 'button',
												baseCls:'homescreen_tabpanel_toolbar_profile',
												handler:function(){
													DoliUtils.mixpanelTrack("Profile Visits")
													Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].removeAll(true,true);
													Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].add({xtype:'profile'})
										}	  
										},
							         
							         
							         
							         	{
							         		xtype : 'button',
							         		pressedCls:'user',
							         		//iconCls :'homescreen_tabpanel_toolbar_picture',
							         		baseCls:'homescreen_tabpanel_toolbar_picture',
							         		handler:function(){
							         			//alert(SERVER.auth_token);
							         		 DoliUtils.mixpanelTrack("Photo Gallery Visits")
							         		 Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].removeAll(true,true);
							         		 Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].add({xtype:'imagegallery'})
						        	  }	  
						          },
						        
		
						          {
						        	  xtype : 'button',
						        	  baseCls :'homescreen_tabpanel_toolbar_calender',
						        	  handler:function(){
						        		  DoliUtils.mixpanelTrack("Events Visits")
						        		  //get all the events from the db
						        			 var store=Ext.getStore("events_store");
						        		  if(store.getCount() < 1){
						        			  DoliUtils.setLoadingMask("Fetching your Events ...");
						        			  DBUtils.getAllEvents(DoliUtils.doliController.getAllEvents);
						        		  }
						        		  else{
						        			  Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].removeAll(true,true);
						        			  Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].add({xtype:'events'})
						        		  }
						        		 
						        	  }	
						        		  
						          },
						        
		
						          {
						        	  xtype : 'button',
						        	  baseCls :'homescreen_tabpanel_toolbar_notes',
						        	  handler:function(){
						        		  DoliUtils.mixpanelTrack("Notes Visits")
						        		  Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].removeAll(true,true);
						        		  Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].add({xtype:'notes'})
									        	  }	
									          } 
									        ]
		
					},]
				}],
				listeners:{
					activate:function(){
						
						setTimeout(function(){
							DoliUtils.removeLoadingMask();
							
						},1000);
						
					
					      //Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].removeAll(true,true);
		        		  //Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].add({xtype:'imagegallery'})
									}
								}
		},//config
		
});