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

function swapPos(pass, x, y) {
	var tmp = pass[x];
	pass[x] = pass[y];
	pass[y] = tmp;
	return pass;
}

function swapLetter(pass, x, y) {
	var tmp = pass.join("").replace(x, '%');
	pass = tmp.replace(y, x);
	pass = pass.replace('%', y);
	return pass.split("");
}

function rotate(pass, right, x) {
	if (right) {
		var tmp = pass.slice(pass.length-x);
		pass = tmp.concat(pass.slice(0,pass.length-x));
	} else {
		var tmp = pass.slice(0,x);
		pass = pass.slice(x).concat(tmp);
	}
	return pass;
}

function rotatePos(pass, x) {
	var tmp = pass.indexOf(x);
	if (tmp >= 4) {
		pass = rotate(pass, true, 1+tmp+1);
	} else {
		pass = rotate(pass, true, 1+tmp);
	}
	return pass;
}

function rotatePosRev(pass, x) {
	var tmp = pass.indexOf(x);
	if (tmp == 0) {
		pass = rotate(pass, false, 1);
	} else {
		pass = rotate(pass, false, Math.floor(tmp/2)+1+(4*((tmp+1)%2)));
	}
	return pass;
}


function reverse(pass, x, y) {
	var xs = Array(Math.floor((y-x+1)/2)).fill(1).map( (_,i) => (x+i)%pass.length);
	var ys = Array(Math.floor((y-x+1)/2)).fill(1).map( (_,i) => (x+Math.ceil((y-x+1)/2)+i)%pass.length);
	xs.map( (_,i) => pass = swapPos(pass, xs[i], ys[ys.length-(i+1)]) );
	return pass;
}

function move(pass, x, y) {
	var tmp = pass.slice(0,x).concat(pass.slice(x+1));
	pass = tmp.slice(0,y).concat(pass.slice(x,x+1),tmp.slice(y));
	return pass;
}

function parseInst(inst, pass) {
	var cmd = inst[0];
	if (cmd == 'rotate') {
		if (inst[1] == 'left' || inst[1] == 'right') {
			pass = rotate(pass, inst[1] == 'right', parseInt(inst[2],10))
		} else {
			pass = rotatePos(pass, inst[6]);
		}
	} else if (cmd == 'move') {
		pass = move(pass, parseInt(inst[2],10), parseInt(inst[5], 10));
	} else if (cmd == 'swap') {
		if (inst[1] == 'position') {
			pass = swapPos(pass, parseInt(inst[2], 10), parseInt(inst[5], 10));
		} else {
			pass = swapLetter(pass, inst[2], inst[5]);
		}
	} else if (cmd == 'reverse') {
		pass = reverse(pass, parseInt(inst[2], 10), parseInt(inst[4], 10));
	} else {
		console.log('Bad inst!');
	}
	return pass;
}

function parseInstRev(inst, pass) {
	var cmd = inst[0];
	if (cmd == 'rotate') {
		if (inst[1] == 'left' || inst[1] == 'right') {
			pass = rotate(pass, inst[1] == 'left', parseInt(inst[2],10))
		} else {
			pass = rotatePosRev(pass, inst[6]);
		}
	} else if (cmd == 'move') {
		pass = move(pass, parseInt(inst[5], 10), parseInt(inst[2],10));
	} else if (cmd == 'swap') {
		if (inst[1] == 'position') {
			pass = swapPos(pass, parseInt(inst[2], 10), parseInt(inst[5], 10));
		} else {
			pass = swapLetter(pass, inst[2], inst[5]);
		}
	} else if (cmd == 'reverse') {
		pass = reverse(pass, parseInt(inst[2], 10), parseInt(inst[4], 10));
	} else {
		console.log('Bad inst!');
	}
	return pass;
}

//	1:01:33
function func1(strs) {
	strs = strs.map( (line) => line.split(" "));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	console.assert(swapPos('abcde'.split(""),4,0).join("") == 'ebcda',"Swap Pos fails!");
	console.assert(swapLetter('ebcda'.split(""),'d','b').join("") == 'edcba',"Swap Let fails!");
	console.assert(reverse('edcba'.split(""),0,4).join("") == 'abcde',"Reverse fails!");
	console.assert(rotate('abcde'.split(""),false,1).join("") == 'bcdea',"Rotate fails!");
	console.assert(move('bcdea'.split(""),1,4).join("") == 'bdeac',"Move fails!");
	console.assert(move('bdeac'.split(""),3,0).join("") == 'abdec',"Move fails!");
	console.assert(rotatePos('abdec'.split(""),'b').join("") == 'ecabd',"Reverse fails!");
	console.assert(rotatePos('ecabd'.split(""),'d').join("") == 'decab',"Reverse fails!");
	
	var pass = `abcdefgh`.split("");
	strs.map( str => pass = parseInst(str, pass) );
	
	return pass.join("");
}

