var SERVER = {
	host_address:'http://ec2-54-211-79-105.compute-1.amazonaws.com/api/v1/token/?format=json',
	//http://ec2-54-211-79-105.compute-1.amazonaws.com/api/v1/newuser/?username=dolimobile&api_key=393efdd24a1cb2c7cfc12e26303de4a2c0fdc999
	signup_address1:"http://ec2-54-211-79-105.compute-1.amazonaws.com/api/v1/newuser/?username=dolimobile&api_key=393efdd24a1cb2c7cfc12e26303de4a2c0fdc999&genid="+(new Date()).getTime(),
	signup_address:"http://ec2-54-211-79-105.compute-1.amazonaws.com/api/v1/newuser/?username=dolimobile&api_key=393efdd24a1cb2c7cfc12e26303de4a2c0fdc999&genid="+(new Date()).getTime(),
	auth_token:'',
	//api_key:'393efdd24a1cb2c7cfc12e26303de4a2c0fdc999',
};

var AUTH_HEADER = {
	'Content-Type': 'application/json',
	//'Authorization': 'Basic Og=='	
};


