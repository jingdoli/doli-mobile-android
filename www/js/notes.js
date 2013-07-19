var dbShell = null;

function initnotes() {

	 //First, open our db 
	if(!dbShell) {
		dbShell = window.openDatabase("DD", 2, "DD", 1000000);
	}
	//run transaction to create initial tables
	dbShell.transaction(setupTable,dbErrorHandler,getEntries);
	// setup functions for buttons
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
	$("#deleteFormSubmitButton").click(function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		var data = {title:$("#noteTitle").val(), 
					body:$("#noteBody").val(),
					id:$("#noteId").val()
		};
		deleteNote(data);
	});
}
	
//I just create our initial table - all one of em
function setupTable(tx){
	tx.executeSql("CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY,title,body,updated)");
}

//I handle getting entries from the db
function getEntries() {
	dbShell.transaction(function(tx) {
	tx.executeSql("select id, title, body, updated from notes order by updated",[],renderEntries,dbErrorHandler);
	}, dbErrorHandler);
}

function renderEntries(tx,results){
	//doLog("render entries");
	
	if (results.rows.length == 0) {
		$("#noteslistMessage").html("<p>You currently do not have any notes.</p>");
		$("#noteTitleList").html("");
		$("#noteTitleList").listview("refresh");
	} else {
	   var s = "";
	   for(var i=0; i<results.rows.length; i++) {
		 s += "<li data-icon='edit'><a onClick='showEdit("+results.rows.item(i).id + ");' >" + results.rows.item(i).title + " <span class='small'>" 
		 +new XDate(results.rows.item(i).updated).toString('hh:mm dd/mm/yyyy'); +"</span></a></li>";   
	   }
		$("#noteslistMessage").html("");
		$("#noteTitleList").html(s);
		$("#noteTitleList").listview("refresh");
	}
}

function saveNote(note, cb) {
	//Sometimes you may want to jot down something quickly....
	if(note.title == "") note.title = "[No Title]";
	dbShell.transaction(function(tx) {
		if(note.id == "") {
			tx.executeSql("insert into notes(title,body,updated) values(?,?,?)",
				[note.title,note.body, new Date()]);
		}
		else {
			tx.executeSql("update notes set title=?, body=?, updated=? where id=?",
				[note.title,note.body, new Date(), note.id]);
		}
	}, dbErrorHandler,cb);
	showContent("notes", ".content_div");
	
}

function deleteNote(note, cb) {
	//Sometimes you may want to jot down something quickly....
	if(note.title == "") note.title = "[No Title]";
	dbShell.transaction(function(tx) {
		if(note.id != "") tx.executeSql("delete from notes where id=?",[note.id]);
	}, dbErrorHandler,cb);
	showContent("notes", ".content_div");
	
}

//edit page logic needs to know to get old record (possible)
function showEdit(noteId) {
	if(noteId >= 0) {
		//load the values
		
		dbShell.transaction(
			function(tx) {
				tx.executeSql("select id,title,body from notes where id=?",[noteId],function(tx,results) {
					$("#noteId").val(results.rows.item(0).id);
					$("#noteTitle").val(results.rows.item(0).title);
					$("#noteBody").val(results.rows.item(0).body);
					
				});
			}, dbErrorHandler);
		$("#deleteFormSubmitButton").button('enable');
		$("#deleteFormSubmitButton").button('refresh');
		$("#editFormSubmitButton").button('enable');
		$("#editFormSubmitButton").button('refresh');		
	} else {
		$("#deleteFormSubmitButton").button('disable');
		$("#deleteFormSubmitButton").button('refresh');
		$("#editFormSubmitButton").button('enable');
		$("#editFormSubmitButton").button('refresh');
		$("#noteTitle").val('');
		$("#noteBody").val('');
		$("#noteId").val('');	
	}
	showContent("editNotePage", ".content_div");
	
}

function capturePhoto(){
	var destinationType=navigator.camera.DestinationType;
	var pictureSource=navigator.camera.PictureSourceType;
	
	navigator.camera.getPicture(uploadPhoto, onFail, { quality: 20, 
		destinationType: destinationType.FILE_URI, source:pictureSource.PHOTOLIBRARY, saveToPhotoAlbum: true });
		
}

function onFail(message) {
	alert('Failed because: ' + message);
}
function uploadPhoto(data){
	
	$('#gallery').append("<img style='width:60px;height:60px;' src='"+data+"'>");
	var name = data.substring(data.lastIndexOf('/')+1),
        tempEntry = new DirectoryEntry({fullpath:data});
	alert(window.photosDir);
    // copy the file to a new directory and rename it
    tempEntry.copyTo(window.photosDir, name, function () {alert('Image saved')},function () {alert('Error')});
	
}
	
