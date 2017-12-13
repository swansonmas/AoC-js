function day4_1() {
	var secretkey = 'iwrupvqb';
	var number = 1;
	var string = secretkey + number;
	var hash = md5(string);
	var firstfive = hash.substring(0, 5);
	var testfive = "00000";
	
	while(firstfive !== "00000")
	{
		number++;
		string = secretkey + number;
		hash = md5(string);
		firstfive = hash.substring(0, 5);
	}
	
	var newP = document.createElement("p");
	var newMsg = document.createTextNode("Answer (5): " + number);
	newP.appendChild(newMsg);
	document.body.appendChild(newP);
}

function day4_2() {
	var secretkey = 'iwrupvqb';
	var number = 1;
	var string = secretkey + number;
	var hash = md5(string);
	var firstsix = hash.substring(0, 6);
	var testsix = "000000";
	
	while(firstsix !== "000000")
	{
		number++;
		string = secretkey + number;
		hash = md5(string);
		firstsix = hash.substring(0, 6);
	}
	
	var newP = document.createElement("p");
	var newMsg = document.createTextNode("Answer (6): " + number);
	newP.appendChild(newMsg);
	document.body.appendChild(newP);
}

window.onload = function() {
	day4_1();
	day4_2();
}