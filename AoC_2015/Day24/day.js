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



function func1(strs) {
	strs = strs.map( (line) => parseInt(line, 10));// line.split(" "));
	var third = strs.reduce( (a, b) => a + b) / 3;
	console.log(third);
	// [cab,s1,s2]
	var pkgs = [];
	var cab;
	for (var i = 1; i < strs.length; i++) {
		cab = combine(strs, i, i);
		cab = cab.filter( cbn => (cbn.reduce( (a,b) => a + b) == third));
		cab.sort( (a,b) => a.length - b.length);
		if (cab.length > 0) { break; }
	}
	var qe = Infinity;
	cab.map( cbn => {
		var cqe = cbn.reduce( (tot,pkg) => tot * pkg,1)
		if (cqe < qe) { qe = cqe; }
	});
	return qe;
}

function func2(strs) {
	strs = strs.map( (line) => parseInt(line, 10));// line.split(" "));
	var fourth = strs.reduce( (a, b) => a + b) / 4;
	console.log(fourth);
	// [cab,s1,s2,t]
	var pkgs = [];
	var cab;
	for (var i = 1; i < strs.length; i++) {
		cab = combine(strs, i, i);
		cab = cab.filter( cbn => (cbn.reduce( (a,b) => a + b) == fourth));
		cab.sort( (a,b) => a.length - b.length);
		if (cab.length > 0) { break; }
	}
	
	var qe = Infinity;
	cab.map( cbn => {
		var cqe = cbn.reduce( (tot,pkg) => tot * pkg,1)
		if (cqe < qe) { qe = cqe; }
	});
	return qe;
}
var groups = 3;
var input1 = [1,2,3,4,5,7,8,9,10,11];
var input = `1
3
5
11
13
17
19
23
29
31
41
43
47
53
59
61
67
71
73
79
83
89
97
101
103
107
109
113`;