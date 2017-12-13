/* 
	buildJSON = function(entries, key, keys, values)
	permute = function(a)
	permuteStr = function(s)
	combine = function(a, min, max)
	combineStr = function(s, min, max)
	transpose = function(matrix)
	OPTIONAL: findHash = function(key, t, l)
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
	/*
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	*/
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}


var findHash = function(k, n, t) {
	var f = '',
		s = '',
		h = '';
	s = k + n;
	h = md5(s);
	return [t.exec(h),n];
}

//	1:09:03
function func1(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var offset = 0;
	var three;// = findHash(input, offset, /(\d)\1{2}/);
	var five = new Map();
	var fvinit = new Array(1000);
	fvinit.fill(false);
	fvinit = fvinit.map( (_,i) => findHash(input, offset + i, /([\d\w])\1{4}/g) ).filter( hsh => hsh[0] != null );
	fvinit.map( fv => {
		if (fv[0][1] in five) {
			five[fv[0][1]] = fv[1];
		} else {
			five.set(fv[0][1],fv[1]);
		}
	});
	
	var found = 0;
	while(found < 64)	{
		//console.log(five.size);
		offset++;
		var fv = findHash(input, offset + 1000, /([\d\w])\1{4}/g);
		if (fv[0] != null) {
			if (fv[0][1] in five) {
				five[fv[0][1]] = fv[1];
			} else {
				five.set(fv[0][1],fv[1]);
			}
		}
		if((three = findHash(input, offset, /([\d\w])\1{2}/)[0]) != null) {
			if (five.get(three[1]) <= offset+1000 && five.get(three[1]) > offset) {
				found++;
			}
		}
	}
	
	return offset;
}

var findHashStretch = function(k, n, t) {
	var f = '',
		s = '',
		h = '';
	s = k + n;
	h = md5(s);
	for (var i = 0; i < 2016; i++) {
		h = md5(h);
	}
	return [t.exec(h),n];
}

//	1:22:02
function func2(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var offset = 0;
	var three;// = findHash(input, offset, /(\d)\1{2}/);
	var five = new Map();
	var fvinit = new Array(1000);
	fvinit.fill(false);
	fvinit = fvinit.map( (_,i) => findHashStretch(input, offset + i, /([\d\w])\1{4}/g) ).filter( hsh => hsh[0] != null );
	fvinit.map( fv => {
		if (fv[0][1] in five) {
			five[fv[0][1]] = fv[1];
		} else {
			five.set(fv[0][1],fv[1]);
		}
	});
	
	var found = 0;
	while(found < 64)	{
		//console.log(five.size);
		offset++;
		var fv = findHashStretch(input, offset + 1000, /([\d\w])\1{4}/g);
		if (fv[0] != null) {
			if (fv[0][1] in five) {
				five[fv[0][1]] = fv[1];
			} else {
				five.set(fv[0][1],fv[1]);
			}
		}
		if((three = findHashStretch(input, offset, /([\d\w])\1{2}/)[0]) != null) {
			if (five.get(three[1]) <= offset+1000 && five.get(three[1]) > offset) {
				found++;
				console.log('Found: ' + found);
			}
		}
	}
	
	return offset;
}

var input2 = `abc`;
var input = `jlmsuwbz`;