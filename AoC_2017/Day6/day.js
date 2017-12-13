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
	var lines = input.match(/[^\s]+/g);
	
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}

function realloc(bnks) {
	var mBks = bnks.reduce( (a,b) => Math.max(a,b));
	
	var mBI, mBs;
	for (var i = 0; i < bnks.length; i++) {
		if (bnks[i] == mBks) {
			mBI = i;
			mBs = bnks[mBI];
			bnks[mBI] = 0;
			break;
		}
	}
	
	for (var i = 0; i < mBs; i++) {
		bnks[(mBI + i + 1) % bnks.length] += 1;
	}
}

//	
function func1(strs) {
	banks = strs.map( (line) => parseInt(line, 10));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var sts = new Set();
	
	var recs = 0;
	while(!sts.has(banks.toString()))
	{
		sts.add(banks.toString());
		realloc(banks);
		recs++;
	}
	
	return recs;
}

//	
function func2(strs) {
	banks = strs.map( (line) => parseInt(line, 10));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var sts = new Map();
	//sts.add(banks.toString());
	
	var recs = 0;
	while(!sts.has(banks.toString()))
	{
		sts.set(banks.toString(), recs);
		realloc(banks);
		recs++;
	}
	
	return recs - sts.get(banks.toString());
}

var banks1 = [0,2,7,0];
var banks = `0	5	10	0	11	14	13	4	11	8	8	7	1	4	12	11`;
var input = `0	5	10	0	11	14	13	4	11	8	8	7	1	4	12	11`;