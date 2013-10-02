Ext.define("doli.view.mainpanel.notes.Notes",{
	extend:'Ext.Panel',
	alias:'widget.notes',
	xtype:'notes',
	config:{
		fullscreen:true,
		cls:'notes',
		items :[

		 		{
		 		  xtype : 'button',
		 		  //text : 'Capture a Moment',
		 		  itemId : 'notes_takenote',
		 		  cls : 'notes_takenote',
		 		  html:'<div><div class="imagegallery_capturebtn_imgdiv"> <img src="app/resources/img/note.png" style="height=40px;width=80px;"/></div><div class="imagegallery_capturebtn_text">Take a Note</div></div>',
		 		  height : '60px',
		 		}, 
		 		{
					xtype : 'notelistview'
				}
		],//items
	}
});//define