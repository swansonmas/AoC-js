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

var plySound = undefined;
var rcvSound = undefined;
function runInst(inst, i, regs) {
	if (!(inst[1] in regs)) {
		regs[inst[1]] = 0;
	}
	
	switch(inst[0]) {
		case 'snd':
			plySound = regs[inst[1]];
			break;
		case 'set':
			if (inst[2] in regs) {
				regs[inst[1]] = regs[inst[2]];
			} else {
				regs[inst[1]] = parseInt(inst[2],10);
			}
			break;
		case 'add':
			if (inst[2] in regs) {
				regs[inst[1]] += regs[inst[2]];
			} else {
				regs[inst[1]] += parseInt(inst[2],10);
			}
			break;
		case 'mul':
			if (inst[2] in regs) {
				regs[inst[1]] *= regs[inst[2]];
			} else {
				regs[inst[1]] *= parseInt(inst[2],10);
			}
			break;
		case 'mod':
			if (inst[2] in regs) {
				regs[inst[1]] = regs[inst[1]] % regs[inst[2]];
			} else {
				regs[inst[1]] = regs[inst[1]] % parseInt(inst[2],10);
			}
			break;
		case 'rcv':
			var xVal;
			if (inst[1] in regs) {
				xVal = regs[inst[1]];
			} else {
				xVal = parseInt(inst[1],10);
			}
			if (xVal != 0) {
				rcvSound = plySound;
				return -1;
			}
			break;
		case 'jgz':
			if (regs[inst[1]] > 0) {
				if (inst[2] in regs) {
					return i+regs[inst[2]];
				} else {
					return i+parseInt(inst[2],10);
			}}
			break;
		default:
			console.log('whoops' + inst[0]);
			break;
	}
	return i+1;
}

function runProcInst(inst, i, regs, sndRegs) {
	if (!(inst[1] in regs) && parseInt(inst[1],10) == NaN) {
		regs[inst[1]] = 0;
	}
	
	switch(inst[0]) {
		case 'snd':
			sndRegs['rcvQ'].push(regs[inst[1]]);
			sndRegs['state'] = 1;
			regs['snt'] += 1;
			break;
		case 'set':
			if (inst[2] in regs) {
				regs[inst[1]] = regs[inst[2]];
			} else {
				regs[inst[1]] = parseInt(inst[2],10);
			}
			break;
		case 'add':
			if (inst[2] in regs) {
				regs[inst[1]] += regs[inst[2]];
			} else {
				regs[inst[1]] += parseInt(inst[2],10);
			}
			break;
		case 'mul':
			if (inst[2] in regs) {
				regs[inst[1]] *= regs[inst[2]];
			} else {
				regs[inst[1]] *= parseInt(inst[2],10);
			}
			break;
		case 'mod':
			if (inst[2] in regs) {
				regs[inst[1]] = regs[inst[1]] % regs[inst[2]];
			} else {
				regs[inst[1]] = regs[inst[1]] % parseInt(inst[2],10);
			}
			break;
		case 'rcv':
			if (regs['rcvQ'].length > 0) {
				regs[inst[1]] = regs['rcvQ'].shift();
			} else {
				regs['state'] = 0;
				return i;
			}
			break;
		case 'jgz':
			if (inst[1] in regs) {
				if (regs[inst[1]] > 0) {
					if (inst[2] in regs) {
						return i+regs[inst[2]];
					} else {
						return i+parseInt(inst[2],10);
					}
				}
			} else {
				if (parseInt(inst[1],10) > 0) {
					if (inst[2] in regs) {
						return i+regs[inst[2]];
					} else {
						return i+parseInt(inst[2],10);
					}
				}
			}
			break;
		default:
			console.log('whoops' + inst[0]);
			break;
	}
	return i+1;
}

//	0:26:28
function func1(strs) {
	strs = strs.map( (line) => line.split(" ") );//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var regs = {};
	var idx = 0;
	while (idx < strs.length && idx >= 0) {
		idx = runInst(strs[idx], idx, regs);
	}
	
	return rcvSound;
}

//	1:11:16
function func2(strs) {
	strs = strs.map( (line) => line.split(" ") );//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	var regs0 = {p: 0, state: 1, idx: 0, rcvQ: [], snt: 0};
	var regs1 = {p: 1, state: 1, idx: 0, rcvQ: [], snt: 0};
	var idx = 0;
	while (!(regs0['state'] == 0 && regs1['state'] == 0)) {
		if (regs0['state'] == 1) {
			regs0['idx'] = runProcInst(strs[regs0['idx']], regs0['idx'], regs0, regs1);
		}
		if (regs1['state'] == 1) {
			regs1['idx'] = runProcInst(strs[regs1['idx']], regs1['idx'], regs1, regs0);
		}
	}
	
	return regs1['snt'];
}

var input1 = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;
var input2 = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;
var input = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 680
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`;