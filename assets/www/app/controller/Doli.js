Ext.define("doli.controller.Doli",{
	extend:'Ext.app.Controller',
	requires:[
	          //Utils
	          "doli.util.DoliUtils","doli.util.CameraUtils","doli.util.DBUtils",
	          //views
	          "doli.view.login.Login","doli.view.diary.Dairy","doli.view.mainpanel.picture.ImageGallery",
	          //stores
	          "doli.store.notes.Notes",
	          //Signup
	          'doli.view.signup.Signup',
	         ],
	init:function(){
		/*
		 * creating all stores
		 */
		//Ext.create("doli.store.notes.Notes");
		//Ext.create("doli.store.imagegallery.ImageGallery");
		DoliUtils.doliController=this;
		/*
		 * Initialilizing DataBase and creating tables
		 */
		DBUtils.openDB("Doli", "1.0", "Doli Diaries", 1000000);
		DBUtils.createNoteDBIfNotCreate();
		DBUtils.createEventDBIfNotCreate();
	},
	config:{
	refs:{
		
		// Login Screen
		loginscreen:'loginscreen',
		loginscreen_loginbtn:'loginscreen #loginscreen_loginbtn',
		loginscreen_name:'loginscreen #loginscreen_name',
		loginscreen_password:'loginscreen #loginscreen_password',
		loginscreen_signup:'loginscreen #loginscreen_signup',
		// Diary Screen
		diaryscreen:'diaryscreen',
		diaryscreenbtn:'diaryscreen #diaryscreenbtn',
		//Home screen
		homescreen:'homescreen',
		//imagelistview
		imagelistview:'imagelistview',
		//ImageGallery
		imagegallery:'imagegallery',
		imagegallery_capturebtn:'imagegallery #imagegallery_capturebtn',
		imagedetialpopup:'imagedetialpopup',
		imagedetialpopup_closebtn:'imagedetialpopup #imagedetialpopup_closebtn',
		//Notes
		notelistview:'notelistview',
		notes:'notes',
		notes_takenote:'notes #notes_takenote',
		takenotepopup:'takenotepopup',
		takenotepopup_SaveBtn:'takenotepopup #takenotepopup_SaveBtn',
		takenotepopup_cancelbtn:'takenotepopup #takenotepopup_cancelbtn',
		notetitletextfield:'takenotepopup #notetitletextfield',
		notesubjectetextfield:'takenotepopup #notesubjectetextfield',
		//Signup
		signup:'signup',
		signup_signupBtn:'signup #signup_signupBtn',
		signup_cancelbtn:'signup #signup_cancelbtn',
		signup_username:'signup #signup_username',
		signup_email:'signup #signup_email',
		signup_password:'signup #signup_password',
		signup_confirmpassword:'signup #signup_confirmpassword',
		
		//events
		events:'events',
		events_createEvent:'events #events_createEvent',
		createevent:'createevent',
		event_savebtn:'createevent #event_savebtn',
		event_cancelbtn:'createevent #event_cancelbtn',
		eventtitletextfield:'createevent #eventtitletextfield',
		event_startdatetimepicker:'createevent #event_startdatetimepicker',
		event_enddatetimepicker:'createevent #event_enddatetimepicker',
		eventnotetextarea:'createevent #eventnotetextarea',
	
		
	},//refs
	control:{
		loginscreen_loginbtn:{
			tap:'loginbtn_tap',
		},
		loginscreen_signup:{
			tap:'loginscreen_signupTap'
		},
		imagegallery_capturebtn:{
			tap:'imagegallery_capturebtn_tap'
		},
		imagelistview:{
		
			itemsingletap:'imagelistview_itemtapped'
		},
		notes:{
			activate:'notelistview_activate',
		},
		notelistview:{
			itemsingletap:'notelistview_itemtapped',
			
		},
		notes_takenote:{
			tap:'notes_takenotebtn_tap'
		},
		takenotepopup_SaveBtn:{
			tap:'takenotepopup_SaveBtnTap',
		},
		takenotepopup_cancelbtn:{
			tap:'takenotepopup_cancelbtntTap',
		},
		takenotepopup:{
			hide:'takenotepopup_hide'
		},
		imagedetialpopup_closebtn:{
			tap:'imagedetialpopup_closebtn_tap',
		},
		events_createEvent:{
			tap:'events_createEventTap',
		},
		event_savebtn:{
			tap:'event_savebtnTap',
		},
		event_cancelbtn:{
			tap:'event_cancelbtnTap',
		},
		signup_signupBtn:{
			tap:'signup_signupBtnTap',
		},
		signup_cancelbtn:{
			tap:'signup_cancelbtnTap',
		},
	
	}//control
	},//config
	loginbtn_tap:function(){
		
		console.log("Login service called")
		var username=this.getLoginscreen_name().getValue();
		var password=this.getLoginscreen_password().getValue();
		if(username.length ==0 || password.length ==0  ){
			Ext.Msg.alert("Alert!!!","Username/Password field cannot be empty !!");
			
		}else {
			Ext.Viewport.setMasked(true);
			DoliUtils.loginService(username,password);
		}
	},//loginbtn_tap
	loginscreen_signupTap:function(){
		if(this.getSignup() != undefined){
			this.getSignup().destroy();
		}
		var signup=Ext.create("doli.view.signup.Signup");
		Ext.Viewport.add(signup);
		Ext.Viewport.animateActiveItem(signup,{type: 'slide', direction: 'up',duration:900 });
	},
	diaryscreen_tap:function(){
	
		var homeScreen=Ext.create("doli.view.mainpanel.HomeScreen");
		Ext.Viewport.add(homeScreen);
		Ext.Viewport.animateActiveItem(homeScreen,{type: 'slide', direction: 'left',duration:900 });
		
		
	},//diaryscreenbtn_tap
	imagegallery_capturebtn_tap:function(){
		
		CameraUtils.getPicture();
	},//imagegallery_capturebtn
	imagelistview_itemtapped:function(list, index, target, record, e, eOpts){
		this.destroyCameraDetialPanel();
		//DoliUtils.getRequiredClass("doli.view.mainpanel.picture.popups.ImageDetailPopup");
		var imagedetailpopup=Ext.create("doli.view.mainpanel.picture.popups.ImageDetailPopup",{data:record.data});
		Ext.Viewport.add(imagedetailpopup);
		Ext.Viewport.animateActiveItem(imagedetailpopup,{type: 'slide', direction: 'up',duration:1000 });
	
		
	},//imagelistview_itemtapped
	notelistview_itemtapped:function(list, index, target, record, e, eOpts){
		this.destroyTakeNotePanel();
//		/DoliUtils.getRequiredClass("doli.view.mainpanel.notes.popups.TakeNotePopup");
		var notepaopup=Ext.create("doli.view.mainpanel.notes.popups.TakeNotePopup",{data:record.data});
		Ext.Viewport.add(notepaopup);
		Ext.Viewport.animateActiveItem(notepaopup,{type: 'slide', direction: 'up',duration:1000 });
		
	},//notelistview_itemtapped
	notes_takenotebtn_tap:function(){
//		DoliUtils.getRequiredClass("doli.view.mainpanel.notes.popups.TakeNotePopup");
		this.destroyTakeNotePanel();
		var notepaopup=Ext.create("doli.view.mainpanel.notes.popups.TakeNotePopup");
		Ext.Viewport.add(notepaopup);
		//Ext.Viewport.setActiveItem(notepaopup);
		Ext.Viewport.animateActiveItem(notepaopup,{type: 'slide', direction: 'up',duration:1000 });
		//Ext.Viewport.setActiveItem(notepaopup);
	},
	
	takenotepopup_SaveBtnTap:function(){
		
		var subject=DoliUtils.mapSpecialChars(this.getNotetitletextfield().getValue());
		if(subject.length  <= 0 || subject === "" || subject===undefined ){
			alert("Title is Mandatory !!!");
		}else{
		//alert(subject);
			var note=DoliUtils.mapSpecialChars(this.getNotesubjectetextfield().getValue());
			var date=new Date();
			var dateNew=DoliUtils.mapSpecialChars(date.toString().substring(0,15));
		    var dateInt=date.getTime();
			DBUtils.saveNote(subject,note,dateNew,dateInt,this.noteSaveSuccess);
			}
		
	},
	takenotepopup_cancelbtntTap:function(){
		Ext.Viewport.animateActiveItem(DoliUtils.doliController.getHomescreen(),{type: 'slide', direction: 'down',duration:1000 });
	},
	noteSaveSuccess:function(){
		//Firing activate on view to fetch saved data from DB and add in list
		DBUtils.getAllNotes(DoliUtils.doliController.updateNotesListStore);
		Ext.Viewport.animateActiveItem(DoliUtils.doliController.getHomescreen(),{type: 'slide', direction: 'down',duration:1000 });
	},
	takenotepopup_hide:function(){
	},
	notelistview_activate:function(list,eOpts){

	
		DoliUtils.setLoadingMask("Fetching your notes ...");
		 var store=Ext.getStore("store_notes");
		 if(store.getCount() == 0){
			 DBUtils.getAllNotes(DoliUtils.doliController.updateNotesListStore);
		 } else{
			 DoliUtils.removeLoadingMask();
		 }
	},
	updateNotesListStore:function(data){
		
		 
		 var store=Ext.getStore("store_notes");
		 store.setData(data);
		 DoliUtils.removeLoadingMask();
	
	},
	imagedetialpopup_closebtn_tap:function(){
		//var store=Ext.getStore("store_imagegallery");
		//var index=store.findExact("id",data.id);
		//store.getAt(index).set("comment",Ext.ComponentQuery.query("#imagedetialpopup_commentfield")[0].getValue());
		Ext.Viewport.animateActiveItem(this.getHomescreen(),{type: 'slide', direction: 'down',duration:1000 });
		
	},
	
	
	/**
	 * @ private
	 */
	destroyTakeNotePanel:function(){
		if(this.getTakenotepopup() !== undefined)
		this.getTakenotepopup().destroy();
	},
	/**
	 * @ private
	 */
	destroyCameraDetialPanel:function(){
		if(this.getImagedetialpopup() !== undefined)
			this.getImagedetialpopup().destroy();
	},
	/**
	 * @ private
	 */
	events_createEventTap:function(){
	
	if(this.getCreateevent() != undefined)
	   
	    this.getCreateevent().destroy();
		var creatEvent=Ext.create("doli.view.mainpanel.events.CreateEvent");
		Ext.Viewport.add(creatEvent);
		Ext.Viewport.setActiveItem(creatEvent);
		
		
	},
	/** 
	 *  @ private
	 */
	event_cancelbtnTap:function(){
		
		Ext.Viewport.animateActiveItem(this.getHomescreen(),{type: 'slide', direction: 'down',duration:1000 });
		this.getCreateevent().hide();
	},
	event_savebtnTap:function(){
		
		DoliUtils.setLoadingMask("Fetching your Events ...");
		var title = DoliUtils.mapSpecialChars(this.getEventtitletextfield().getValue());
		var details = DoliUtils.mapSpecialChars(this.getEventnotetextarea().getValue());	
		var startdate = DoliUtils.mapSpecialChars(this.getEvent_startdatetimepicker().getValue().toString());
		var endate = DoliUtils.mapSpecialChars(this.getEvent_enddatetimepicker().getValue().toString());
		console.log([title,details,startdate,endate]);
		//var startdate = "asdfas";
		//var endate ="asdfas";
		var  allDay="false"
		DBUtils.saveEvent(title,startdate,endate,allDay,details,this.eventSaveSuccess)
		Ext.Viewport.animateActiveItem(this.getHomescreen(),{type: 'slide', direction: 'down',duration:1000 });
	},
	
	eventSaveSuccess:function(){
		
		DBUtils.getAllEvents(DoliUtils.doliController.updateEventStores);
		
	},
	
	updateEventStores:function(data){
		
		 var store=Ext.getStore("events_store");
		 store.setData(data);
		 DoliUtils.removeLoadingMask();
		 Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].removeAll(true,true);
		 Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].add({xtype:'events'})
	},
	getAllEvents:function(data){

		 var store=Ext.getStore("events_store");
		 store.setData(data);
		 DoliUtils.removeLoadingMask();
		 Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].removeAll(true,true);
		 Ext.ComponentQuery.query("#homescreen_tabpanel_clientarea")[0].add({xtype:'events'})
	},
	//Sign-Up
	signup_signupBtnTap:function(){

		var username=this.getSignup_username().getValue();
		var email=this.getSignup_email().getValue();
		var password=this.getSignup_password().getValue();
		var confirmpassword=this.getSignup_confirmpassword().getValue();
		
		if(username.length == 0 ||  email.length == 0 || password.length == 0 || confirmpassword.length == 0   ){
		   
		   Ext.Msg.alert('Fill all the fields')
		} else {
		        
			if(password === confirmpassword){
			   
			  DoliUtils.signupService(username,password,email);
			
			} else {
			   
			   Ext.Msg.alert('Password doesnt match')
			}
		}
	    
	
	},//
	signup_cancelbtnTap:function(){
	
		Ext.Viewport.animateActiveItem(this.getLoginscreen(),{type: 'slide', direction: 'down',duration:1000 });
		//this.getSignup().hide();
		
	
	}
	
});//define