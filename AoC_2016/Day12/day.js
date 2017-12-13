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

function runInst(inst, i, regs) {
	switch(inst[0]) {
		case 'cpy':
			if (inst[1] in regs) {
				regs[inst[2]] = regs[inst[1]];
			} else {
				regs[inst[2]] = parseInt(inst[1],10)
			}
			break;
		case 'inc':
			regs[inst[1]]++;
			break;
		case 'dec':
			regs[inst[1]]--;
			break;
		case 'jnz':
			if (regs[inst[1]] != 0) {
				return i + parseInt(inst[2],10);
			}
			break;
		default:
			console.log('whoops');
			break;
	}
	return i+1;
}

//	0:20:35
function func1(strs) {
	strs = strs.map( (line) => line.split(" "));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var regs = {'a': 0,'b': 0,'c': 0,'d': 0};
	
	var idx = 0;
	while (idx < strs.length) {
		idx = runInst(strs[idx], idx, regs);
	}
	
	return regs['a'];
}

//	0:21:19
function func2(strs) {
	strs = strs.map( (line) => line.split(" "));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var regs = {'a': 0,'b': 0,'c': 1,'d': 0};
	
	var idx = 0;
	while (idx < strs.length) {
		idx = runInst(strs[idx], idx, regs);
	}
	
	return regs['a'];
}

var input1 = `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`;
var input = `cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 16 c
cpy 12 d
inc a
dec d
jnz d -2
dec c
jnz c -5`;