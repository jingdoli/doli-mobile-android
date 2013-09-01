$(document).delegate('#timetable tr', 'click', function () {
	var timeid = $( this ).children(":nth-child(2)").children(":first").attr("id");
	var hour = timeid.slice(-2);
	var currentDate = $("#currentDate").data("date");
	currentDate = currentDate.clone();
	currentDate.setHours(hour);
	$("#start").val(currentDate.toString('yyyy-MM-dd')+'T'+currentDate.toString('HH:mm'));
	currentDate.addHours(1);
	$("#end").val(currentDate.toString('yyyy-MM-dd')+'T'+currentDate.toString('HH:mm'));
	showContent("plus", ".calendar_content_div");
});

$(document).delegate('#saveEvent', 'click', function () {
	var startDate = new XDate($("#start").val());
	var endDate = new XDate($("#start").val());
	dbShell.transaction(function(tx) {
		tx.executeSql("insert into events(title,body,start,end) values(?,?,?,?)",
				[$("#eventSubject").val(),$("#noteEvent").val(), 
				startDate.toString('yyyy-MM-dd HH:mm:ss'), 
				endDate.toString('yyyy-MM-dd HH:mm:ss')
				]);
	}, dbErrorHandler);
	//showContent("calendar", ".content_div");
	showContent("one", ".calendar_content_div");
});

function initcalendar() {

	 //First, open our db 
	if(!dbShell) {
		dbShell = window.openDatabase("DD", 2, "DD", 1000000);
	}
	//run transaction to create initial tables
	dbShell.transaction(setupEventTable,dbErrorHandler);
	var currentDate = new XDate();
	$("#currentDate").html(currentDate.toString('dddd, MMMM d, yyyy'));
	$("#currentDate").data( "date", currentDate);
	//retrieveEvents(currentDate);
	$( "#calendarNavigation a img" ).removeClass('lighten');
	$( "#calendarNavigation a img" ).addClass('darken');
	$( "#calendarNavigation a#one_link img" ).removeClass('darken');
	$( "#calendarNavigation a#one_link img" ).addClass('lighten');
	showContent("one", ".calendar_content_div");
}

function readEvents() {

	dbShell.transaction(function(tx) {
	tx.executeSql("select id, title, body, start, end from events",[],
		function(tx,results) {
			 for(var i=0; i<results.rows.length; i++) {
					//alert(results.rows.item(i).start+' '+results.rows.item(i).end);
			 }
		},
		dbErrorHandler);
	}, dbErrorHandler);
}

function initone() {
	var currentDate = $("#currentDate").data("date");
	retrieveEvents(currentDate);
}
function initplus() {
	$("#eventSubject").val("");
	$("#noteBody").val("");
}
//I just create our initial table - all one of em
function setupEventTable(tx){
	tx.executeSql("CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY,title TEXT,body TEXT, start TEXT, end TEXT)");

}

function parseDateTime(str) {
    // parses dates like "yyyy-mm-dd hh:mm"
    var parts = str.split('T');
    var dateparts = parts[0].split('-');
    var timeparts = parts[1].split(':');
    if ((dateparts.length == 3) && (timeparts.length == 3)) 
        return new XDate(
            parseInt(dateparts[0]), // year
            parseInt(dateparts[0] ? dateparts[0]-1 : 0), // month
            parseInt(dateparts[2]), // day
            parseInt(timeparts[0]), // hours
            parseInt(timeparts[1]) // minutes
        );
}
XDate.parsers.push(parseDateTime);


$(document).delegate('#one_calendar_back', 'click', function () {
	var currentDate = $("#currentDate").data("date");
	currentDate.addDays(-1);
	$("#currentDate").html(currentDate.toString('dddd, MMMM d, yyyy'));
	$("#currentDate").data( "date", currentDate);
	retrieveEvents(currentDate);
});

$(document).delegate('#one_calendar_forward', 'click', function () {
	var currentDate = $("#currentDate").data("date");
	currentDate.addDays(1);
	$("#currentDate").html(currentDate.toString('dddd, MMMM d, yyyy'));
	$("#currentDate").data( "date", currentDate);
	retrieveEvents(currentDate);
});

function retrieveEvents(currentDate) {
	for(var i = 7; i< 22; ++i) {
		$("#time_" + i).html("");
	}
	if(currentDate) {
		dbShell.transaction(function(tx) {
		tx.executeSql("select id, title, body, start, end from events",[],
			function(tx,results) {
				 for(var i=0; i<results.rows.length; i++) {
						var start = new XDate(results.rows.item(i).start);
						var end = new XDate(results.rows.item(i).end);
						if(currentDate.getFullYear() == start.getFullYear() &&
							currentDate.getMonth() == start.getMonth() &&
							currentDate.getDate() == start.getDate() ) {
							$("#time_" + start.getHours()).html(results.rows.item(i).title);
						}
				 }
			},
			dbErrorHandler);
		}, dbErrorHandler);
	}
}