//	2:00:00
function func2(strs) {
	strs = strs.map( (line) => line.split(" "));//.match(/\w+|\d+/g).map( wrd => wrd));//parseInt(line, 10));//
	console.log(strs);
	
	console.assert(rotatePosRev('decab'.split(""),'d').join("") == 'ecabd',"Reverse fails!");
	console.assert(rotatePosRev('ecabd'.split(""),'b').join("") == 'abdec',"Reverse fails!");
	console.assert(move('abdec'.split(""),0,3).join("") == 'bdeac',"Move fails!");
	console.assert(move('bdeac'.split(""),4,1).join("") == 'bcdea',"Move fails!");
	console.assert(rotate('bcdea'.split(""),true,1).join("") == 'abcde',"Rotate fails!");
	console.assert(reverse('abcde'.split(""),0,4).join("") == 'edcba',"Reverse fails!");
	console.assert(swapLetter('edcba'.split(""),'b','d').join("") == 'ebcda',"Swap Let fails!");
	console.assert(swapPos('ebcda'.split(""),0,4).join("") == 'abcde',"Swap Pos fails!");
	
	var pass = `fbgdceah`.split("");
	strs = strs.reverse();
	strs.map( str => pass = parseInstRev(str, pass) );
	
	return pass.join("");
}

var input = `rotate based on position of letter d
move position 1 to position 6
swap position 3 with position 6
rotate based on position of letter c
swap position 0 with position 1
rotate right 5 steps
rotate left 3 steps
rotate based on position of letter b
swap position 0 with position 2
rotate based on position of letter g
rotate left 0 steps
reverse positions 0 through 3
rotate based on position of letter a
rotate based on position of letter h
rotate based on position of letter a
rotate based on position of letter g
rotate left 5 steps
move position 3 to position 7
rotate right 5 steps
rotate based on position of letter f
rotate right 7 steps
rotate based on position of letter a
rotate right 6 steps
rotate based on position of letter a
swap letter c with letter f
reverse positions 2 through 6
rotate left 1 step
reverse positions 3 through 5
rotate based on position of letter f
swap position 6 with position 5
swap letter h with letter e
move position 1 to position 3
swap letter c with letter h
reverse positions 4 through 7
swap letter f with letter h
rotate based on position of letter f
rotate based on position of letter g
reverse positions 3 through 4
rotate left 7 steps
swap letter h with letter a
rotate based on position of letter e
rotate based on position of letter f
rotate based on position of letter g
move position 5 to position 0
rotate based on position of letter c
reverse positions 3 through 6
rotate right 4 steps
move position 1 to position 2
reverse positions 3 through 6
swap letter g with letter a
rotate based on position of letter d
rotate based on position of letter a
swap position 0 with position 7
rotate left 7 steps
rotate right 2 steps
rotate right 6 steps
rotate based on position of letter b
rotate right 2 steps
swap position 7 with position 4
rotate left 4 steps
rotate left 3 steps
swap position 2 with position 7
move position 5 to position 4
rotate right 3 steps
rotate based on position of letter g
move position 1 to position 2
swap position 7 with position 0
move position 4 to position 6
move position 3 to position 0
rotate based on position of letter f
swap letter g with letter d
swap position 1 with position 5
reverse positions 0 through 2
swap position 7 with position 3
rotate based on position of letter g
swap letter c with letter a
rotate based on position of letter g
reverse positions 3 through 5
move position 6 to position 3
swap letter b with letter e
reverse positions 5 through 6
move position 6 to position 7
swap letter a with letter e
swap position 6 with position 2
move position 4 to position 5
rotate left 5 steps
swap letter a with letter d
swap letter e with letter g
swap position 3 with position 7
reverse positions 0 through 5
swap position 5 with position 7
swap position 1 with position 7
swap position 1 with position 7
rotate right 7 steps
swap letter f with letter a
reverse positions 0 through 7
rotate based on position of letter d
reverse positions 2 through 4
swap position 7 with position 1
swap letter a with letter h`;