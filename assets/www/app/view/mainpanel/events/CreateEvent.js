Ext.define("doli.view.mainpanel.events.CreateEvent",{
	extend:'Ext.Panel',
	alias:'widget.createevent',
	xtype:'createevent',
	config:{
		cls:'createevent',
	},//config
	initialize:function(){
		
		var eventtoolbar={
				xtype:'label',
				cls:"notetoolbar",
				html:'<div class="notetoolbar_div"><center><img src="app/resources/img/Logo.png" ></img></center></div>',
				
			};
			var title_label={
					
					xtype:'label',
					html:'<div class="note_title_label_html">Event Title</div>',
					itemid:'notetitlelabel',
					cls:'notetitlelabel',
			};
			var title_textfield={
					xtype:'textfield',
					height:'30%',
					cls:'notetitletextfield',
					itemId:'eventtitletextfield',
					style: "font-size: 20px; font-family:RobotoRegular;",
					placeHolder: "Add a title ",
					
			};
			var startlabel={
					xtype:'label',
					html:'<div class="note_title_label_html">Start Date&Time</div>',
					itemid:'notesubjectlabel',
					cls:'notesubjectlabel',
				};
			var startdate={
					xtype:'datetimepickerfield',
					height:'30px',
					cls:'notesubjectetextfield',
					itemId:'event_startdatetimepicker',
					
					
					
			};
			var endlabel={
					xtype:'label',
					html:'<div class="note_title_label_html">End Date&Time</div>',
					itemid:'event_enddatetimepicker',
					cls:'notesubjectlabel',
				};
			var enddate={
					xtype:'datetimepickerfield',
					height:'30px',
					cls:'notesubjectetextfield',
					itemId:'event_enddatetimepicker',
					
					
					
			};
			var spacer={
					xtype:'spacer'	,
					cls:'note_topspacer',
			};
			var save ={
					
					xtype:'button',
					text:'Save',
					ui:'confirm',
					cls:"event_closebtn",
					//height:'50px',
					itemId:'event_savebtn',
					
			}
			
		    var cancel ={
					
					xtype:'button',
					text: "Cancel",
					ui:'decline',
					cls:"event_cancelbtn",
					//height:'50px',
					itemId:'event_cancelbtn',
					
					
			}
		
			var subject_label={
					xtype:'label',
					html:'<div class="note_title_label_html">Add Event Details</div>',
					itemid:'notesubjectlabel',
					cls:'notesubjectlabel',
				};
			var subject_textfield={
					xtype:'textareafield',
					height:'200px',
					cls:'notesubjectetextfield',
					//value: data === null ? "" : data.note ,
					itemId:'eventnotetextarea',
					style: "font-size: 20px; font-family:RobotoRegular;",
					placeHolder: "Add a note ",
					
			};
			
			var panel={
				xtype:'panel',
				cls:'createeventpanel',
				items:[eventtoolbar,title_label,title_textfield,startlabel,startdate,endlabel,enddate,subject_label,
				       subject_textfield]
			};
			
			var buttonpanel={
				xtype:'panel',
				cls:'event_buttonpanel',
				layout:'hbox',
				items:[save,cancel]
				
			};
			this.add([panel,buttonpanel]);
	}
});