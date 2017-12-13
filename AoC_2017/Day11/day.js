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

function parseDir(coord, dir) {
	var delta = [];
	if (dir == 'n') { delta = [0,1]; }
	else if (dir == 'ne') {delta = [1,0.5]; }
	else if (dir == 'nw') { delta = [-1,0.5];}
	else if (dir == 's') { delta = [0,-1];}
	else if (dir == 'se') {delta = [1,-0.5]; }
	else if (dir == 'sw') { delta = [-1,-0.5];}
	coord[0] += delta[0];
	coord[1] += delta[1];
	return coord;
}

//	
function func1(strs) {
	strs = strs.map( (line) => line.split(","));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	var test = ['n','s'];
	var chld = [0,0];
	strs[0].map( d => chld = parseDir(chld,d) );
	
	return chld.max();
}

//	
function func2(strs) {
	strs = strs.map( (line) => line.split(","));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	var test = ['n','s'];
	var chld = [0,0];
	var stps = [];
	strs[0].map( d => {chld = parseDir(chld,d); stps.push([chld[0],chld[1]]); });
	
	return stps.reduce( (max,stp) => Math.max(max,stp[0]), 0);
}

var input = `n,nw,nw,sw,s,sw,sw,s,s,s,s,s,ne,s,ne,se,se,sw,s,se,se,se,n,se,se,ne,se,ne,n,ne,ne,sw,ne,ne,se,ne,ne,ne,sw,ne,ne,ne,n,ne,n,n,se,ne,ne,n,sw,n,ne,n,ne,n,ne,n,n,n,n,n,n,n,ne,n,n,sw,nw,n,nw,n,nw,n,n,nw,s,nw,nw,n,n,nw,se,nw,nw,sw,n,n,n,nw,nw,n,nw,nw,nw,nw,nw,ne,nw,nw,nw,sw,sw,nw,nw,nw,ne,sw,se,n,s,nw,sw,nw,s,sw,sw,n,nw,sw,sw,nw,sw,sw,nw,nw,nw,sw,sw,sw,s,sw,se,sw,sw,ne,sw,sw,sw,ne,sw,sw,sw,nw,sw,sw,sw,sw,sw,nw,sw,se,se,nw,nw,sw,sw,sw,ne,nw,sw,n,sw,sw,sw,sw,se,sw,sw,se,sw,ne,nw,sw,sw,nw,sw,sw,sw,se,sw,s,s,s,sw,s,sw,sw,sw,s,s,s,s,s,s,s,sw,s,nw,s,sw,s,s,se,s,s,s,s,ne,s,s,se,s,se,nw,s,s,ne,s,s,se,s,s,s,s,s,s,s,s,se,s,se,s,n,s,n,s,s,s,s,s,ne,s,sw,se,s,s,se,s,s,s,s,se,s,s,s,nw,se,s,nw,se,s,se,se,nw,s,sw,s,sw,s,se,se,s,s,s,se,s,s,se,n,se,se,se,s,s,s,se,s,se,se,se,se,s,nw,s,se,se,se,se,se,s,n,se,se,se,se,se,se,sw,s,s,se,n,se,se,ne,se,se,se,se,se,sw,se,se,se,n,se,se,ne,se,se,se,se,se,se,se,se,se,se,sw,sw,nw,se,ne,ne,n,s,se,se,n,ne,ne,nw,se,n,se,se,se,ne,ne,ne,se,s,s,se,se,ne,se,se,se,ne,ne,ne,s,se,nw,ne,s,se,se,ne,se,se,se,ne,se,s,ne,se,se,se,s,ne,sw,nw,s,ne,se,se,ne,ne,ne,n,ne,se,ne,ne,ne,se,ne,ne,sw,ne,ne,n,ne,s,sw,ne,ne,ne,se,ne,se,se,ne,ne,se,se,ne,ne,ne,ne,ne,se,se,n,ne,ne,ne,s,ne,ne,ne,ne,ne,ne,se,se,s,ne,ne,ne,ne,s,ne,ne,ne,ne,ne,nw,ne,ne,sw,ne,se,ne,ne,ne,ne,sw,s,ne,ne,s,ne,ne,ne,ne,se,s,ne,ne,ne,ne,sw,ne,ne,ne,nw,ne,ne,ne,n,ne,ne,se,ne,se,ne,ne,ne,sw,n,ne,ne,n,nw,se,n,n,n,n,sw,ne,n,n,n,ne,se,n,sw,ne,n,n,ne,ne,ne,ne,ne,n,ne,ne,n,n,ne,s,n,ne,n,sw,sw,ne,ne,n,ne,ne,n,sw,ne,s,ne,n,ne,n,n,ne,n,ne,s,n,ne,se,n,ne,n,ne,n,ne,ne,ne,n,s,ne,ne,ne,n,n,n,nw,ne,ne,n,ne,ne,n,sw,s,ne,n,n,sw,ne,ne,n,ne,n,nw,nw,nw,ne,n,n,n,ne,ne,se,n,n,s,ne,n,n,n,nw,ne,s,n,n,nw,sw,ne,ne,n,n,n,ne,n,ne,nw,n,n,n,n,ne,n,n,n,n,n,n,ne,n,n,ne,n,ne,n,n,n,n,n,sw,n,sw,n,n,sw,n,n,n,n,n,n,n,se,ne,se,sw,n,n,n,n,n,n,n,n,n,n,n,n,n,n,nw,n,n,nw,n,ne,n,ne,n,nw,nw,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,ne,n,n,sw,ne,n,n,n,n,n,n,n,ne,n,n,nw,n,n,nw,n,n,n,n,n,n,se,nw,sw,n,n,n,n,n,n,nw,n,n,s,n,nw,n,n,s,n,nw,n,n,nw,se,n,n,n,n,n,n,n,n,nw,n,n,nw,nw,nw,n,sw,nw,n,nw,se,nw,sw,n,nw,s,nw,n,n,sw,nw,nw,nw,sw,nw,nw,nw,n,n,nw,n,n,nw,s,nw,n,n,n,sw,se,n,n,n,nw,nw,s,nw,nw,n,n,nw,nw,nw,n,nw,nw,se,n,n,nw,nw,s,nw,n,n,n,s,nw,ne,nw,n,nw,nw,ne,se,n,ne,n,nw,sw,nw,n,nw,n,n,nw,n,nw,n,nw,n,nw,nw,n,n,n,s,ne,nw,nw,nw,nw,s,nw,nw,nw,n,n,nw,n,nw,sw,nw,nw,nw,n,ne,s,se,nw,n,nw,nw,n,nw,sw,nw,nw,nw,n,s,nw,n,nw,n,n,nw,sw,nw,nw,nw,n,nw,nw,nw,nw,nw,nw,ne,sw,nw,nw,nw,nw,nw,nw,sw,nw,ne,nw,nw,nw,ne,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,n,nw,nw,nw,nw,nw,nw,nw,n,nw,nw,s,se,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,sw,nw,nw,nw,nw,sw,nw,nw,nw,nw,nw,nw,se,n,nw,ne,nw,nw,s,nw,nw,se,s,nw,se,n,nw,nw,nw,nw,nw,n,nw,nw,n,nw,nw,nw,nw,nw,nw,nw,n,s,nw,sw,nw,sw,nw,nw,nw,nw,n,nw,n,nw,sw,nw,nw,nw,nw,nw,nw,ne,nw,nw,nw,nw,nw,nw,se,nw,nw,nw,ne,sw,nw,nw,nw,se,nw,nw,s,n,nw,nw,nw,nw,nw,nw,nw,sw,nw,nw,nw,nw,s,nw,ne,sw,sw,n,nw,nw,sw,nw,se,nw,nw,sw,nw,n,nw,se,nw,se,nw,sw,nw,nw,sw,nw,n,nw,se,nw,nw,s,s,nw,sw,nw,s,nw,nw,nw,n,nw,nw,sw,n,ne,sw,ne,sw,nw,sw,nw,sw,s,sw,nw,sw,nw,nw,nw,sw,sw,nw,nw,nw,se,sw,n,nw,nw,nw,sw,ne,sw,sw,sw,sw,sw,sw,sw,nw,se,nw,nw,sw,nw,sw,sw,sw,nw,nw,n,nw,nw,nw,nw,sw,sw,sw,se,sw,sw,s,sw,sw,sw,sw,sw,n,nw,sw,nw,nw,sw,sw,sw,sw,sw,nw,sw,sw,n,nw,sw,se,sw,sw,nw,sw,sw,nw,nw,ne,se,se,sw,nw,nw,se,sw,nw,sw,nw,nw,nw,nw,sw,sw,nw,sw,nw,sw,nw,sw,sw,sw,sw,sw,nw,nw,sw,sw,sw,sw,nw,nw,sw,nw,sw,sw,sw,sw,sw,sw,n,sw,nw,sw,nw,n,sw,se,nw,sw,s,nw,sw,nw,sw,sw,nw,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,ne,ne,n,nw,sw,ne,nw,n,sw,sw,sw,sw,sw,ne,s,sw,se,n,nw,sw,sw,sw,sw,sw,sw,sw,sw,nw,sw,sw,sw,se,sw,sw,n,nw,sw,sw,nw,nw,sw,sw,ne,nw,nw,se,sw,sw,ne,sw,sw,nw,sw,nw,nw,sw,se,sw,ne,sw,sw,sw,nw,sw,sw,s,sw,sw,ne,n,sw,sw,ne,sw,sw,s,nw,nw,nw,sw,sw,sw,ne,sw,sw,n,ne,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,ne,sw,sw,ne,sw,sw,sw,sw,ne,sw,nw,sw,sw,sw,sw,sw,sw,se,sw,sw,ne,sw,nw,sw,sw,n,sw,ne,sw,sw,sw,sw,sw,sw,nw,sw,sw,sw,sw,sw,nw,sw,sw,sw,s,s,sw,sw,sw,sw,sw,sw,sw,sw,n,sw,sw,sw,sw,s,ne,sw,s,s,sw,sw,sw,sw,n,sw,sw,sw,sw,sw,sw,sw,sw,s,sw,sw,sw,sw,sw,se,s,sw,sw,sw,se,sw,sw,n,sw,s,sw,sw,sw,sw,sw,sw,sw,sw,ne,sw,s,s,s,s,sw,nw,sw,sw,sw,sw,nw,sw,sw,s,sw,sw,ne,nw,sw,sw,s,sw,s,sw,sw,sw,sw,s,ne,sw,sw,sw,s,sw,sw,se,sw,sw,sw,sw,sw,sw,ne,se,sw,sw,ne,s,nw,s,sw,s,sw,s,sw,n,sw,n,se,sw,sw,sw,s,sw,s,sw,sw,sw,sw,sw,s,s,sw,s,s,s,s,sw,sw,ne,sw,s,sw,sw,ne,sw,sw,sw,s,sw,ne,sw,sw,sw,ne,sw,sw,s,sw,sw,sw,sw,s,sw,s,sw,sw,sw,s,sw,sw,sw,n,n,sw,s,sw,s,sw,sw,sw,s,s,sw,sw,sw,sw,sw,sw,s,sw,n,sw,sw,s,nw,s,sw,s,n,s,sw,s,s,s,sw,nw,s,sw,s,sw,s,sw,s,sw,ne,s,s,sw,se,sw,sw,n,sw,s,nw,sw,sw,nw,s,s,sw,s,nw,s,s,s,sw,sw,s,s,nw,s,sw,sw,s,nw,sw,s,s,nw,nw,sw,s,se,s,s,sw,s,n,sw,sw,sw,sw,sw,sw,s,ne,s,s,s,sw,sw,s,s,sw,s,sw,s,se,ne,s,s,s,sw,s,s,sw,ne,s,s,sw,s,se,sw,s,s,sw,se,sw,s,ne,sw,s,s,s,s,s,s,s,s,s,s,sw,s,s,sw,s,se,s,s,s,sw,s,sw,s,sw,s,sw,s,s,s,sw,s,s,s,sw,s,n,sw,sw,se,ne,s,s,sw,s,sw,n,sw,s,sw,s,sw,sw,s,s,sw,sw,s,s,s,s,se,sw,s,s,s,n,s,s,se,s,sw,sw,s,sw,s,s,s,sw,s,sw,sw,nw,s,s,s,s,s,s,s,sw,s,s,s,sw,s,s,s,s,nw,s,s,s,s,s,s,sw,n,s,s,s,n,s,sw,se,sw,s,s,nw,sw,s,sw,sw,s,n,s,s,s,sw,s,sw,n,s,s,sw,s,s,sw,s,s,s,s,s,ne,sw,s,s,s,s,s,s,n,sw,s,s,se,n,se,sw,s,sw,s,sw,se,s,s,s,s,se,s,se,ne,s,s,sw,s,nw,se,s,s,s,s,sw,s,s,s,s,s,se,ne,s,s,s,s,s,s,s,se,ne,n,n,s,s,s,s,nw,nw,s,s,s,s,nw,s,s,s,s,s,se,se,s,s,s,n,s,n,s,s,s,s,s,s,s,ne,ne,s,s,n,s,ne,s,sw,s,sw,sw,s,s,ne,s,sw,s,s,n,s,s,se,s,s,s,s,s,s,s,s,se,s,se,s,n,s,s,s,n,s,s,s,s,s,s,s,ne,sw,n,s,s,s,s,sw,s,s,s,s,se,s,n,s,s,s,s,s,s,se,s,s,sw,s,s,s,s,s,s,s,se,n,s,s,ne,s,s,s,s,se,s,se,s,s,s,ne,s,s,s,nw,s,s,s,s,s,se,s,n,se,s,s,s,s,s,se,s,se,nw,se,n,s,n,s,s,s,s,s,s,s,s,s,s,s,nw,s,sw,s,nw,s,s,s,s,s,nw,s,s,ne,sw,s,s,sw,s,s,ne,s,s,se,s,s,s,s,s,s,s,sw,sw,s,ne,s,s,s,sw,nw,s,s,ne,s,n,s,s,s,s,s,n,sw,sw,s,s,sw,se,nw,s,ne,s,s,s,nw,n,s,n,s,s,s,s,s,sw,se,s,s,s,s,se,se,s,s,s,ne,s,s,s,s,s,se,se,nw,nw,s,se,s,ne,se,s,s,se,se,se,s,ne,nw,se,nw,s,n,s,se,se,se,s,sw,s,se,s,se,s,s,s,s,se,se,s,s,s,s,ne,s,s,s,s,s,s,sw,se,s,se,s,s,se,s,sw,s,s,se,se,s,se,se,s,s,se,s,s,s,s,n,ne,se,s,se,s,sw,sw,n,s,s,s,nw,se,sw,se,s,se,se,n,se,s,se,s,s,se,sw,n,s,s,sw,sw,s,se,sw,s,se,sw,s,se,se,s,se,s,se,se,se,ne,s,s,se,s,ne,se,se,s,se,se,se,s,ne,s,s,s,se,se,sw,s,s,s,se,n,s,se,s,se,s,s,s,s,s,s,se,ne,ne,se,ne,se,se,se,se,sw,s,n,ne,s,se,s,s,s,s,nw,ne,s,sw,se,sw,ne,se,nw,s,se,se,se,s,s,ne,s,se,se,ne,s,s,n,s,se,s,se,se,se,se,s,se,se,se,s,se,sw,s,se,n,s,nw,nw,se,s,s,sw,s,se,s,se,se,ne,s,se,se,s,se,s,se,n,s,se,s,s,se,s,s,s,ne,se,se,s,s,sw,se,se,se,se,se,n,se,se,ne,s,se,ne,s,se,se,s,s,n,s,se,s,s,se,ne,se,s,ne,nw,s,n,s,ne,se,s,sw,se,s,se,n,s,se,s,se,se,s,se,s,se,sw,ne,se,se,se,se,s,se,se,se,n,se,se,s,s,s,s,se,se,se,nw,se,se,ne,se,se,s,s,s,s,se,se,s,se,se,sw,s,se,s,se,s,ne,se,se,se,sw,se,nw,n,se,s,se,se,sw,s,sw,s,se,s,s,se,se,se,s,s,se,se,nw,s,se,sw,se,s,se,s,se,s,s,ne,nw,sw,s,se,se,se,se,se,nw,nw,se,s,sw,se,s,ne,se,s,s,se,s,nw,ne,se,ne,se,s,ne,s,nw,se,sw,se,nw,s,sw,sw,se,se,se,s,se,se,se,se,s,s,se,s,s,se,se,s,s,se,se,se,n,s,se,se,se,s,sw,se,se,se,se,se,se,se,se,s,se,se,se,se,ne,se,se,s,ne,se,se,ne,se,s,se,sw,n,se,se,se,se,n,se,sw,se,se,se,sw,se,se,se,s,sw,nw,se,se,sw,nw,se,se,nw,se,se,se,se,nw,se,se,se,se,se,s,nw,se,ne,se,nw,s,se,se,se,sw,se,se,se,se,se,se,se,s,s,se,se,se,se,se,se,nw,n,se,se,se,n,se,se,se,n,n,se,n,se,se,se,se,se,ne,se,se,se,sw,n,n,se,s,sw,se,s,se,ne,ne,nw,se,se,ne,se,se,se,se,se,s,se,se,s,se,se,s,se,se,nw,se,se,se,se,s,se,se,se,se,se,se,se,se,se,se,se,se,n,se,se,se,se,se,se,se,se,s,se,n,sw,n,se,s,se,se,se,se,se,sw,ne,se,se,se,se,se,se,se,se,se,se,se,se,se,se,se,se,ne,se,se,se,se,se,se,se,se,se,se,se,ne,se,ne,se,s,se,se,se,se,ne,s,s,se,se,se,se,se,s,se,se,nw,se,se,ne,nw,nw,se,sw,nw,se,se,se,se,se,se,sw,sw,se,se,nw,ne,se,se,ne,se,se,ne,se,se,se,se,se,ne,s,se,se,se,se,se,se,se,se,se,se,n,se,se,se,se,se,se,se,se,se,se,n,se,se,se,se,se,ne,se,se,se,se,se,se,s,se,se,se,se,se,se,se,se,ne,se,se,ne,sw,ne,se,se,ne,se,se,s,se,se,se,nw,ne,se,n,se,sw,se,ne,se,se,se,ne,se,se,se,nw,se,se,ne,n,se,se,se,sw,se,ne,se,se,se,ne,se,se,ne,se,se,se,se,se,se,ne,s,se,ne,se,se,se,se,se,se,ne,ne,se,nw,se,se,se,ne,se,se,sw,ne,ne,s,sw,se,nw,ne,se,ne,ne,se,se,se,ne,ne,se,se,nw,se,ne,ne,se,se,s,nw,ne,ne,se,se,se,ne,se,se,ne,se,se,se,se,se,se,se,s,se,ne,nw,sw,se,se,se,se,se,se,se,se,se,ne,se,se,ne,se,se,se,se,n,se,sw,se,nw,se,se,se,ne,ne,se,se,ne,ne,se,se,s,se,ne,se,s,nw,se,se,nw,se,s,nw,ne,se,se,se,ne,se,se,se,se,se,se,se,se,se,se,se,se,ne,ne,ne,sw,se,se,se,ne,se,se,se,n,se,ne,s,ne,s,se,se,nw,se,ne,ne,n,ne,ne,se,ne,ne,se,sw,n,ne,ne,se,se,ne,se,s,se,ne,n,ne,se,se,se,n,se,s,sw,se,ne,se,ne,se,n,se,se,se,se,ne,se,s,se,se,se,n,se,se,ne,ne,se,se,se,se,n,ne,ne,se,nw,se,sw,n,se,ne,se,se,ne,ne,sw,se,se,se,ne,ne,se,se,se,se,ne,n,n,ne,se,ne,se,sw,se,n,se,se,ne,se,se,sw,se,se,se,se,ne,se,se,ne,se,se,ne,n,se,ne,sw,se,se,se,ne,s,ne,se,se,se,ne,sw,se,se,ne,ne,ne,se,se,ne,se,se,se,ne,se,ne,se,ne,ne,se,se,ne,ne,se,ne,se,nw,se,ne,se,nw,n,nw,ne,se,ne,se,se,ne,se,nw,se,se,ne,nw,se,se,n,ne,nw,se,n,se,se,ne,se,se,se,ne,se,nw,se,ne,ne,se,nw,se,se,se,se,ne,se,se,se,se,ne,nw,se,ne,se,ne,ne,se,n,ne,ne,se,ne,n,sw,ne,ne,se,ne,se,se,se,sw,ne,se,s,nw,se,sw,s,se,ne,s,ne,se,ne,se,ne,s,ne,ne,se,se,se,ne,n,se,ne,nw,ne,ne,nw,se,n,sw,ne,ne,se,ne,ne,se,ne,se,se,sw,sw,ne,sw,se,se,ne,ne,nw,ne,se,se,ne,se,s,sw,ne,se,ne,ne,ne,se,se,ne,ne,se,se,ne,se,ne,se,ne,ne,se,se,se,se,ne,ne,se,ne,se,sw,ne,se,s,s,ne,ne,ne,se,ne,sw,se,ne,ne,se,se,ne,ne,se,ne,ne,ne,ne,ne,se,nw,ne,se,ne,ne,se,se,ne,se,ne,se,ne,n,se,n,se,se,se,se,nw,ne,n,se,ne,s,ne,se,se,ne,ne,ne,n,se,sw,sw,ne,se,ne,ne,ne,se,n,ne,ne,se,se,se,ne,ne,se,ne,sw,ne,n,s,se,se,sw,se,ne,ne,se,n,nw,ne,s,se,ne,sw,s,ne,s,ne,se,nw,ne,ne,sw,ne,ne,ne,s,ne,sw,ne,se,ne,ne,s,se,se,s,ne,nw,nw,se,se,ne,se,ne,s,ne,ne,ne,ne,ne,se,se,ne,ne,se,sw,se,sw,ne,sw,ne,ne,se,ne,se,s,n,se,ne,ne,se,ne,ne,ne,ne,n,se,se,ne,n,se,se,ne,se,ne,ne,se,se,ne,se,se,ne,ne,ne,se,sw,ne,se,se,ne,nw,ne,ne,ne,ne,ne,ne,ne,n,se,ne,se,s,ne,se,ne,ne,se,ne,se,se,ne,se,ne,ne,sw,se,ne,ne,ne,s,ne,ne,s,ne,ne,ne,ne,se,s,ne,ne,ne,ne,ne,se,sw,ne,ne,ne,ne,ne,ne,ne,ne,nw,ne,ne,ne,se,nw,ne,se,ne,ne,ne,ne,ne,s,ne,ne,se,ne,n,ne,ne,ne,ne,ne,ne,se,se,ne,s,ne,ne,se,ne,ne,se,ne,s,n,ne,ne,ne,se,ne,ne,s,se,n,ne,ne,ne,ne,ne,ne,ne,ne,n,ne,nw,ne,ne,ne,sw,ne,ne,ne,ne,ne,ne,ne,nw,ne,se,ne,ne,ne,ne,s,ne,ne,ne,ne,ne,n,ne,ne,ne,ne,ne,ne,n,se,ne,ne,s,ne,ne,ne,s,s,ne,ne,ne,ne,ne,ne,se,ne,ne,ne,se,s,nw,se,ne,ne,ne,ne,nw,ne,ne,ne,sw,ne,sw,ne,ne,ne,ne,ne,ne,n,ne,ne,ne,sw,se,ne,s,ne,ne,ne,ne,ne,ne,n,n,ne,ne,ne,n,ne,ne,nw,ne,ne,ne,nw,s,ne,ne,nw,ne,se,ne,ne,ne,nw,se,nw,ne,ne,ne,ne,ne,ne,ne,nw,ne,ne,ne,ne,sw,ne,ne,n,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,n,s,ne,ne,ne,ne,ne,ne,ne,ne,ne,sw,se,ne,sw,se,ne,nw,sw,ne,ne,ne,ne,nw,ne,ne,s,ne,ne,ne,ne,n,ne,ne,se,nw,s,ne,ne,ne,ne,ne,nw,ne,ne,s,se,ne,ne,s,ne,ne,ne,ne,ne,ne,ne,n,se,s,ne,ne,ne,n,ne,se,se,s,ne,ne,ne,sw,ne,ne,ne,se,ne,ne,ne,s,ne,ne,ne,ne,ne,ne,sw,nw,nw,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,n,ne,ne,ne,ne,ne,ne,ne,ne,s,ne,n,ne,se,ne,nw,ne,sw,ne,ne,ne,ne,nw,ne,s,ne,ne,ne,ne,ne,ne,sw,ne,ne,se,nw,ne,ne,ne,n,se,nw,ne,ne,ne,ne,s,ne,ne,n,se,ne,ne,sw,ne,ne,ne,n,ne,nw,ne,ne,ne,se,ne,n,ne,s,ne,ne,ne,ne,ne,ne,ne,ne,n,ne,ne,se,se,ne,ne,ne,ne,se,ne,ne,ne,ne,ne,ne,ne,n,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,nw,ne,ne,nw,ne,ne,ne,ne,sw,sw,se,ne,n,ne,ne,n,n,n,nw,ne,ne,ne,ne,ne,ne,s,ne,ne,ne,ne,ne,n,ne,sw,se,ne,sw,s,ne,ne,ne,ne,ne,ne,sw,ne,n,n,ne,n,ne,sw,n,ne,n,s,ne,n,ne,ne,ne,ne,ne,sw,s,ne,nw,ne,nw,nw,ne,ne,ne,ne,n,ne,ne,ne,ne,s,ne,ne,ne,ne,ne,ne,ne,ne,n,n,n,ne,n,ne,n,nw,ne,n,ne,ne,ne,ne,ne,ne,ne,ne,sw,ne,ne,ne,n,ne,ne,ne,ne,ne,ne,nw,ne,n,n,ne,ne,ne,n,ne,n,ne,ne,sw,nw,n,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,n,ne,ne,ne,n,n,ne,ne,ne,ne,ne,ne,n,ne,ne,ne,ne,n,n,s,ne,ne,ne,ne,se,ne,nw,ne,ne,se,nw,ne,ne,ne,sw,ne,ne,se,ne,n,n,s,ne,ne,ne,ne,ne,s,ne,ne,ne,sw,ne,ne,se,ne,n,ne,s,ne,sw,ne,s,ne,ne,s,ne,ne,ne,ne,s,ne,s,ne,ne,ne,nw,ne,n,ne,ne,ne,ne,n,ne,n,n,n,ne,ne,n,ne,n,ne,ne,n,nw,se,ne,n,ne,ne,ne,n,n,n,n,ne,n,s,ne,ne,ne,n,n,n,ne,s,s,n,s,nw,ne,ne,ne,sw,ne,ne,ne,n,n,ne,ne,ne,ne,ne,n,ne,ne,ne,n,ne,sw,ne,sw,ne,ne,ne,ne,ne,ne,nw,n,ne,ne,ne,n,s,n,ne,n,sw,s,ne,n,ne,s,ne,se,n,ne,se,n,ne,s,ne,n,ne,n,ne,ne,ne,ne,ne,n,sw,ne,n,nw,n,ne,ne,ne,n,ne,ne,n,n,n,ne,n,ne,n,sw,n,ne,ne,sw,ne,n,sw,n,n,n,nw,ne,ne,ne,ne,ne,ne,sw,s,ne,n,ne,n,n,ne,ne,sw,ne,ne,ne,n,ne,ne,nw,se,n,n,n,ne,ne,n,ne,ne,ne,sw,sw,ne,ne,ne,se,n,sw,n,n,ne,ne,ne,ne,ne,ne,sw,sw,ne,ne,ne,ne,n,n,nw,sw,ne,s,ne,ne,ne,ne,sw,n,n,n,ne,nw,ne,sw,ne,ne,n,sw,ne,ne,sw,ne,n,se,ne,ne,ne,nw,ne,n,ne,nw,ne,ne,s,ne,n,ne,ne,ne,n,ne,ne,ne,n,ne,n,n,n,nw,se,n,n,n,ne,ne,ne,ne,n,ne,se,n,n,ne,n,se,ne,ne,ne,ne,s,n,n,ne,ne,n,ne,n,sw,n,ne,n,sw,n,ne,n,n,ne,n,ne,sw,ne,n,ne,ne,n,s,ne,n,s,ne,n,ne,ne,ne,ne,n,ne,ne,n,ne,sw,n,ne,ne,ne,ne,ne,ne,ne,se,nw,se,n,n,n,n,n,ne,nw,n,n,n,n,ne,sw,n,n,n,ne,ne,n,ne,ne,ne,n,ne,sw,ne,n,sw,ne,n,ne,nw,n,sw,ne,ne,ne,ne,se,nw,sw,n,ne,sw,n,n,n,se,nw,n,s,ne,n,sw,nw,n,ne,ne,n,ne,ne,n,ne,n,n,ne,ne,n,ne,ne,ne,ne,n,sw,se,ne,ne,ne,s,n,nw,s,ne,ne,n,n,n,ne,ne,s,ne,ne,ne,sw,ne,n,n,n,ne,n,ne,se,n,ne,n,s,ne,n,ne,ne,n,ne,ne,s,n,n,n,se,n,n,ne,n,ne,se,se,se,n,n,n,nw,ne,ne,ne,ne,s,n,n,ne,ne,n,s,s,n,n,sw,ne,n,n,n,ne,ne,n,ne,ne,ne,sw,n,ne,n,n,n,ne,ne,nw,n,n,nw,sw,ne,sw,ne,s,n,n,s,n,ne,n,n,ne,n,ne,n,n,ne,ne,ne,n,n,ne,n,ne,ne,n,ne,ne,n,n,ne,ne,n,ne,sw,se,ne,ne,ne,n,n,nw,n,n,n,nw,se,n,n,n,sw,sw,n,n,n,n,ne,ne,n,ne,n,n,n,ne,n,ne,ne,se,se,ne,ne,n,n,n,ne,n,sw,ne,ne,ne,n,n,ne,se,n,sw,ne,ne,n,n,n,n,s,ne,n,n,nw,nw,n,n,n,ne,s,n,ne,ne,s,ne,n,n,sw,ne,ne,n,n,n,s,n,n,n,ne,n,sw,ne,n,s,n,s,sw,se,ne,n,n,n,n,ne,ne,nw,ne,n,n,ne,ne,ne,ne,ne,se,se,ne,n,n,sw,n,n,nw,n,ne,sw,n,sw,ne,ne,n,se,ne,ne,n,n,n,n,sw,n,n,n,nw,s,n,n,n,se,ne,ne,n,n,nw,n,n,n,n,n,n,n,n,n,se,n,ne,nw,n,se,n,ne,n,ne,n,n,n,n,nw,ne,n,n,ne,n,s,n,n,n,n,ne,ne,ne,ne,nw,n,s,se,ne,n,s,n,ne,ne,ne,nw,n,n,nw,se,ne,ne,ne,n,n,n,ne,s,nw,nw,nw,ne,n,n,nw,ne,n,n,ne,n,n,n,ne,sw,n,se,ne,se,n,nw,nw,n,ne,n,ne,ne,n,s,n,ne,ne,s,se,ne,ne,s,n,s,ne,n,n,n,n,nw,ne,n,sw,ne,n,n,n,n,n,se,s,n,n,n,se,n,n,n,n,n,n,n,n,se,n,n,s,ne,ne,ne,ne,s,n,n,n,n,ne,n,n,ne,n,n,n,ne,se,n,n,ne,ne,s,n,n,n,n,n,n,n,ne,s,n,n,n,nw,se,n,n,n,n,n,ne,n,ne,ne,ne,ne,n,n,se,n,n,ne,n,sw,n,ne,n,n,se,s,n,n,n,n,n,n,n,nw,s,n,n,n,ne,ne,n,s,nw,n,n,n,ne,ne,nw,n,ne,n,sw,n,n,ne,n,n,n,ne,nw,n,n,sw,n,se,s,n,n,nw,n,n,n,n,ne,sw,ne,se,n,n,n,n,ne,n,n,sw,nw,ne,n,n,n,sw,n,n,n,n,n,se,s,s,n,s,n,se,n,ne,n,n,n,n,n,n,n,ne,n,n,ne,n,n,n,n,se,nw,n,n,n,ne,n,n,n,n,ne,n,sw,n,s,n,n,n,n,n,se,n,n,ne,n,ne,n,se,n,n,ne,n,n,n,n,n,n,s,n,n,n,n,n,sw,n,ne,n,n,n,n,n,n,n,n,ne,n,n,s,n,n,n,n,n,ne,nw,ne,n,n,n,n,n,n,n,n,sw,n,n,n,nw,n,n,ne,n,ne,n,ne,n,n,nw,n,n,n,n,nw,n,se,n,n,se,n,n,n,n,n,n,n,n,n,n,s,n,n,n,n,ne,se,n,n,nw,n,n,n,n,s,n,n,ne,se,n,sw,n,n,n,ne,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,ne,n,n,n,n,n,n,sw,n,n,n,n,n,n,s,n,n,sw,n,n,n,n,n,n,n,n,ne,n,ne,n,n,n,n,n,n,se,s,n,n,sw,n,n,n,sw,n,n,n,n,n,n,n,n,se,s,sw,se,se,n,ne,se,n,n,n,n,n,n,n,ne,n,n,sw,n,n,n,n,n,n,n,n,n,n,ne,s,s,s,s,ne,s,s,s,sw,se,sw,se,ne,n,sw,nw,nw,sw,ne,se,nw,nw,nw,nw,se,sw,n,n,n,n,n,se,n,n,n,s,n,n,n,se,n,se,n,n,ne,n,n,ne,n,ne,ne,n,ne,ne,se,ne,n,ne,ne,ne,ne,ne,n,sw,se,se,ne,ne,nw,se,s,se,ne,se,se,se,se,ne,se,ne,ne,sw,se,se,ne,se,se,se,se,se,n,se,se,s,se,se,n,se,nw,se,se,sw,se,se,nw,nw,nw,s,se,s,n,se,se,sw,nw,s,se,se,se,se,se,ne,s,se,se,s,s,s,se,ne,nw,s,nw,se,s,sw,s,s,s,sw,s,s,s,s,s,s,s,s,s,sw,nw,sw,s,se,s,nw,s,sw,ne,s,s,s,s,s,sw,s,s,sw,sw,s,s,s,s,ne,n,sw,sw,s,s,se,sw,s,s,sw,s,sw,s,sw,s,sw,sw,s,s,s,sw,s,sw,sw,sw,sw,sw,sw,sw,n,nw,sw,sw,sw,sw,s,sw,sw,ne,sw,sw,sw,sw,sw,sw,sw,sw,n,sw,sw,nw,s,sw,sw,sw,sw,sw,sw,sw,s,sw,sw,sw,sw,se,se,sw,sw,sw,sw,sw,nw,sw,nw,sw,n,sw,sw,nw,nw,nw,nw,se,sw,nw,se,sw,sw,n,sw,n,sw,sw,nw,ne,nw,nw,se,nw,nw,nw,se,nw,nw,nw,s,n,nw,sw,n,sw,sw,nw,ne,nw,nw,s,nw,sw,nw,nw,sw,nw,sw,nw,ne,nw,nw,se,se,nw,nw,ne,nw,se,nw,se,nw,nw,nw,nw,s,s,nw,nw,nw,ne,nw,nw,nw,nw,nw,nw,nw,nw,n,nw,nw,nw,nw,nw,nw,se,nw,nw,nw,nw,nw,nw,nw,nw,nw,ne,nw,nw,n,n,nw,n,nw,nw,nw,s,se,nw,n,n,sw,nw,n,nw,nw,nw,nw,s,n,ne,nw,nw,nw,nw,n,ne,se,nw,nw,nw,n,s,n,n,nw,n,nw,n,nw,s,nw,nw,ne,s,nw,n,n,nw,s,nw,n,sw,nw,ne,n,nw,nw,nw,n,n,n,nw,n,nw,sw,n,n,n,n,se,ne,n,se,s,n,se,ne,n,nw,nw,s,nw,n,n,n,sw,n,nw,sw,n,n,n,nw,sw,n,n,sw,n,sw,n,sw,n,se,n,n,n,n,n,n,n,nw,n,n,n,n,ne,sw,n,s,n,n,n,n,se,nw,n,n,n,se,n,n,n,sw,n,n,se,n,ne,n,ne,ne,n,n,n,n,n,n,n,ne,n,ne,n,se,n,n,n,se,ne,n,n,n,s,s,n,n,n,s,se,n,n,n,n,n,n,se,n,ne,n,ne,ne,n,n,n,ne,n,n,n,n,ne,n,ne,n,n,sw,ne,sw,ne,n,n,n,ne,se,ne,sw,n,ne,ne,ne,n,ne,n,se,n,n,n,n,n,sw,nw,ne,ne,sw,n,se,n,n,ne,se,ne,ne,ne,s,ne,ne,n,ne,ne,ne,n,n,nw,ne,n,n,ne,ne,n,s,ne,ne,ne,ne,n,ne,ne,ne,n,ne,ne,sw,ne,n,ne,nw,se,ne,ne,ne,n,s,ne,ne,ne,ne,ne,n,ne,ne,ne,ne,ne,sw,ne,ne,s,n,ne,s,ne,n,ne,ne,ne,ne,ne,ne,se,se,ne,ne,ne,ne,n,n,ne,ne,ne,ne,ne,ne,ne,ne,nw,se,ne,ne,nw,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,se,n,ne,ne,ne,se,se,ne,ne,n,s,ne,ne,ne,ne,s,s,s,ne,ne,ne,se,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,sw,ne,s,ne,nw,ne,nw,ne,ne,nw,se,ne,s,ne,ne,ne,ne,ne,ne,ne,ne,ne,ne,nw,ne,nw,se,sw,ne,se,ne,ne,se,se,ne,ne,se,ne,sw,ne,ne,ne,se,ne,se,ne,ne,ne,s,s,ne,ne,se,se,ne,s,ne,se,ne,ne,ne,se,ne,ne,se,s,ne,se,ne,se,nw,ne,se,ne,s,s,ne,se,se,sw,se,ne,s,se,ne,ne,ne,ne,ne,n,se,se,se,ne,se,se,ne,n,nw,se,se,n,sw,ne,ne,ne,ne,s,ne,ne,sw,n,ne,ne,se,n,ne,se,se,ne,se,nw,ne,sw,se,s,ne,se,nw,se,ne,ne,ne,se,se,se,ne,ne,ne,se,ne,ne,sw,sw,nw,se,se,nw,n,ne,ne,ne,se,se,se,nw,se,nw,ne,se,nw,nw,se,se,n,se,se,se,se,se,nw,ne,se,se,se,s,se,se,se,se,se,s,se,se,se,nw,nw,ne,ne,n,ne,ne,se,se,se,se,se,sw,n,se,n,se,ne,se,se,se,se,ne,ne,se,se,ne,ne,nw,n,se,ne,se,se,se,se,se,se,se,se,sw,se,ne,ne,se,se,se,se,se,se,se,nw,se,se,se,ne,se,se,ne,se,se,se,se,se,se,sw,se,se,s,ne,se,nw,nw,se,se,se,se,nw,se,se,ne,se,se,se,nw,se,nw,se,se,se,se,se,se,se,se,se,se,se,nw,sw,sw,nw,se,se,se,se,s,se,nw,nw,s,se,se,n,sw,se,se,n,se,se,se,se,n,se,se,se,s,se,n,se,s,se,n,s,n,sw,nw,se,se,se,se,se,se,se,n,se,ne,se,se,sw,se,se,n,se,s,n,se,se,se,se,se,se,se,se,s,se,se,sw,s,se,se,se,nw,se,se,s,s,se,s,se,se,se,se,se,nw,se,sw,sw,n,se,s,se,se,se,se,n,se,ne,se,se,se,sw,s,se,s,se,se,s,se,se,se,s,se,se,s,s,se,n,s,se,nw,se,se,s,s,se,se,se,se,s,se,se,se,se,s,se,ne,s,sw,s,se,se,s,s,nw,s,se,se,sw,se,n,n,s,se,se,se,s,sw,se,se,s,s,s,s,se,n,se,s,s,s,se,s,nw,s,s,se,s,se,s,s,sw,se,se,s,ne,se,se,s,se,s,sw,s,s,s,s,se,se,s,n,n,se,s,se,se,n,ne,s,s,s,s,s,s,se,n,s,s,se,nw,ne,s,se,nw,se,se,s,s,se,s,se,sw,s,se,se,s,se,s,s,s,n,s,se,n,se,n,s,s,se,sw,se,s,s,s,s,ne,s,se,sw,s,s,s,se,s,ne,s,s,sw,se,s,se,se,s,n,s,s,s,s,sw,s,s,s,ne,s,se,sw,se,s,s,ne,s,se,s,se,se,nw,s,s,s,s,s,se,s,s,s,ne,s,ne,s,s,s,s,s,s,s,s,s,s,s,ne,s,nw,s,s,s,s,n,s,s,s,ne,sw,s,s,s,s,s,s,s,ne,s,s,s,nw,s,s,se,s,s,se,sw,s,s,s,n,s,s,s,s,s,s,s,s,s,s,nw,s,s,s,s,s,s,nw,s,s,s,s,s,se,nw,s,n,s,s,s,s,s,s,s,s,nw,se,s,s,s,s,s,s,s,s,s,s,s,s,s,se,n,s,s,n,sw,sw,ne,s,sw,nw,s,s,s,sw,s,s,s,s,s,ne,sw,s,s,s,s,s,s,s,sw,s,s,ne,s,s,s,s,s,s,nw,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,sw,sw,se,s,sw,s,s,nw,s,sw,s,sw,s,s,nw,n,sw,s,s,sw,se,s,s,s,s,se,sw,s,nw,s,ne,s,n,s,s,se,sw,sw,s,s,sw,s,s,s,se,s,s,s,ne,ne,sw,s,sw,s,s,s,s,s,s,sw,s,s,s,s,s,s,s,sw,sw,s,s,s,s,s,s,sw,s,s,s,se,sw,s,s,nw,s,s,sw,s,s,sw,ne,s,sw,sw,nw,s,s,s,sw,s,s,ne,sw,s,s,s,s,s,s,s,sw,s,s,sw,s,sw,s,s,sw,sw,sw,s,s,se,ne,se,s,s,ne,sw,s,sw,sw,s,sw,se,se,sw,s,s,s,sw,s,s,n,s,n,sw,sw,sw,s,n,se,sw,s,s,s,s,ne,s,sw,s,sw,n,s,s,s,s,s,s,s,s,s,s,s,s,s,sw,n,sw,s,ne,s,sw,sw,s,sw,s,s,sw,s,s,s,s,se,s,sw,s,s,sw,s,n,s,sw,s,s,sw,s,s,s,sw,sw,sw,s,nw,s,sw,sw,sw,s,s,s,sw,sw,sw,nw,sw,nw,nw,sw,sw,sw,nw,sw,sw,sw,s,s,sw,s,sw,s,s,sw,s,sw,sw,nw,sw,sw,ne,nw,nw,s,n,sw,n,s,s,s,sw,sw,sw,s,sw,sw,sw,sw,s,nw,sw,sw,s,sw,sw,nw,ne,sw,nw,sw,sw,sw,sw,sw,s,s,sw,sw,n,sw,n,sw,sw,sw,sw,se,sw,sw,sw,s,s,ne,sw,sw,nw,sw,s,se,sw,s,sw,sw,sw,se,sw,sw,s,sw,sw,sw,s,sw,sw,sw,nw,sw,sw,sw,sw,sw,sw,sw,nw,s,sw,sw,n,sw,s,s,sw,n,nw,sw,n,sw,sw,sw,n,s,sw,sw,sw,s,sw,sw,sw,s,s,sw,sw,sw,s,s,sw,sw,sw,sw,se,sw,sw,nw,sw,se,sw,sw,n,n,sw,s,sw,sw,sw,s,sw,sw,sw,sw,s,sw,sw,sw,ne,sw,sw,nw,nw,sw,sw,n,sw,sw,sw,sw,s,sw,sw,n,sw,sw,s,nw,sw,sw,sw,s,sw,sw,sw,sw,n,sw,sw,s,sw,sw,sw,sw,sw,sw,s,sw,sw,sw,ne,s,sw,sw,n,sw,sw,sw,sw,nw,sw,sw,sw,sw,sw,n,sw,nw,s,sw,sw,sw,sw,sw,ne,ne,sw,sw,sw,sw,sw,sw,sw,sw,ne,sw,sw,sw,sw,sw,s,nw,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,s,sw,ne,se,sw,n,sw,s,sw,ne,sw,s,sw,s,sw,nw,nw,sw,n,se,ne,sw,sw,sw,sw,sw,sw,n,sw,sw,sw,sw,sw,s,nw,sw,sw,nw,sw,sw,sw,se,sw,n,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,sw,s,sw,sw,s,sw,ne,ne,sw,sw,se,sw,nw,sw,nw,n,sw,sw,sw,s,sw,sw,sw,sw,sw,sw,sw,sw,n,s,sw,ne,sw,ne,sw,se,n,nw,nw,sw,sw,sw,sw,sw,s,ne,sw,se,sw,sw,sw,sw,sw,sw,ne,nw,se,sw,sw,sw,sw,sw,nw,nw,ne,nw,nw,s,sw,nw,sw,sw,ne,sw,ne,sw,nw,se,nw,n,sw,nw,sw,sw,sw,sw,sw,sw,nw,sw,nw,sw,sw,sw,se,sw,s,sw,sw,sw,sw,sw,sw,sw,sw,se,s,nw,nw,nw,s,n,sw,sw,sw,nw,sw,n,sw,n,s,nw,s,sw,sw,sw,sw,sw,sw,sw,sw,nw,sw,sw,sw,sw,sw,nw,sw,sw,sw,sw,sw,sw,nw,nw,sw,se,se,s,ne,sw,nw,sw,sw,nw,sw,sw,sw,ne,nw,sw,nw,sw,sw,sw,nw,sw,nw,sw,n,nw,ne,sw,sw,nw,sw,sw,sw,s,sw,nw,nw,nw,nw,nw,se,sw,sw,se,nw,se,nw,nw,n,sw,sw,sw,sw,nw,sw,nw,s,nw,sw,sw,nw,se,s,nw,sw,nw,nw,s,sw,sw,n,se,nw,sw,sw,nw,sw,sw,sw,sw,nw,nw,sw,sw,sw,sw,nw,nw,sw,sw,sw,sw,se,sw,nw,sw,sw,sw,nw,nw,se,sw,sw,nw,sw,ne,nw,sw,sw,sw,sw,sw,s,nw,sw,sw,nw,nw,sw,ne,nw,sw,sw,sw,sw,ne,s,nw,sw,sw,sw,nw,n,sw,nw,nw,nw,nw,nw,sw,sw,sw,ne,nw,sw,n,nw,sw,se,sw,sw,nw,nw,n,sw,nw,sw,nw,s,nw,sw,nw,nw,nw,n,nw,sw,s,nw,nw,s,nw,nw,sw,n,se,ne,n,sw,sw,sw,n,sw,sw,sw,s,nw,s,se,sw,sw,sw,ne,sw,sw,nw,sw,n,n,sw,n,nw,sw,s,ne,sw,sw,sw,sw,nw,sw,nw,sw,nw,sw,nw,nw,nw,sw,sw,nw,ne,sw,nw,s,nw,sw,sw,sw,sw,sw,nw,sw,sw,sw,nw,sw,nw,n,nw,sw,sw,nw,nw,nw,sw,sw,se,nw,ne,sw,sw,nw,nw,sw,sw,sw,s,s,sw,sw,ne,s,nw,ne,nw,se,nw,nw,nw,nw,se,sw,nw,sw,nw,nw,sw,sw,nw,sw,sw,sw,nw,sw,nw,nw,nw,sw,se,se,nw,nw,sw,nw,nw,nw,nw,s,sw,sw,nw,s,se,sw,nw,n,nw,sw,nw,se,sw,nw,nw,se,nw,nw,nw,nw,nw,sw,n,nw,ne,n,nw,sw,sw,sw,ne,ne,sw,nw,sw,nw,nw,nw,sw,nw,se,sw,nw,sw,nw,sw,nw,sw,nw,s,nw,se,nw,nw,nw,nw,nw,nw,n,nw,nw,sw,s,se,ne,n,sw,se,s,sw,nw,nw,se,nw,nw,sw,nw,nw,sw,sw,se,nw,sw,n,sw,sw,nw,nw,nw,nw,nw,nw,nw,sw,nw,nw,sw,nw,nw,nw,ne,nw,sw,se,sw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,s,nw,nw,nw,nw,nw,nw,nw,sw,sw,nw,nw,nw,nw,nw,nw,nw,sw,sw,n,nw,sw,nw,nw,nw,nw,nw,nw,sw,nw,nw,ne,nw,s,nw,sw,nw,nw,nw,ne,nw,sw,sw,nw,se,nw,sw,nw,nw,nw,nw,n,nw,nw,sw,nw,nw,nw,nw,sw,nw,nw,nw,nw,nw,n,nw,nw,n,s,nw,nw,nw,sw,nw,nw,se,nw,nw,nw,nw,nw,nw,nw,nw,sw,nw,nw,nw,nw,nw,nw,nw,nw,sw,n,nw,nw,nw,nw,nw,nw,nw,nw,s,nw,nw,sw,nw,nw,nw,nw,nw,s,nw,s,nw,sw,nw,sw,sw,sw,sw,se,nw,s,sw,nw,nw,se,s,nw,sw,sw,nw,nw,nw,nw,nw,nw,nw,nw,nw,ne,se,n,nw,nw,nw,nw,nw,nw,nw,nw,s,se,ne,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,nw,se,nw,se,nw,sw,nw,nw,nw,ne,nw,nw,nw,nw,nw`;