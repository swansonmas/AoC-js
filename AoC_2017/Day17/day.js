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

function insertStep(buff, val, steps, len, pos) {
	var idx = (pos + steps) % len
	buff.splice(idx + 1, 0, val);
	return idx+1;
}

function insertFauxStep(buff, val, steps, len, pos) {
	var idx = (pos + steps) % len
	return idx+1;
}

//	0:15:34
function func1(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	var insrts = 2018;
	var stps = 376;
	
	var circBuff = [0];
	
	var curLoc = 0;
	for (var i = 1; i < insrts; i++) {
		curLoc = insertStep(circBuff, i, stps, i, curLoc);
	}
	
	return circBuff[circBuff.indexOf(2017)+1];
}

//	0:20:23
function func2(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	var insrts = 50000001;
	var stps = 376;
	
	var circBuff = [0];
	
	var curLoc = 0;
	var aftZero = undefined;
	for (var i = 1; i < insrts; i++) {
		curLoc = insertFauxStep(circBuff, i, stps, i, curLoc);
		if (curLoc == 1) {
			aftZero = i;
		}
	}
	
	return aftZero;
}

var input = ``;