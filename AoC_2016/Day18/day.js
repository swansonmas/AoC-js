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

function checkTile(prevRow, index) {
	if ((prevRow[index-1] == unsafe && prevRow[index] == unsafe && prevRow[index+1] == safe) ||
			(prevRow[index-1] == safe && prevRow[index] == unsafe && prevRow[index+1] == unsafe) ||
			(prevRow[index-1] == unsafe && prevRow[index] == safe && prevRow[index+1] == safe) ||
			(prevRow[index-1] == safe && prevRow[index] == safe && prevRow[index+1] == unsafe)) {
		return unsafe;
	} else {
		return safe;
	}
}

function buildRow(lastRow) {
	var w = lastRow.length + 2;
	var nwRw = new Array(w);
	nwRw[0] = safe;
	nwRw[w-1] = safe;
	var olRw = [safe,...lastRow,safe];
	lastRow.map( (_,tl) => {
		nwRw[tl+1] = checkTile(olRw, tl+1);
	});
	return nwRw.slice(1,w-1);
}

//	0:23:23
function func1(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	var width = strs[0].length + 2;
	console.log(strs);
	
	console.log(buildRow(input.split("")));
	var rows = input.split("");
	var safes = rows.filter( t => t == safe ).length;
	
	for (var i = 0; i < 40-1; i++) {
		rows = buildRow(rows);
		safes += rows.filter( t => t == safe ).length;
	}
	
	return safes;
}

//	0:25:42
function func2(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	var width = strs[0].length + 2;
	console.log(strs);
	
	console.log(buildRow(input.split("")));
	var rows = input.split("");
	var safes = rows.filter( t => t == safe ).length;
	
	for (var i = 0; i < 400000-1; i++) {
		rows = buildRow(rows);
		safes += rows.filter( t => t == safe ).length;
	}
	
	return safes;
}

var safe = '.';
var unsafe = '^';
var input1 = `.^^.^.^^^^`;
var input = `^^^^......^...^..^....^^^.^^^.^.^^^^^^..^...^^...^^^.^^....^..^^^.^.^^...^.^...^^.^^^.^^^^.^^.^..^.^`;