var items;
Ext.define("doli.view.mainpanel.picture.ImageListView1",{
	extend:'Ext.Panel',
	alias:'widget.imagelistview',
	xtype:'imagelistview',
	config:{
		cls:'imagelistview',
		scrollable: true,
		fullscreen:true,
		tpl: Ext.create('Ext.XTemplate',
				'<tpl if="this.isEmpty(items)">',
				'<div class="empty-text empty-gallery">No image available</div>',
				'</tpl>',
				'<div class="gallery" id="photos">',
				'<tpl for=".">',
				//'<img src="{imageurl}" class="thumbnail" data-fullimage="{imageurl}"/>',
				 '<img src="{imageurl:this.getThumbnail}" class="thumbnail" data-fullimage="{imageurl:this.getFullImage}"/>',
				'</tpl>',
				'</div>',{
					isEmpty: function (items) {
						if (items.length === 0) {
							
						return true;
						}
						return false;
						},
						 
						getThumbnail: function (url) {
							
						//return url.replace('_m', '_t');
							return url;
						},
						 
						getFullImage: function (url) {
						return url.replace('_m', '_n');
						},
						
				})	
	},
	initialize: function () {
		var me = this;
		// Add tap event on the images to open the carousel
		me.element.on('tap', function (e, el) {
		me.showGalleryCarousel(el);
		}, me, {
		delegate: 'img.thumbnail'
		});
		me.callParent(arguments);
		
//		loadImages: function () {
//	    var me = this;
	    var store=Ext.getStore('store_imagegallery')
	    this.createArray(me)
		
		},
		
		
		createArray:function(me){
		
			var store=Ext.getStore('store_imagegallery')
		
			var imageArray=[];
			for(var i=0;i<store.getCount();i++){
				console.log(store.getAt(i).data)
				imageArray.push(store.getAt(i).data);
			}
			items=imageArray;
			me.setData(items);
		},
		showGalleryCarousel: function (clickedImage) {
			
			alert(clickedImage);
			 me = this,
			clickedImgIndex = 0;
			console.log(me)
			// alert(me.images)
			// Query all the images and save in an array
			me.images = me.images || me.element.query('img.thumbnail');
			 
			// Create the Gallery Carousel
			var galleryCarousel = Ext.Viewport.add({
			xtype: 'gallerycarousel',
			images: me.images
			});
			 
			// On clicking close icon, hide the carousel
			// and destroy it after a certain perdiod
			galleryCarousel.element.on('tap', function (e, el) {
				
			galleryCarousel.hide(true);
			 
			Ext.defer(function () {
			Ext.Viewport.remove(galleryCarousel);
			}, 300);
			}, this, {
			delegate: 'div[data-action="close_carousel"]'
			});
			 
			// Get the image index which is clicked
			while ((clickedImage = clickedImage.previousSibling) != null) {
			clickedImgIndex++;
			}
			 
			// Set the clicked image container as the active item of the carousel
			galleryCarousel.setActiveItem(clickedImgIndex);
			 
			// Show the carousel
			galleryCarousel.show();
			}
			
		

});//define