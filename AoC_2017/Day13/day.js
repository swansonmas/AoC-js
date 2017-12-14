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



//	
function func1(strs) {
	strs = strs.map( (line) => line.split(": ").map( n => parseInt(n, 10)));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);

	var pcs = 0;
	var cost = 1;
	cost = 0;
	strs.map( d => {
		pcs = d[0];
		if ( pcs %  ((2*d[1])-2) == 0) {
			cost = cost + (d[0]*d[1]);
		}
	});
	
	return cost;
}

//	
function func2(strs) {
	strs = strs.map( (line) => line.split(": ").map( n => parseInt(n, 10)));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);

	var pcs = 0;
	var cost = 1;
	var dly = -1;
	while (cost > 0) {
		cost = 0;
		dly++;
		strs.map( d => {
			pcs = d[0] + dly;
			if ( pcs %  ((2*d[1])-2) == 0) {
				cost++;
			}
		});
	}
	
	return dly;
}
var input1 = `0: 3
1: 2
4: 4
6: 4`;
var input = `0: 5
1: 2
2: 3
4: 4
6: 6
8: 4
10: 8
12: 6
14: 6
16: 8
18: 6
20: 9
22: 8
24: 10
26: 8
28: 8
30: 12
32: 8
34: 12
36: 10
38: 12
40: 12
42: 12
44: 12
46: 12
48: 14
50: 12
52: 14
54: 12
56: 14
58: 12
60: 14
62: 14
64: 14
66: 14
68: 14
70: 14
72: 14
76: 14
80: 18
84: 14
90: 18
92: 17`;