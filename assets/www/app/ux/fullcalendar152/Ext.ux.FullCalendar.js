Ext.define('Ext.ux.FullCalendar', {
    extend: 'Ext.Panel',
    alias:'widget.fullcalender',
    requires:['Ext.Button'],
    alternateClassName: 'Ext.ux.FullCalendar',
    xtype: 'fullcalendarpanel',
    config : {
    	cls:'fullcalendarpanel',
        placeholderid : Ext.id()+ '-fullcalendar',
        defaultview : 'month',
        scrollable: 'vertical',
        
    },
    initialize: function() {
    	
       var store=Ext.getStore("events_store");
       var eventArray=DoliUtils.getStoreDataInArrayFormat(store);
       var me = this;
       me.callParent(arguments);
	   me.on('painted',function(a){
	   // Passing store data	   
       me.renderFullCalendar(eventArray);
            me.applySwipeEvent();
            me.changeCalendarView(me.getDefaultview());
	    me.getScrollable().getScroller().on('scrollstart',function(){
		me.suspendEvents();
	    });
	    
	    me.getScrollable().getScroller().on('scrollend',function(){
		me.resumeEvents();
	    });
    },me, {single:true});
	me.bottomSegmentedBtn = {
	    xtype : 'panel',
	    cls:'segmented_panel',
	    layout:'hbox',
	    items: [{
	    		xtype:'button',
                //text: 'Month',
	    		iconCls:'calender_month',
                //ui:'action',
                //pressed: (me.getDefaultview() == "month") ? true : false,
                handler:function(){
                    me.changeCalendarView('month');
                }
            },{
            	xtype:'button',
                //text: 'Week',
                iconCls:'calender_week',
                //ui:'action',
                //pressed: (me.getDefaultview() == "agendaWeek") ? true : false,
                handler: function(){
                    me.changeCalendarView('agendaWeek');
                }
            },{
                //text: 'Day',
                xtype:'button',
                iconCls:'calender_day',
                //ui:'action',
                //pressed: (me.getDefaultview() == "agendaDay") ? true : false,
                handler: function(){
                    me.changeCalendarView('agendaDay');
                }
            }]
        };
	
	me.bottomToolBar = Ext.create('Ext.Toolbar',{
	    xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                xtype: 'button',
                iconMask: true,
                ui: 'action',
                iconCls: 'arrow_left',
                handler:function(){
                    me.navigateCalendar('left');
                }
            },{
                xtype:'spacer'
            },me.bottomSegmentedBtn,{
                xtype:'spacer'
            },{
                xtype: 'button',
                iconMask: true,
                ui: 'action',
                iconCls: 'arrow_right',
                handler:function(){
                    me.navigateCalendar('right');
                }
            }]
        });
	
	me.topToolBar = Ext.create('Ext.Toolbar',{
		xtype : 'toolbar',
                docked: 'top',
                items: [{
                    text: 'Today',
                    ui:'action',
                    handler: function(){
                       me.viewToday();
                    }
                }]
        });
	
	;
	me.calendarPanel = Ext.create('Ext.Panel',{
	    
	    html : "<div id='"+me.getPlaceholderid()+"'></div>"    
	});
	this.setItems([me.topToolBar,me.bottomToolBar,me.calendarPanel])
	
    },
    /**
     * Apply Fullcalendar widget to panel div
     */
    renderFullCalendar : function(arr){
    	//alert();
        var me = this;
        var date = new Date(),d = date.getDate(),m = date.getMonth(),y = date.getFullYear();
	$('#'+me.getPlaceholderid()).fullCalendar({
            hideHeaders  : true, //new property to hide full calendar header
            editable: false,
            events:arr,
       /*     events: [{
                    title: 'All Day Event',
                    start: new Date(y, m, 1)
                },
                {
                    title: 'Long Event',
                    start: new Date(y, m, d-5),
                    end: new Date(y, m, d-2)
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d-3, 16, 0),
                    allDay: false
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d+4, 16, 0),
                    allDay: false
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d, 10, 30),
                    allDay: false
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d+1, 19, 0),
                    end: new Date(y, m, d+1, 22, 30),
                    allDay: false
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: 'http://google.com/'
            }],*/
	    dayClick: function(date, allDay, jsEvent, view) {
		me.fireEvent('dayclick',date, allDay, jsEvent, view,this);
	    },
	    eventClick: function(calEvent, jsEvent, view) {
		me.fireEvent('eventclick',calEvent, jsEvent, view,this);
	    },
	    columnFormat:{
		month: 'ddd',    // Mon
		week: (Ext.os.is('phone')) ? 'ddd' : 'ddd', // Mon 9/7
		agendaWeek: (Ext.os.is('phone')) ? 'ddd d' : 'ddd d', // Mon 9/7
		day: 'dddd M/d',  // Monday 9/7
		agendaDay: 'dddd M/d'  // Monday 9/7

	    },
	    titleFormat :{
		agendaDay :'ddd MMM d, yyyy',
		agendaWeek: "MMM d[ yyyy]{ '&#8212;'[ MMM] d, yyyy}"
	    }
	});
        me.changeTitle();
    },
    changeCalendarView : function(view){
	var me = this;
	
        $('#'+me.getPlaceholderid()).fullCalendar('changeView', view);
	
	// to fix issue regarding the scroll area of week and day not taking full height. 
	if(view == "month"){
	    $(".fc-view-month").removeAttr("style");
	    $(".fc-view-agendaWeek").css({"position":'relative'});
	    $(".fc-view-agendaDay").css({"position":'relative'});
	    me.setDefaultview('month');
	} else if(view == "agendaWeek"){
	    $(".fc-view-agendaWeek").removeAttr("style");
	    $(".fc-view-agendaDay").css({"position":'relative'});
	    $(".fc-view-month").css({"position":'relative'});
	    me.setDefaultview('week');
	} else  if(view == "agendaDay"){
	    $(".fc-view-agendaDay").removeAttr("style");
	    $(".fc-view-agendaWeek").css({"position":'relative'});
	    $(".fc-view-month").css({"position":'relative'});
	    me.setDefaultview('day');
	}
	me.getScrollable().getScroller().scrollTo(0, false);
	me.changeTitle();
    },
    changeTitle : function(){
        var me = this;
	me.topToolBar.setTitle($('#'+me.getPlaceholderid()).fullCalendar('getView').title);
    },
    getBottomToolBar : function(){
        return this.bottomToolBar;
    },
    viewToday : function(){
        $('#'+this.getPlaceholderid()).fullCalendar('today');
        this.changeTitle();
    },
    navigateCalendar : function(direction){
        var me = this;
        if (direction == "left") {
            $('#'+me.getPlaceholderid()).fullCalendar('next');
        } else if (direction == "right") {
            $('#'+me.getPlaceholderid()).fullCalendar('prev');
        }
        me.changeTitle();
    },
    applySwipeEvent : function(){
        var me  = this;
	me.getScrollableBehavior().getScrollView().getElement().on('swipe',function(directionobj){
	   me.navigateCalendar(directionobj.direction);
	   
	});
    }
});