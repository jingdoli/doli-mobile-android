/*
 *         Author : Madhusudhan Mahale
 *         email  : mahale.labs@gmail.com
 *         Copyright : Doli Diaries 2013
 * 
 * 
 */
Ext.define("doli.store.imagegallery.ImageGallery", {
	extend: "Ext.data.Store",
	requires:['doli.model.imagegallery.ImageGallery'],
	config: {
		storeId: 'store_imagegallery',
		model: "doli.model.imagegallery.ImageGallery",
		autoLoad: false,
		clearOnPageLoad: false,
		 grouper: {
             sortProperty: 'group_index',
             groupFn: function(record) {
                 return record.get('date') + ':';
             }
         },
         sorters: [
                   {
                     property: 'dateInt',
                     direction: 'DESC'
                   }
                ],
		data:[
		      
//  		  { imageurl:'app/resources/img/doli.png',comment:'Test Image',date:Date()},
//		      { imageurl:'app/resources/img/shaadi.jpg'},
//		      { imageurl:'app/resources/img/doli.png'},
//		      { imageurl:'app/resources/img/doli.png'},
//		      { imageurl:'app/resources/img/bridedress.png'},
//		      { imageurl:'app/resources/img/doli.png'},
//		      { imageurl:'app/resources/img/shaadi.jpg'},
//		      { imageurl:'app/resources/img/doli.png'},
//		      { imageurl:'app/resources/img/doli.png'},
//		      { imageurl:'app/resources/img/dress1.png'},
//		      { imageurl:'app/resources/img/shaadi.jpg'},
//		      { imageurl:'app/resources/img/doli.png'},
//		      { imageurl:'app/resources/img/shaadi.jpg'},
//		      { imageurl:'app/resources/img/bridedress.png'},
//		      { imageurl:'app/resources/img/doli.png'},
//		      { imageurl:'app/resources/img/dress1.png'},
//		      { imageurl:'app/resources/img/shaadi.jpg'},
//		      { imageurl:'app/resources/img/doli.png'},
//		      { imageurl:'app/resources/img/shaadi.jpg'},
//		      { imageurl:'app/resources/img/doli.png'},
//		      { imageurl:'app/resources/img/doli.png'},
//		      { imageurl:'app/resources/img/shaadi.jpg'},
//		      { imageurl:'app/resources/img/dress1.png'},
//		      { imageurl:'app/resources/img/doli.png'},
//		      { imageurl:'app/resources/img/doli.png'},
//		      { imageurl:'app/resources/img/bridedress.png'},
//		      { imageurl:'app/resources/img/shaadi.jpg'},
		      ],
	}//Config
});//define
