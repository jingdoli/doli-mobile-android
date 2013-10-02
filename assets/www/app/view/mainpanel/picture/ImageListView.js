
var tpl='<div class="imagelistview_item">'+
			'<div class="imagelistview_imagediv"><img style="height:100%;width:100%;" src={imageurl} /></div>'+ 
			'<div class="imagelistview_comment">{comment}</div>' +
			'<div class="imagelistview_date">Clicked on :{date}</div>' +
		 '</div>';

Ext.define("doli.view.mainpanel.picture.ImageListView",{
	extend:'Ext.List',
	alias:'widget.imagelistview',
	xtype:'imagelistview',
	config:{
		itemTpl:tpl,
		fullscreen:true,
		grouped: true,
		cls:'imagelistview',
		store:'store_imagegallery',
		emptyText:'No Picture taken' 
	} 
	
});