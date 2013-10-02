Ext.define("doli.store.notes.Notes", {
	extend: "Ext.data.Store",
	requires:['doli.model.notes.Notes'],
	config: {
		storeId: 'store_notes',
		model: "doli.model.notes.Notes",
		autoLoad: false,
		clearOnPageLoad: false,
//		 grouper: {
//             sortProperty: 'group_index',
//             groupFn: function(record) {
//                 return record.get('date') + ':';
//             }
//         },
         sorters: [
                   {
                     property: 'dateInt',
                     direction: 'DESC'
                   }
                ],
		data:[
		      
//		      { title:'Shopping Tips'},
//		      { title:'Dress Fashoins'},
//		      { title:'Dress Tips'},
//		      { title:'Aroma Therapy'},
//		      { title:'Nails and hair'},
		    
		      
		  
		      ],
	}//Config
});//define
