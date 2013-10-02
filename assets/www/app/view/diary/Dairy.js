Ext.define("doli.view.diary.Dairy", {
	extend : 'Ext.Panel',
	fullscreen : true,
	alias : 'widget.diaryscreen',
	config : {
		cls : 'diaryscreen',

		 listeners: {
	            tap: function() {
	            	DoliUtils.doliController.diaryscreen_tap();
	            },
	            element: 'element'
	        },
	},//config
});//define