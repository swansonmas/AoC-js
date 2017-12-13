/* 
	permute = function(a)
	permuteStr = function(s)
	combine = function(a, min, max)
	combineStr = function(s, min, max)
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
	var lines = input.split("\n");
	
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}


var functions = {
	'hlf': (function (regs, reg) { regs[reg] = parseInt(regs[reg] / 2); return 1; }),
	'tpl': (function (regs, reg) { regs[reg] = regs[reg] * 3; return 1; }),
	'inc': (function (regs, reg) { regs[reg] = regs[reg] + 1; return 1; }),
	'jmp': (function (regs, offset) { return parseInt(offset.replace("+",""), 10); }),
	'jie': (function (regs, reg, offset) { 
			if (regs[reg.replace(",","")] % 2 == 0) {
				return parseInt(offset.replace("+",""), 10);
			}
			else {
				return 1;
			}
		}),
	'jio': (function (regs, reg, offset) {
			if (regs[reg.replace(",","")] == 1) {
				return parseInt(offset.replace("+",""), 10);
			}
			else {
				return 1;
			}})
}

function func1(strs) {
	strs = strs.map( (line) => line.split(" "));
	console.log(strs);
	var regs = {'a': 0,	'b': 0 };
	
	var i = 0;
	while (i < strs.length) {
		var instr = strs[i];
		if (instr.length == 2) {
			console.log('@i{a,b}: @' + i + '{' + regs['a'] + ',' + regs['b'] + '} ' + instr + ' ' + i);
			i += functions[instr[0]](regs, instr[1]);
		}
		else if (instr.length == 3) {
			console.log('@i{a,b}: @' + i + '{' + regs['a'] + ',' + regs['b'] + '} ' + instr + ' ' + i);
			i += functions[instr[0]](regs, instr[1], instr[2]);
		}
	}
	
	console.log('DONE: @i{a,b}: @' + i + '{' + regs['a'] + ',' + regs['b'] + '} ' + instr + ' ' + i);
	return regs['b'];
}

function func2(strs) {
	strs = strs.map( (line) => line.split(" "));
	console.log(strs);
	var regs = {'a': 1,	'b': 0 };
	
	var i = 0;
	while (i < strs.length) {
		var instr = strs[i];
		if (instr.length == 2) {
			console.log('@i{a,b}: @' + i + '{' + regs['a'] + ',' + regs['b'] + '} ' + instr + ' ' + i);
			i += functions[instr[0]](regs, instr[1]);
		}
		else if (instr.length == 3) {
			console.log('@i{a,b}: @' + i + '{' + regs['a'] + ',' + regs['b'] + '} ' + instr + ' ' + i);
			i += functions[instr[0]](regs, instr[1], instr[2]);
		}
	}
	
	console.log('DONE: @i{a,b}: @' + i + '{' + regs['a'] + ',' + regs['b'] + '} ' + instr + ' ' + i);
	return regs['b'];
}

var input1 = `inc a
jio a, +2
tpl a
inc a`;
var input = `jio a, +22
inc a
tpl a
tpl a
tpl a
inc a
tpl a
inc a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
jmp +19
tpl a
tpl a
tpl a
tpl a
inc a
inc a
tpl a
inc a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
inc a
tpl a
tpl a
jio a, +8
inc b
jie a, +4
tpl a
inc a
jmp +2
hlf a
jmp -7`;