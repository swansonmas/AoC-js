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
	
	var lines = (input1.match(/.+/g)||[]);
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var lines = (input2.match(/.+/g)||[]);
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}

function discValid(disc, discOffset, zeroTime) {
	return ((disc[1] + zeroTime + discOffset + 1) % disc[0] == 0)
}

//	0:23:32
function func1(strs) {
	strs = strs.map( (line) => line.replace(".","").split(" "));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var time = -1;
	var done = false;
	var dscs = strs.map( dsc => [parseInt(dsc[3],10), parseInt(dsc[11],10)] );
	while (!done) {
		time++;
		done = (dscs.filter( (dsc,pos) => discValid(dsc,pos,time)).length == dscs.length);
		//done = true;
	}
	
	return time;
}

//	0:24:27
function func2(strs) {
	strs = strs.map( (line) => line.replace(".","").split(" "));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var time = -1;
	var done = false;
	var dscs = strs.map( dsc => [parseInt(dsc[3],10), parseInt(dsc[11],10)] );
	console.table(dscs);
	while (!done) {
		time++;
		done = (dscs.filter( (dsc,pos) => discValid(dsc,pos,time)).length == dscs.length);
		//done = true;
	}
	
	return time;
}

var input = `Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`;
var input1 = `Disc #1 has 17 positions; at time=0, it is at position 5.
Disc #2 has 19 positions; at time=0, it is at position 8.
Disc #3 has 7 positions; at time=0, it is at position 1.
Disc #4 has 13 positions; at time=0, it is at position 7.
Disc #5 has 5 positions; at time=0, it is at position 1.
Disc #6 has 3 positions; at time=0, it is at position 0.`;
var input2 = `Disc #1 has 17 positions; at time=0, it is at position 5.
Disc #2 has 19 positions; at time=0, it is at position 8.
Disc #3 has 7 positions; at time=0, it is at position 1.
Disc #4 has 13 positions; at time=0, it is at position 7.
Disc #5 has 5 positions; at time=0, it is at position 1.
Disc #6 has 3 positions; at time=0, it is at position 0.
Disc #7 has 11 positions; at time=0, it is at position 0.`;