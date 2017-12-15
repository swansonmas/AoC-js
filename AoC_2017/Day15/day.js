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

function nextA(prev) {
	return (prev * gena) % 2147483647;
}

function nextB(prev) {
	return (prev * genb) % 2147483647;
}

function findPairs(count, initA, initB) {
	var a = initA;
	var b = initB;
	var pairs = 0;
	for (var i = 0; i < count; i++) {
		a = nextA(a);
		b = nextB(b);
		if ( (a & 0xFFFF) == (b & 0xFFFF) ) {
			pairs++;
		}
	}
	return pairs;
}

function findPairsRest(count, initA, initB) {
	var a = initA;
	var b = initB;
	var pairs = 0;
	for (var i = 0; i < count; i++) {
		a = nextA(a);
		while (a % 4 != 0) {
			a = nextA(a);
		}
		b = nextB(b);
		while ( b % 8 != 0) {
			b = nextB(b);
		}
		if ( (a & 0xFFFF) == (b & 0xFFFF) ) {
			pairs++;
		}
	}
	return pairs;
}

//	
function func1(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var inita = 703;
	var initb = 516;
	
	return findPairs(40000000, inita, initb);
}

//	
function func2(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var inita = 703;
	var initb = 516;
	
	return findPairsRest(5000000, inita, initb);
}
var gena = 16807;
var genb = 48271;
var input = ``;