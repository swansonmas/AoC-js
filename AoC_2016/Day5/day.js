/* 
	buildJSON = function(entries, key, keys, values)
	permute = function(a)
	permuteStr = function(s)
	combine = function(a, min, max)
	combineStr = function(s, min, max)
	transpose = function(matrix)
*/
function day1(files) {
	var read1 = readlines(files);
	read1.then(function (strings) {
		var val1 = func1(strings);
		showDoneMessage("input1", "Part 1: ", val1);
	});
}

function day2(files) {
	var read2 = readlines(files);
	read2.then(function (strings) {
		var val2 = func2(strings);
		showDoneMessage("input2", "Part 2: ", val2);
	});
}

window.onload = function() {
	var lines = input.split("\n");
	
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}



//	0:20:57
function func1(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var secretkey = input;
	var number = 0;
	var string = secretkey + number;
	var hash = md5(string);
	var first = hash.substring(0, 5);
	var test = "0".repeat(5);
	
	var pass = '';
	for (var iPs = 0; iPs < 8; iPs++) {
		while(first !== test)
		{
			number++;
			string = secretkey + number;
			hash = md5(string);
			first = hash.substring(0, 5);
		}
		pass += hash.charAt(5);
		first = "";
	}
	
	return pass;
}

//	0:54:35
function func2(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var pass = 'ABCDEFGH';
	pass = pass.slice(0,1) + 5 + pass.slice(1+1);
	
	var secretkey = input;
	var number = 0;
	var string = secretkey + number;
	var hash = md5(string);
	console.log(hash.charAt(6));
	var first = hash.substring(0, 5);
	var test = "0".repeat(5);
	return findHash(secretkey, test, 5);
	var pass = '........';
	for (var iPs = 0; iPs < 8; iPs++) {
		while(first !== test)
		{
			number++;
			string = secretkey + number;
			hash = md5(string);
			first = hash.substring(0, 5);
		}
		
		var idx = parseInt(hash.charAt(5),10);
		if (idx < 8 && pass.charAt(idx) == '.') {
			console.log(pass.slice(0,idx) + hash.charAt(6) + pass.slice(idx+1));
			pass = pass.slice(0,idx) + hash.charAt(6)+ pass.slice(idx+1);
		} else {
			iPs--;
		}
		
		first = "";
	}
	
	return pass;
}

var input1 = 'abc';
var input = `ojvtpuvg`;