Ext.define("doli.view.mainpanel.events.Events",{
	extend:'Ext.Panel',
	alias:'widget.events',
	xtype:'events',
	config:{
		cls:'events',
		fullscreen:true,
	},
	initialize:function(){
		
		   //var store=Ext.getStore("events_store");
		   //var data = DoliUtils.getStoreDataInArrayFormat(store)
		
		
		var fullcalender=Ext.create("doli.view.mainpanel.events.FullCalender");
	    var createEventBtn =
	    		{
			 		  xtype : 'button',
			 		  //text : 'Capture a Moment',
			 		  itemId : 'events_createEvent',
			 		  cls : 'notes_takenote',
			 		  html:'<div><div class="imagegallery_capturebtn_imgdiv"> <img src="app/resources/img/plus.jpg" style="height=40px;width=80px;"/></div><div class="imagegallery_capturebtn_text">Create an Event</div></div>',
			 		  height : '60px',
			 		};
	    
		this.add([createEventBtn,fullcalender]);
	}
});//define