
Ext.define("doli.view.mainpanel.notes.popups.TakeNotePopup",{
	extend:'Ext.Panel',
	alias:'widget.takenotepopup',
	xtype:'takenotepopup',
	config:{
		cls:'takenotepopup',
		fullscreen:true,
		//centered: true,
		//border: false,
		//frame: false,
		//modal: true,
		hideOnMaskTap :false,
		//style: 'background-color:red !important;border: none; border-radius:0.0em !important; z-index: 100 !important;',
		
	},
	initialize:function(){
		
		var panel=this;
		var data= this.getData();
//		/alert(data);
		var notetoolbar={
			xtype:'label',
			cls:"notetoolbar",
			html:'<div class="notetoolbar_div"><center><img src="app/resources/img/Logo.png" ></img></center></div>',
			
		};
		var title_label={
				
				xtype:'label',
				html:'<div class="note_title_label_html">Title</div>',
				itemid:'notetitlelabel',
				cls:'notetitlelabel',
		};
		var title_textfield={
				xtype:'textfield',
				height:'30%',
				cls:'notetitletextfield',
				value: data=== null ? "" : data.subject ,
				itemId:'notetitletextfield',
				style: "font-size: 20px; font-family:RobotoRegular;",
				placeHolder: "Add a title ",
				
		};
		var subject_label={
				xtype:'label',
				html:'<div class="note_title_label_html">Details</div>',
				itemid:'notesubjectlabel',
				cls:'notesubjectlabel',
			};
		var subject_textfield={
				xtype:'textareafield',
				height:'200px',
				cls:'notesubjectetextfield',
				value: data === null ? "" : data.note ,
				itemId:'notesubjectetextfield',
				style: "font-size: 20px; font-family:RobotoRegular;",
				placeHolder: "Add a note ",
				
		};
		var spacer={
				xtype:'spacer'	,
				cls:'note_topspacer',
		};
		var save ={
				
				xtype:'button',
				text:'Save',
				ui:'confirm',
				cls:"note_closebtn",
				height:'70px',
				itemId:'takenotepopup_SaveBtn',
				
		}
		
	    var cancel ={
				
				xtype:'button',
				text: data === null ? "Cancel" : "Delete",
				ui:'decline',
				cls:"note_cancelbtn",
				height:'70px',
				itemId:'takenotepopup_cancelbtn',
				
				
		}
	
		var container={
				xtype:'panel',
				cls:'note_container',
				items:[title_label,title_textfield,subject_label,subject_textfield,save,cancel]
		}
		this.add([notetoolbar,container])
		
	},//initialize
	
	

});