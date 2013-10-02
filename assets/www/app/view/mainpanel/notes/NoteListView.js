

var tpl='<div class="notelistview_item">'+
			'<div class="noteslistview_subject">{subject}</div>' +
			'<div class="imagelistview_date">Noted on : {date}</div>' +
		 '</div>';


Ext.define("doli.view.mainpanel.notes.NoteListView",{
	extend:'Ext.List',
	alias:'widget.notelistview',
	xtype:'notelistview',
	config:{
		itemTpl:tpl,
		fullscreen:true,
		//grouped: true,
		cls:'notelistview',
		itemCls:'notelistview_itemCls',
		store:'store_notes',
		emptyText:'No Notes Saved ',

	} 
	
});