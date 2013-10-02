Ext.define('doli.model.notes.Notes', {
	extend : 'Ext.data.Model',
	config : {	
	
		fields : [		
		
		 { name: 'subject',type: 'string' ,defaultValue:'Subject'},
		 { name: 'note',type: 'string',defaultValue:'Tap here to add a note' },
		 { name: 'date',type: 'string' ,defaultValue:new Date().toString().substring(0,15)},
		 { name: 'dateInt',type: 'int' ,defaultValue:new Date().getTime()},
		
		],
							
	}
});