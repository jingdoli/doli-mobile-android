/**
 * TouchCalendar.store.Events
 */
Ext.define('doli.store.events.Events', {
	requires:['doli.model.events.Events'],
    extend: 'Ext.data.Store',
    config: {
	    storeId : 'events_store',
        model   : 'doli.model.events.Events',
	    autoLoad: false
    },
    constructor: function(config){
        this.callParent(arguments);
    }

});










//proxy   : {
//type    : 'ajax',
//url     : 'data/eventData.json',
//reader  : {
//    type        : 'json',
//    rootProperty : 'data'
//}
//},