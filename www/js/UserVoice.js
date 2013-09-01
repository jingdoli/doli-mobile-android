
/************ ../dummy2/lib/plugins/UserVoice.js ********************/
/* MIT licensed */
// (c) 2013 Surinder Singh, DeveloperExtensions.com
var cfg = {
        task:'launchFeedback',//[launchFeedback|contactUs|viewForum|postIdea]
        
        site:'dolidiaries.uservoice.com',
        key:'UFU9pwhS027Qhg2ChgBNg',
        secret:'EWBzhNArCNLg1ISFxyaJq20OdjQaAV3nhDxJu2cJc',
        
        topicId:0,//[0|453|333 (any valid topicId as interger)]
        showContactUs:1,//[0|1], Show/hide Contact us button
        showForum:1,//[0|1] Show/hide Forum button
        showPostIdea:1,//[0|1] Show/hide Post an idea button
        showKnowledgeBase:1//[0|1] Show/hide KnowledgeBase items
};

function UserVoice(){
	//Does nothing
}

UserVoice.prototype.launch = function(cfg){
	cfg = cfg?cfg:{};
	if(Object.prototype.toString.call(cfg)!='[object Object]'){
		alert('Invalid UserVoice Config');
		cfg = {};
	}
	var config = {
		task:'launchFeedback',//[launchFeedback|contactUs|viewForum|postIdea]
		
		site:'dolidiaries.uservoice.com',
		key:'UFU9pwhS027Qhg2ChgBNg',
		secret:'EWBzhNArCNLg1ISFxyaJq20OdjQaAV3nhDxJu2cJc',
		
		topicId:0,//[0|453|333 (any valid topicId)]
		showContactUs:1,//[0|1]
		showForum:1,//[0|1]
		showPostIdea:1,//[0|1]
		showKnowledgeBase:1//[0|1]
	};
	//Ext.Msg.alert('', Ext.encode(config))
	for(var key in config){
		if (typeof cfg[key] !== "undefined"){
			if(key=='task' && cfg[key]!='launchFeedback' && cfg[key]!='contactUs' && cfg[key]!='viewForum' && cfg[key]!='postIdea'){
				alert('UserVoice task "'+cfg[key]+'" not supported. Supported tasks are launchFeedback,contactUs,viewForum and postIdea,  so we are using "launchFeedback" ');
				cfg[key]='launchFeedback';
			}else if(key=='topicId'){
				cfg[key]=parseInt(cfg[key]);
			}else if(key.indexOf('show')>-1){
				cfg[key] = (cfg[key]==1)?1:0;
			}
			config[key] = cfg[key];
		}
	}
	
	cordova.exec(Ext.emptyFn, Ext.emptyFn, "UserVoiceCommand", "launch", [config]);
};
UserVoice.install = function(){
	if(!window.plugins){
		window.plugins = {};
	}
	if(!window.plugins.uservoice){
		window.plugins.uservoice = new UserVoice();
	}	
	return window.plugins.uservoice;
};
UserVoice.install();

function showUserVoice(cfg){
	window.plugins.uservoice.prototype.launch(cfg);
}

$(document).delegate('#userVoiceBtn', 'click',function() {
    mixpanel.track("User support & feedback");
    showUserVoice(cfg);
});
