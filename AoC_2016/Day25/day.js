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
function runInst(inst, i, regs, insts, out) {
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
					i = i + parseInt(inst[2],10) - 1;
				}
			} else if (parseInt(inst[1],10) != 0 ) {
				if (inst[2] in regs) {
					i = i + regs[inst[2]] - 1;
				} else {
					i = i + parseInt(inst[2],10) - 1;
				}
			}
			break;
		case 'tgl':
			insts = tglInst(insts, i + parseInt(regs[inst[1]], 10));
			break;
		case 'out':
			if (inst[1] in regs) {
				if (out[out.length-1] != regs[inst[1]]) {
					out.push(regs[inst[1]]);
				} else {
					i = insts.length;
				}
			} else {
				if (out[out.length-1] != inst[1]) {
					out.push(nst[1]);
				} else {
					i = insts.length;
				}
			}
			break;
		default:
			console.log('whoops');
			break;
	}
	return [i+1,out];
}

//	0:11:22
function func1(strs) {
	strs = strs.map( (line) => line.split(" "));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var ainit = -1;
	var regs = {'a': 0,'b': 0,'c': 0,'d': 0};
	var out = [1];
	while (out.length < 100) {
		out = [1];
		ainit++;
		regs['a'] = ainit;
		regs['b'] = 0;
		regs['c'] = 0;
		regs['d'] = 0;
		var idx = 0;
		
		while (idx < strs.length) {
			[idx, out] = runInst(strs[idx], idx, regs, strs, out)
			if (out.length >= 100) {
				break;
			}
		}
	}
	
	return ainit;
}

//	
function func2(strs) {
	strs = strs.map( (line) => line);//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	return 0;
}

var input = `cpy a d
cpy 7 c
cpy 362 b
inc d
dec b
jnz b -2
dec c
jnz c -5
cpy d a
jnz 0 0
cpy a b
cpy 0 a
cpy 2 c
jnz b 2
jnz 1 6
dec b
dec c
jnz c -4
inc a
jnz 1 -7
cpy 2 b
jnz c 2
jnz 1 4
dec b
dec c
jnz 1 -4
jnz 0 0
out b
jnz a -19
jnz 1 -21`;