

function initnotes() {

	 //First, open our db 

	dbShell = window.openDatabase("DD", 2, "DD", 1000000);
	//run transaction to create initial tables
	dbShell.transaction(setupTable,dbErrorHandler,getEntries);
	$("#editFormSubmitButton").click(function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		var data = {title:$("#noteTitle").val(), 
					body:$("#noteBody").val(),
					id:$("#noteId").val()
		};
		saveNote(data,function() {
			getEntries();
		});
	});
}
	
//I just create our initial table - all one of em
function setupTable(tx){
	tx.executeSql("CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY,title,body,updated)");
}
function dbErrorHandler(err){
	alert("DB Error: "+err.message + "\nCode="+err.code);
}
//I handle getting entries from the db
function getEntries() {
	dbShell.transaction(function(tx) {
	tx.executeSql("select id, title, body, updated from notes order by id",[],renderEntries,dbErrorHandler);
	}, dbErrorHandler);
}

function renderEntries(tx,results){
	//doLog("render entries");
	if (results.rows.length == 0) {
		$("#noteslist").html("<p>You currently do not have any notes.</p>");
	} else {
	   var s = "";
	   for(var i=0; i<results.rows.length; i++) {
		 s += "<li><a onClick='showEdit("+results.rows.item(i).id + ");' >" + results.rows.item(i).title + "</a></li>";   
	   }
	
	   $("#noteTitleList").html(s);
	   $("#noteTitleList").listview("refresh");
	}
}

function saveNote(note, cb) {
	//Sometimes you may want to jot down something quickly....
	if(note.title == "") note.title = "[No Title]";
	dbShell.transaction(function(tx) {
		if(note.id == "") tx.executeSql("insert into notes(title,body,updated) values(?,?,?)",[note.title,note.body, new Date()]);
		else tx.executeSql("update notes set title=?, body=?, updated=? where id=?",[note.title,note.body, new Date(), note.id]);
	}, dbErrorHandler,cb);
	showContent("notes");
	
}

//edit page logic needs to know to get old record (possible)
function showEdit(noteId) {

	if(noteId >= 0) {
		//load the values
		$("#editFormSubmitButton").attr("disabled","disabled"); 
		dbShell.transaction(
			function(tx) {
				tx.executeSql("select id,title,body from notes where id=?",[noteId],function(tx,results) {
					$("#noteId").val(results.rows.item(0).id);
					$("#noteTitle").val(results.rows.item(0).title);
					$("#noteBody").val(results.rows.item(0).body);
					$("#editFormSubmitButton").removeAttr("disabled");   
				});
			}, dbErrorHandler);
		
	} else {
		$("#editFormSubmitButton").removeAttr("disabled");  
		$("#noteTitle").val('');
		$("#noteBody").val('');
		$("#noteId").val('');	
	}
	
	showContent("editNotePage");
	
}

function capturePhoto(){
	var destinationType=navigator.camera.DestinationType;
	var pictureSource=navigator.camera.PictureSourceType;
	
	navigator.camera.getPicture(uploadPhoto, onFail, { quality: 20, 
		destinationType: destinationType.FILE_URI, source:pictureSource.PHOTOLIBRARY });
		
}

function onFail(message) {
	alert('Failed because: ' + message);
}
function uploadPhoto(data){
	$('#gallery').append("<img style='width:60px;height:60px;' src='"+data+"'>");
	
}
	
