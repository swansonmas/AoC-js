/* 
	permute = function(a)
	permuteStr = function(s)
	combine = function(a, min, max)
	combineStr = function(s, min, max)
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

function codeCount(row, col) {
	var cnt = 0;
	for (var ci = 0; ci < (row + col - 2); ci++) {
		cnt += (ci+1);
	}
	cnt += col;
	return cnt;
}

function nextCode(prevCode) {
	var newCode = prevCode * 252533;
	return newCode % 33554393;
}

function getCode(row, col) {
	var cde = 20151125;
	var cnt = codeCount(row,col);
	for (var i = 1; i < cnt; i++)
	{
		cde = nextCode(cde);
	}
	return cde;
}

function func1(strs) {
	strs = strs.map( (line) => line);//parseInt(line, 10));// line.split(" "));
	console.log(strs);
	
	return getCode(2978,3083);
}

function func2(strs) {
	strs = strs.map( (line) => line);//parseInt(line, 10));// line.split(" "));
	console.log(strs);
	
	return 0;
}

var input = ``;