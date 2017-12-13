/* 
	buildJSON = function(entries, key, keys, values)
	permute = function(a)
	permuteStr = function(s)
	combine = function(a, min, max)
	combineStr = function(s, min, max)
	transpose = function(matrix)
	OPTIONAL: findHash = function(key, target, length)
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

/*
	var i = 0;
	var skip = 0;
	var lgs = [165,1,255,31,87,52,24,113,0,91,148,254,158,2,73,153];//[3, 4, 1, 5];
	for (var lg of lgs) {
		var sublist;
		if (lg + i >= str.length) {
			sublist = str.slice(i).concat(str.slice(0,(lg+i)%str.length));
			sublist = sublist.reverse();
			str = sublist.slice(0-((lg+i)%str.length)).concat(str.slice((lg+i)%str.length,(lg+i)%str.length+(str.length-lg)),sublist.slice(0,sublist.length-((lg+i)%str.length)));
		} else {
			sublist = str.slice(i,lg+i);
			sublist = sublist.reverse();
			str = str.slice(0,i).concat(sublist,str.slice(lg+i));
		}
		i += lg + skip;
		i = i%str.length;
		skip++
	}
	console.log(str);
*/

//	
function func1(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var str = new Array(256);//5);
	str = str.fill(1);
	str = str.map( (_,s) => s );
	
	var lgths = [165,1,255,31,87,52,24,113,0,91,148,254,158,2,73,153];//[3,4,1,5];
	
	str = hashRounds(str, lgths, 1);
	
	return str[0]*str[1];
}

//	
function func2(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var ascii = strs[0].split("").map( ch => ch.charCodeAt(0) ).concat(asciiExtend);
	
	var str = new Array(256);
	str = str.fill(1);
	str = str.map( (_,s) => s );
	
	var lgths = ascii;
	
	str = hashRounds(str, lgths, 64);
	str = dense(str);
	str = knotString(str);
	
	return str;
}

var asciiExtend = [17, 31, 73, 47, 23];
var input = `165,1,255,31,87,52,24,113,0,91,148,254,158,2,73,153`;