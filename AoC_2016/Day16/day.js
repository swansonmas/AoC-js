/* 
	buildJSON = function(entries, key, keys, values)
	permute = function(a)
	permuteStr = function(s)
	combine = function(a, min, max)
	combineStr = function(s, min, max)
	transpose = function(matrix)
	OPTIONAL: findHash = function(k, t, l)
	Array => min,max,counts
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
	var lines = (input.match(/.+/g)||[]);
	
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}

function addData(a) {
	var b = a.map( line => line );
	b = b.reverse().map( bit => (bit + 1) % 2 );
	a = [...a,0,...b];
	return a;
}

function genData(a, length) {
	while(a.length < length) {
		a = addData(a);
	}
	return a.slice(0,length);
}
function reduce(data) {
	var pairs = data.match(/(\d\d)/g);
	return pairs.map( pr => {if (pr.match(/(\d)\1/g) != null) {return 1;} else {return 0;}}).join("");
}

function checksum(data, diskLength) {
	var cksm = data;
	while(!((cksm = reduce(cksm)).length % 2));
	return cksm;
}

//	0:25:27
function func1(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var dt = genData(input.split("").map( b => parseInt(b, 10)), length1);
	var dtck = checksum(dt.join(""), length);
	
	return dtck;
}

//	0:30:33
function func2(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var dt = genData(input.split("").map( b => parseInt(b, 10)), length2);
	var dtck = checksum(dt.join(""), length);
	
	return dtck;
}

var lenght1 = 272;
var length2 = 35651584;
var input = `10011111011011001`;