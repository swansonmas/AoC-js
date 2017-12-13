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
	var lines = input.split(", ");
	
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}

var compass = {
	'NORTH': ['EAST','WEST',1,0],
	'SOUTH': ['WEST','EAST',-1,0],
	'WEST': ['NORTH','SOUTH',0,-1],
	'EAST': ['SOUTH','NORTH',0,1]
}
//	0:11:36
function func1(strs) {
	strs = strs.map( (line) => line.split(/(L|R)/g));//parseInt(line, 10));// line.split(" "));
	console.log(strs);
	
	var coords = [0,0];
	var dir = 'NORTH';
	strs.map( (dirs) => {
		if (dirs[1] == 'R') {
			dir = compass[dir][0];
		} else {
			dir = compass[dir][1];
		}
		coords [0] += compass[dir][2] * parseInt(dirs[2], 10);
		coords [1] += compass[dir][3] * parseInt(dirs[2], 10);
	});
	return Math.abs(coords[0]) + Math.abs(coords[1]);
}
//	0:25:40
function func2(strs) {
	strs = strs.map( (line) => line.split(/(L|R)/g));//parseInt(line, 10));// line.split(" "));
	console.log(strs);
	
	var coords = [0,0];
	var dir = 'NORTH';
	var vsts = new Map();
	var fnl = [0,0];
	var found = false;
	strs.map( (dirs) => {
		if (dirs[1] == 'R') {
			dir = compass[dir][0];
		} else {
			dir = compass[dir][1];
		}
		for (var stps = 0; stps < parseInt(dirs[2], 10); stps++) {
			coords [0] += compass[dir][2];
			coords [1] += compass[dir][3];
			if (!found && vsts.has(''+coords[0]+','+coords[1])) { found = true; fnl[0] = coords[0]; fnl[1] = coords[1]; }
			else { vsts.set(''+coords[0]+','+coords[1],0);}
		}
	});
	console.log(vsts);
	return Math.abs(fnl[0]) + Math.abs(fnl[1]);
}

var input1 = `R8, R4, R4, R8`;
var input = `L3, R2, L5, R1, L1, L2, L2, R1, R5, R1, L1, L2, R2, R4, L4, L3, L3, R5, L1, R3, L5, L2, R4, L5, R4, R2, L2, L1, R1, L3, L3, R2, R1, L4, L1, L1, R4, R5, R1, L2, L1, R188, R4, L3, R54, L4, R4, R74, R2, L4, R185, R1, R3, R5, L2, L3, R1, L1, L3, R3, R2, L3, L4, R1, L3, L5, L2, R2, L1, R2, R1, L4, R5, R4, L5, L5, L4, R5, R4, L5, L3, R4, R1, L5, L4, L3, R5, L5, L2, L4, R4, R4, R2, L1, L3, L2, R5, R4, L5, R1, R2, R5, L2, R4, R5, L2, L3, R3, L4, R3, L2, R1, R4, L5, R1, L5, L3, R4, L2, L2, L5, L5, R5, R2, L5, R1, L3, L2, L2, R3, L3, L4, R2, R3, L1, R2, L5, L3, R4, L4, R4, R3, L3, R1, L3, R5, L5, R1, R5, R3, L1`;