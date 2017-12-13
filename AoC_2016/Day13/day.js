/* 
	buildJSON = function(entries, key, keys, values)
	permute = function(a)
	permuteStr = function(s)
	combine = function(a, min, max)
	combineStr = function(s, min, max)
	transpose = function(matrix)
	OPTIONAL: findHash = function(k, t, l)
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

function countBits(input) {
	var bts = 0;
	while (input > 0) { 
		bts += input & 0x01
		input = input >>> 1;
	}
	return bts;
}

function buildMaze() {
	var maze = new Array(100);
	for (var y = 0; y < 100; y++) {
		maze[y] = new Array(100);
		for (var x = 0; x < 100; x++) {
			var ws = x*x + 3*x + 2*x*y + y + y*y + 1358;
			var bits = countBits(ws);
			if (bits % 2 == 0) {
				maze[y][x] = open;
			} else {
				maze[y][x] = wall;
			}
		}
	}
	
	return new Graph(maze);
}
//	
function func1(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var mz = buildMaze();
	var start = mz.grid[1][1];
	var end = mz.grid[39][31];
	
	var path = astar.search(mz, start, end);
	
	return path.length;
}

//	
function func2(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var mz = buildMaze();
	var start = mz.grid[1][1];
	var end = mz.grid[99][99];
	
	var path = breadth_first.search(mz, start, end);
	
	var vsts50 = mz.grid.reduce( (tot,x) => tot += x.filter( xy => xy.g <= 50 && xy.closed == true ).length, 0);
	
	return vsts50;
}

var open = 1;
var wall = 0;
var input = ``;