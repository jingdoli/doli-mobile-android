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
	retrieveEvents(currentDate, markDateDay);
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
	retrieveEvents(currentDate, markDateDay);
});

$(document).delegate('#one_calendar_forward', 'click', function () {
	var currentDate = $("#currentDate").data("date");
	currentDate.addDays(1);
	$("#currentDate").html(currentDate.toString('dddd, MMMM d, yyyy'));
	$("#currentDate").data( "date", currentDate);
	retrieveEvents(currentDate, markDateDay);
});

function retrieveEvents(currentDate, markDate) {
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
							markDate(start, results.rows.item(i));
							
						}
						
				 }
			},
			dbErrorHandler);
		}, dbErrorHandler);
	}
}
function markDateDay(start, item) {
	$("#time_" + start.getHours()).html(item.title);
}
function initmonth() {
	var currentDate = $("#currentDateMonth").data("date");
	if(!currentDate ) {
		currentDate = new XDate();
	}
	var date = currentDate.clone();
	date.setDate(1);
	while(date.getDay()!=1) {
		date.addDays(-1);
	}
	var start_of_next_month = false;
	var week_num = 0;
	var str_content = "";
	while(!start_of_next_month) {
		str_content+="<tr>"
		for(var i = 0; i < 7; ++i) {
			str_content+=("<td class=\"");
			if(date.getDate() == 1 && week_num > 1) {
				start_of_next_month = true;
			}
			if(date.getDate() >7 && week_num==0 ) {
				str_content+="nonCurrentMonth\"";
			} else if(date.getDate() <=7 && week_num>1) {
				str_content+="nonCurrentMonth\"";
			} else {
				str_content+=("currentMonth\" id=\""+date.getDate()+"_month\"");
				
			}
			
			str_content+=(">"+date.getDate()+"</td>");
			date.addDays(1);
			
			
		}
		str_content+="</tr>";
		++week_num;

	}

	$("#monthtable").html(str_content);
	$("#currentDateMonth").html(currentDate.toString('dddd, MMMM d, yyyy'));
	$("#currentDateMonth").data( "date", currentDate);
	
	dbShell.transaction(function(tx) {
		tx.executeSql("select id, title, body, start, end from events",[],
			function(tx,results) {
				 for(var i=0; i<results.rows.length; i++) {
						var start = new XDate(results.rows.item(i).start);
						var end = new XDate(results.rows.item(i).end);
						if(currentDate.getFullYear() == start.getFullYear() &&
							currentDate.getMonth() == start.getMonth() 
							) {
							$("#"+start.getDate()+"_month").addClass("hasEvent");
							
						}
						
				 }
			},
			dbErrorHandler);
		}, dbErrorHandler);
		
		$(document).delegate('.currentMonth', 'click', function () {
			var id  = $(this).attr('id');
			id = parseInt(id);
			var currentDate = $("#currentDateMonth").data("date");
			currentDate.setDate(id);
			$("#currentDate").html(currentDate.toString('dddd, MMMM d, yyyy'));
			$("#currentDate").data( "date", currentDate);
			$( "#calendarNavigation a img" ).removeClass('lighten');
			$( "#calendarNavigation a img" ).addClass('darken');
			$( "#calendarNavigation a#one_link img" ).removeClass('darken');
			$( "#calendarNavigation a#one_link img" ).addClass('lighten');
			showContent("one", ".calendar_content_div");
		});


}


$(document).delegate('#month_calendar_back', 'click', function () {
	var currentDate = $("#currentDateMonth").data("date");
	currentDate.addMonths(-1);
	$("#currentDateMonth").html(currentDate.toString('dddd, MMMM d, yyyy'));
	$("#currentDateMonth").data( "date", currentDate);
	//retrieveEvents(currentDate);
	initmonth();
});

$(document).delegate('#month_calendar_forward', 'click', function () {
	var currentDate = $("#currentDateMonth").data("date");
	currentDate.addMonths(1);
	$("#currentDateMonth").html(currentDate.toString('dddd, MMMM d, yyyy'));
	$("#currentDateMonth").data( "date", currentDate);
	//retrieveEvents(currentDate);
	initmonth();
});

	/*
$(document).delegate("#start, #end, #recurrence, #noteEvent", "focus", function() {
	
    $('#editEventForm').css({position: 'relative'});
	
});
$(document).delegate("#start, #end, #recurrence, #noteEvent", "blur", function() {
    $('#editEventForm').css({position: 'fixed'});
});
*/