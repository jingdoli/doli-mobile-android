Ext.define("doli.util.DBUtils",{
	singleton: true,
	alternateClassName: 'DBUtils',   
	db:'',
	openDB:function(name,version,displayname,size){
		try{
			DBUtils.db = window.openDatabase(name,version,displayname,size);
		} catch(e){
			Ext.Msg.alert(e.message);
		}
	},
	/*
	 * IMAGE GALLERY DATABASE OPERATION BEGINS
	 */
	
	createImageGalleryTableIfNotCreated:function(){
		DBUtils.db.transaction(DBUtils.createImageGalleryTable, DBUtils.dbError,DBUtils.dbSuccess);
		
		
	},
	// private
	createImageGalleryTable:function(tx) {
		 tx.executeSql('CREATE TABLE IF NOT EXISTS imagegallery (id INTEGER PRIMARY KEY, imageurl,comment,date,dateInt)');
    },
	setImageGalleryData:function(imageurl,comment,date,dateInt,callback){

		DBUtils.db.transaction(function(tx){
			var img='"'+imageurl+'",';
			var com='"'+comment+'",';
			var dat='"'+date+'",';
			var datInt='"'+dateInt+'"';
			var query='INSERT INTO imagegallery (imageurl,comment,date,dateInt) VALUES('+ img + com + dat + datInt+')';
			tx.executeSql(query); 
		}, function(err){
			alert("Insert Error" + err.message);
		},function(){
			// success function
			callback(1);
		});
		
	},
	getCameraGalleryData:function(callback){
		
		DBUtils.db.transaction(function(tx){
     	tx.executeSql('SELECT * FROM imagegallery', [],
     			function(tx, results){
     				var dataArray= new Array();
     				for(var i=0;i< results.rows.length ;i++){
						var data=new Object();
						data.imageurl= DoliUtils.reverseMapSpecialChars(results.rows.item(i).imageurl);
						data.date= DoliUtils.reverseMapSpecialChars(results.rows.item(i).date);
						data.id=results.rows.item(i).id;
						data.dateInt=results.rows.item(i).dateInt;
						data.comment=results.rows.item(i).comment;
						dataArray.push(data)
					}
     				callback(dataArray);
     		 }, DBUtils.dbError);
		},DBUtils.dbError);
	},

	/**
	 * NOTES DB OPERATION BEGINS
	 */
	createNoteDBIfNotCreate:function(){
		DBUtils.db.transaction(DBUtils.createNoteTable,DBUtils.dbError,DBUtils.dbSuccess);
	},
	createNoteTable:function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY,subject,note,date,dateInt)');
	},
	saveNote:function(subject,note,date,dateInt,callback){
		var subject1='"'+subject+'",';
		var note1='"'+note+'",';
		var dat='"'+date+'",';
		var datInt='"'+dateInt+'"';
		
		
		DBUtils.db.transaction(function(tx){
			var query='INSERT INTO notes (subject,note,date,dateInt) VALUES('+ subject1 + note1 + dat + datInt+')';
			tx.executeSql(query); 
		},
		// Error Callback
		function(err){ 
			Ext.Msg.alert("DB Error",err.message);
			callback();
		},
		// Success Callback
		function(){
			callback();
		});
		
	},// saveNote
	getAllNotes:function(callback){
		DBUtils.db.transaction(function(tx){
		tx.executeSql('SELECT * FROM notes', [],
			 			function(tx, results){
			 				var dataArray= new Array();
			 				for(var i=0;i< results.rows.length ;i++){
								var data=new Object();
								data.subject= DoliUtils.reverseMapSpecialChars(results.rows.item(i).subject);
								data.note= DoliUtils.reverseMapSpecialChars(results.rows.item(i).note);
								data.id=results.rows.item(i).id;
								data.dateInt=results.rows.item(i).dateInt;
								data.date=DoliUtils.reverseMapSpecialChars(results.rows.item(i).date);
								dataArray.push(data);
//								/alert(data.subject)
							}
			 				
			 				console.log(dataArray);
			 				callback(dataArray);
			 		 }, DBUtils.dbError);
				},DBUtils.dbError);
	},// getAllNotes
	
	/**
	 *  @Calender_Events_DB_OPERATIONS_BEGINS 
	 */
	createEventDBIfNotCreate:function(){
		DBUtils.db.transaction(DBUtils.createEventTable,DBUtils.dbError,DBUtils.dbSuccess);
	},
	createEventTable:function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY,title,startdate,enddate,details,allday)');
	},
	saveEvent:function(title,startdate,enddate,allday,details,callback){
		var startdate1='"'+startdate+'",';
		var title1='"'+title+'",';
		var enddate1='"'+enddate+'",';
		var details1='"'+details+'",';
		var allday1='"'+allday+'"';
		
	
//		var startdate1='"startdate",';
//		var title1='"startdate",';
//		var enddate1='"startdate",';
//		var allday1='"startdate",';
//		var details1='"startdate",';
		
		DBUtils.db.transaction(function(tx){
		var query='INSERT INTO events (title,startdate,enddate,details,allday) VALUES('+ title1 + startdate1 + enddate1 +details1+ allday1+')';
			
			
			tx.executeSql(query); 
		},
		// Error Callback
		function(err){ 
			Ext.Msg.alert("DB Error",err.message);
			callback();
		},
		// Success Callback
		function(){
			callback();
		});
		
	},// saveEvent
	getAllEvents:function(callback){
		DBUtils.db.transaction(function(tx){
		tx.executeSql('SELECT * FROM events', [],
			 			function(tx, results){
			 				var dataArray= new Array();
			 				for(var i=0;i< results.rows.length ;i++){
								var data=new Object();
								data.title= DoliUtils.reverseMapSpecialChars(results.rows.item(i).title);
								data.startdate= DoliUtils.reverseMapSpecialChars(results.rows.item(i).startdate);
								data.enddate=DoliUtils.reverseMapSpecialChars(DoliUtils.reverseMapSpecialChars(results.rows.item(i).enddate));
								data.allday=results.rows.item(i).allday;
								data.details=DoliUtils.reverseMapSpecialChars(results.rows.item(i).details);
								dataArray.push(data);
								console.log(data)
							}
			 				
			 				console.log(dataArray);
			 				callback(dataArray);
			 		 }, DBUtils.dbError);
				},DBUtils.dbError);
	},// getAllEvents
	/**
	 * @COMMON_METHODS
	 *   
	 */
	dbError:function(err){
		DoliUtils.removeLoadingMask();
		Ext.Msg.alert("DB Error",err.message);
	},
	dbSuccess:function(){
		DoliUtils.removeLoadingMask();
		// alert("Coooool...");
	},
	
	
	
	
});// define
