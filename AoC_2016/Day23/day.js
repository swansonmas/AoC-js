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

function tglInst(insts, i) {
	if ( i < insts.length) {
		switch(insts[i][0]) {
			case 'cpy':
				insts[i] = ['jnz', insts[i][1], insts[i][2]];
				break;
			case 'inc':
				insts[i] = ['dec', insts[i][1]];
				break;
			case 'dec':
				insts[i] = ['inc', insts[i][1]];
				break;
			case 'jnz':
				insts[i] = ['cpy', insts[i][1], insts[i][2]];
				break;
			case 'tgl':
				insts[i] = ['inc', insts[i][1]];
				break;
			default:
				console.log('whoops');
				break;
		}
	}
	return insts;
}

function runInst(inst, i, regs, insts) {
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
			if (inst[1] in regs) {
				if (regs[inst[1]] != 0) {
					return i + parseInt(inst[2],10);
				}
			} else if (parseInt(inst[1],10) != 0 ) {
				if (inst[2] in regs) {
					return i + regs[inst[2]];
				} else {
					return i + parseInt(inst[2],10);
				}
			}
			break;
		case 'tgl':
			insts = tglInst(insts, i + parseInt(regs[inst[1]], 10));
			break;
		default:
			console.log('whoops');
			break;
	}
	return i+1;
}

//	0:24:32
function func1(strs) {
	strs = strs.map( (line) => line.split(" "));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var regs = {'a': 7,'b': 0,'c': 0,'d': 0};
	
	var idx = 0;
	while (idx < strs.length) {
		idx = runInst(strs[idx], idx, regs, strs);
	}
	
	return regs['a'];
}

//	0:40:00
function func2(strs) {
	strs = strs.map( (line) => line.split(" "));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var regs = {'a': 12,'b': 0,'c': 0,'d': 0};
	
	var idx = 0;
	while (idx < strs.length) {
		idx = runInst(strs[idx], idx, regs, strs);
	}
	
	return regs['a'];
}

var input1 = `cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`;
var input = `cpy a b
dec b
cpy a d
cpy 0 a
cpy b c
inc a
dec c
jnz c -2
dec d
jnz d -5
dec b
cpy b c
cpy c d
dec d
inc c
jnz d -2
tgl c
cpy -16 c
jnz 1 c
cpy 99 c
jnz 77 d
inc a
inc d
jnz d -2
inc c
jnz c -5`;