Ext.define("doli.view.mainpanel.picture.ImageGallery", {
	extend : 'Ext.Panel',
	alias : 'widget.imagegallery',
	xtype : 'imagegallery',
	config : {
		cls : 'imagegallery',
		fullscreen : true,
		//scrollable: true,
		items : [

		{
			xtype : 'button',
			//text : 'Capture a Moment',
			itemId : 'imagegallery_capturebtn',
			cls : 'imagegallery_capturebtn',
			html:'<div><div class="imagegallery_capturebtn_imgdiv"> <img src="app/resources/img/camera48.png" style="height=50px;width=80px;"/></div><div class="imagegallery_capturebtn_text">Capture a Moment</div></div>',
			height : '60px',
		}, {
			xtype : 'imagelistview'
		}

		],
		
		listeners:{
			activate:function(){
				//alert("activate gallery")
				DBUtils.createImageGalleryTableIfNotCreated();
				 var store=Ext.getStore("store_imagegallery");
				 if(store.getCount() == 0){
					 DBUtils.getCameraGalleryData(CameraUtils.updateImageStore);
				 }
			}
		}

	},

});













// define

//loadImages: function () {
//	    var me = this;
//		Ext.data.JsonP.request({
//				url: 'http://api.flickr.com/services/feeds/photos_public.gne',
//				callbackKey: 'jsoncallback',
//				params: {
//				format: 'json'
//				},
//				success: function (response) {
//					console.log(response);
//				me.items = response.items;
//				me.setData(response);
//		}
//		});
//	}

