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


function reverse(list, length, position) {
	if (position + length >= list.length) {
		var revStr = list.slice(position,list.length).concat(list.slice(0,length-(list.length-position))).reverse();
		var reStr = list.slice(length-(list.length-position),position);
		var rtn = revStr.slice(list.length-position,length).concat(reStr,revStr.slice(0,list.length-position));
	} else {
		var revStr = list.slice(position, position+length).reverse();
		var rtn = list.slice(0,position).concat(revStr,list.slice(position+length,list.length));
	}
	
	return rtn;
}

function hashRounds(list, lengths, times) {
	var position = 0,
		skip = 0;
	var hsh = list;
	
	for (var rnd = 0; rnd < times; rnd++) {
		lengths.map( l => {
			hsh = reverse(hsh, l, position);
			position = (position + l + skip)%list.length;
			skip++;
		});
	}
	
	return hsh;
}

function dense(hash) {
	var dsh = [];
	for (var i = 0; i < 16; i++) {
		dsh[i] = 0;
		for (var j = 0; j < 16; j++) {
			dsh[i] ^= hash[(i*16)+j];
		}
	}
	
	return dsh;
}

function knotString(denseHash) {
	var str = denseHash.map( dh => {
		var s = dh.toString(16);
		if (s.length <2) {
			s = '0' + s;
		}
		return s;
	});
	
	return str.join("");
}

function diskState(diskInput) {
	var dskRws = diskInput.map( (row,i) => {
		var ascii = row.split("").map( ch => ch.charCodeAt(0) ).concat(asciiExtend);
		
		var str = new Array(256);
		str = str.fill(1);
		str = str.map( (_,s) => s );
		
		var lgths = ascii;
		
		str = hashRounds(str, lgths, 64);
		str = dense(str);
		str = knotString(str);
		
		str = str.split("").map( hex => parseInt(hex, 16).toString(2).padStart(4,'0') );
		return str;
	});
	
	return dskRws;
}

function countUsed(disk) {
	var usdCnt = disk.reduce( (mtot,r) => 
		mtot += r.reduce( (ctot,c) => 
			ctot += c.split("").reduce( (htot,h) => 
				htot += parseInt(h, 10),
			0),
		0),
	0);
	
	return usdCnt;
}

function buildMaze(rows) {
	var maze = new Array(257);
	for (var y = 0; y < 128; y++) {
		maze[y] = new Array(128);
		for (var x = 0; x < 128; x++) {
			maze[y][x] = parseInt(rows[y].charAt(x),10);
		}
	}
	for (var y = 128; y < 257; y++) {
		maze[y] = new Array(128);
		for (var x = 0; x < 128; x++) {
			maze[y][x] = parseInt(0,10);
		}
	}
	
	return new Graph(maze);
}

function findRegions(mz) {
	var rgns = 0;
	for (var y = 0; y < 128; y++) {
		for (var x = 0; x < 128; x++) {
			if (mz.grid[y][x].visited == false && mz.grid[y][x].weight == 1) {
				rgns++;
				var start = mz.grid[y][x]
				var end = mz.grid[256][127]
				var path = breadth_first.search(mz, start, end);
			}
		}
	}
	return rgns;
}

//	
function func1(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	var stri = new Array(128);
	stri = stri.fill(1);
	stri = stri.map( (_,i) => strs[0] + '-' + i);
	
	var dsk = diskState(stri);
	
	var usd = countUsed(dsk);
	
	return usd;
}

//	
function func2(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	var stri = new Array(128);
	stri = stri.fill(1);
	stri = stri.map( (_,i) => strs[0] + '-' + i);
	
	var dsk = diskState(stri);	
	dsk = dsk.map( dr => dr.join("") );
	
	var mz = buildMaze(dsk);
	
	var rgns = findRegions(mz);
	
	return rgns;
}

var asciiExtend = [17, 31, 73, 47, 23];
var input1 = `flqrgnkx`;
var input = `amgozmfv`;