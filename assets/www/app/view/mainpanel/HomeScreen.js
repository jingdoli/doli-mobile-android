Ext.define("doli.view.mainpanel.HomeScreen",
				{
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
										//html : '<div style="align:center;" ><div class="homescreen_toppanel_imgdiv"></div></div>',
										html:'<div class="notetoolbar_div"><center><img style="background-size:40% 100%;" src="app/resources/img/Logo.png" ></img></center></div>',
													}, {
									xtype : 'panel',
									cls : 'homescreen_tabpanel',
									layout:'hbox',
									itemId : 'homescreen_tabpanel',
									items : [
									         
									         {
												xtype : 'panel',
												cls:'homescreen_tabpanel_clientarea',
												id:'homescreen_tabpanel_clientarea',
												itemid:'homescreen_tabpanel_clientarea',
												fullscreen:true,
											  },
											  {
													xtype : 'toolbar',
													docked : 'right',
													cls:'homescreen_tabpanel_toolbar',
													items : [ 
													          {
													        	  xtype : 'button',
													        	  //iconCls :'homescreen_tabpanel_toolbar_picture',
													        	  baseCls:'homescreen_tabpanel_toolbar_picture',
													        	  handler:function(){
													        		  //alert(SERVER.auth_token);
													        		  Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].removeAll(true,true);
													        		  Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].add({xtype:'imagegallery'})
													        	  }	  
													          },
													        
							
													          {
													        	  xtype : 'button',
													        	  baseCls :'homescreen_tabpanel_toolbar_calender',
													        	  handler:function(){
													        		  
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
													        		  Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].removeAll(true,true);
													        		  Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].add({xtype:'notes'})
																        	  }	
																          } 
																        ]
									
												},]
											}],
											listeners:{
												activate:function(){
												      Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].removeAll(true,true);
									        		  Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].add({xtype:'imagegallery'})
												}
											}
					},//config

				});