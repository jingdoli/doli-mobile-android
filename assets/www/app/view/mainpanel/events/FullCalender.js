Ext.define('doli.view.mainpanel.events.FullCalender',
		{
			extend : 'Ext.Panel',
			alias : 'widget.FullCalender',
			xtype : 'FullCalender',
			config : {
				fullscreen : true,
				cls:'fullcalendarpanel',
				layout : {
					type : 'fit'
				},
				items : [

				{
					xtype : 'fullcalendarpanel',
					listeners : {
						dayclick : function(date, allDay, jsEvent, view, fc) {
							if (allDay) {

								//alert('Clicked on the entire day: ' + date);
							} else {
								//alert('Clicked on the slot: ' + date);

							}
							//alert('Coordinates: ' + jsEvent.pageX + ','+ jsEvent.pageY);
							//alert('Current view: ' + view.name);
							// change the day's background color just for fun
							 $(fc).css('background-color', 'red');
						},
						eventclick : function(calEvent, jsEvent, view, fc) {
							alert( calEvent.title);
//							alert('Coordinates: ' + jsEvent.pageX + ','
//									+ jsEvent.pageY);
//							alert('View: ' + view.name);
							// change the border color just for fun
							  $(fc).css('border-color', 'red');
						}
					}
				} ]
			}

		});