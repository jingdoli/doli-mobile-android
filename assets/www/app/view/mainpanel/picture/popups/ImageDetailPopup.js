
Ext.define("doli.view.mainpanel.picture.popups.ImageDetailPopup",{
	extend:'Ext.Panel',
	alias:'widget.imagedetialpopup',
	xtype:'imagedetialpopup',
	config:{
		cls:'imagedetialpopup',
		//fullscreen:true,
		//centered: true,
		//border: false,
		//frame: false,
		//modal: true,
		//hideOnMaskTap :false,
		//style: 'background-color:red !important;border: none; border-radius:0.0em !important; z-index: 100 !important;',
		
	},
	initialize:function(){
		var panel=this;
		var data= this.getData();
		console.log(data);
		var isComment= data.comment === "Tap here to add a note" ? true : false
		var imageview={
				
				xtype:'label',
				cls:'imagedetialpopup_imageview',
				itemId:'imagedetialpopup_imageview',
				html:'<div cls="imagedetialpopup_imageview_div"><img style="height:100%;width:100%;border-radius:5%;-webkit-border-radius: 5%; -moz-border-radius: 5%; -webkit-border-radius: 5%; border-radius:5%;"  src='+data.imageurl+'></img></div>',
				
		};
		var date={
						
					xtype:'label',
					cls:'imagedetialpopup_date',
					itemId:'imagedetialpopup_date',
					html:'<div>'+'Clicked on :'+data.date+'</div>'
					
			};
		
		if(isComment){
			var commentTextField={
					xtype:'textfield',
					height:'10%',
					cls:'imagedetialpopup_commentfield',
					itemId:'imagedetialpopup_commentfield',
					style: "font-size: 20px; font-family:RobotoRegular;",
					placeHolder: "Add a note here",
					
			};
		} else {
			 commentTextField={
					xtype:'textfield',
					height:'10%',
					cls:'imagedetialpopup_commentfield',
					itemId:'imagedetialpopup_commentfield',
					style: "font-size: 20px; font-family:RobotoRegular;",
					value: data.comment,
					
			};
		}
		
		
		var closeBtn={
				
				xtype:'button',
				text:'Done',
				ui:'confirm',
				cls:"imagedetialpopup_closebtn",
				itemId:'imagedetialpopup_closebtn',
//				handler:function(){
//					
//					var store=Ext.getStore("store_imagegallery");
//					var index=store.findExact("id",data.id);
//					store.getAt(index).set("comment",Ext.ComponentQuery.query("#imagedetialpopup_commentfield")[0].getValue());
//					panel.destroy();
//				}
		}
		
		this.add([imageview,date,commentTextField,closeBtn])
		
	}
	
	

});