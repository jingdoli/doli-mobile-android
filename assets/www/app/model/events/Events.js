/**
 * TouchCalendar.model.Event
 */
Ext.define('doli.model.events.Events', {
	extend : "Ext.data.Model",
	config : {
		fields : [ {
			name : 'title',
			type : 'string'
		}, {
			name : 'startdate',
			type : 'string'
		}, {
			name : 'enddate',
			type : 'string'
		}, {
			name : 'allday',
			type : 'boolean',
			
		}, {
			name : 'url',
			type : 'string',
			
		}, ]
	}
});