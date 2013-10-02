Ext.define('doli.model.imagegallery.ImageGallery', {
	extend : 'Ext.data.Model',
	config : {	
	
		fields : [		
		
		 { name: 'imageurl',type: 'string' },
		 { name: 'comment',type: 'string',defaultValue:'Tap here to add a note' },
		 { name: 'date',type: 'string' ,defaultValue:new Date().toString().substring(0,15)},
		 { name: 'dateInt',type: 'int' ,defaultValue:new Date().getTime()},
		
		],
							
	}
});