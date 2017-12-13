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

function updateWalls(cell) {
	var path = cell[0];
	var loc = cell[1];
	var drs = md5(input + path).slice(0,4).split("");
	var nwPth = [];
	drs.map( (dr,i) => {
		if (dr in open) {
			var nwLoc = loc.map( l => l);
			nwLoc[0] = loc[0] + delta[i][0];
			nwLoc[1] = loc[1] + delta[i][1];
			if (nwLoc[0] >= 0 && nwLoc[0] < v && nwLoc[1] >= 0 && nwLoc[1] < v) {
				if (nwLoc[0] == v-1 && nwLoc[1] == v-1) {
					nwPth = path + dir[i];
				} else {
					nwPth.push([path + dir[i], nwLoc]);
				}
			}
		}
	});
	
	return nwPth;
}

function updateWallsLength(cell) {
	var path = cell[0];
	var loc = cell[1];
	var drs = md5(input + path).slice(0,4).split("");
	var nwPth = [];
	drs.map( (dr,i) => {
		if (dr in open) {
			var nwLoc = loc.map( l => l);
			nwLoc[0] = loc[0] + delta[i][0];
			nwLoc[1] = loc[1] + delta[i][1];
			if (nwLoc[0] >= 0 && nwLoc[0] < v && nwLoc[1] >= 0 && nwLoc[1] < v) {
				if (nwLoc[0] == v-1 && nwLoc[1] == v-1) {
					nwPth.push(path.length+1);
				} else {
					nwPth.push([path + dir[i], nwLoc]);
				}
			}
		}
	});
	
	return nwPth;
}

//	0:37:59
function func1(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var pths = [['',[0,0]]];
	var opts;
	while (pths.length > 0) {
		opts = updateWalls(pths.shift());
		if (typeof opts == 'object') {
			pths = [...pths,...opts];
		} else {
			break;
		}
	}
	
	return opts;
}

//	0:40:05
function func2(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var pths = [['',[0,0]]];
	var opts;
	var maxl = 0;
	while (pths.length > 0) {
		opts = pths.shift();
		if (typeof opts == 'object') {
			opts = updateWallsLength(opts);
			pths = [...pths,...opts];
		} else if (opts > maxl) {
			maxl = opts;
		}
	}
	
	return maxl;
}

var done = false;
var open = {'b':0, 'c':1, 'd':2, 'e':3, 'f':4};
var dir = ['U','D','L','R'];
var delta = [[-1,0],[1,0],[0,-1],[0,1]];
var v = 4;
var input = `vwbaicqe`;