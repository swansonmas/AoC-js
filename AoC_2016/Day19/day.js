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
	/*
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	*/
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}

function removeGroup(group) {
	var rmvd = 0;
	var cnt = group.length;
	for (var i = 0; i < Math.ceil(group.length / 3); i++) {
		group[Math.floor(i+(cnt/2)+rmvd)] = undefined;
		rmvd++;
		cnt--;
	}
	return group.slice(i).concat(group.slice(0,i)).filter( elf => elf != undefined );
}

//	0:12:57
function func1(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	var inputC = 3017957;
	var elfs = new Array(inputC);
	var i = -1;
	var max = 1;
	elfs.fill(1);
	while (max < inputC) {
		i++;
		if (elfs[i%inputC] >= 1) {
			var tmp = 1;
			while(elfs[(i+tmp)%inputC] == 0) {
				tmp++;
			}
			elfs[i%inputC] += elfs[(i+tmp)%inputC];
			elfs[(i+tmp)%inputC] = 0;
			if(elfs[i%inputC] > max) { max = elfs[i%inputC]; }
		}
	}
	return i%inputC+1;
}

//	0:59:55
function func2(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	var inputC = 3017957;
	var elfs = new Array(inputC);
	elfs = elfs.fill(1);
	var i = -1;
	var max = 1;
	elfs = elfs.map( (_,i) => i+1);
	while (elfs.length > 1) {
		elfs = removeGroup(elfs);
	}
	return elfs[0];
}

var input = `5`;