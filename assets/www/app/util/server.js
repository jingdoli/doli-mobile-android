var SERVER = {
	host_address:'http://ec2-54-211-79-105.compute-1.amazonaws.com/api/v1/token/?format=json',
	signup_address:"http://ec2-54-227-114-102.compute-1.amazonaws.com/api/v1/newuser/?username=dolimobile&api_key=57018a04ac265719812f18b034c89288e24ec56f&genid="+(new Date()).getTime(),
	auth_token:'',
	api_key:'0af25802c4a62704bdaf2fdb4a8610f12db00bc2',
};

var AUTH_HEADER = {
	'Content-Type': 'application/json',
	//'Authorization': 'Basic Og=='	
};


