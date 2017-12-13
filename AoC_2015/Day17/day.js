function showDoneMessage(id, message, variable) {
	var newP = document.createElement("p");
	var newMsg = document.createTextNode(message + variable);
	newP.appendChild(newMsg);
	document.getElementById(id).after(newP);
}

function readlines(files) {
	return new Promise((resolve, reject) => {
		if (files && files[0])
		{
			var file = files[0];
			var reader = new FileReader();
			
			reader.onload = () => {
				resolve(reader.result.split("\r\n"));
			};
			
			reader.readAsText(file);
		}
	});
}

function buildJSON(entries, key, keys, values) {
	var obj = {}
	entries.map( (entry) => {
		obj[entry[key].replace(':','')] = {};
		keys.map( (k, i) => {
			obj[entry[key].replace(':','')][entry[k].replace(':','')] = parseInt(entry[values[i]], 10);
		});
	});
	
	return obj;
}

var permute = function(input) {
	var fn = function(input) {
		var i, ch;
		for (i = 0; i < input.length; i++) {
			ch = input.splice(i, 1)[0];
			usedChars.push(ch);
			if (input.length == 0) {
				permArr.push(usedChars.slice());
			}
			fn(input);
			input.splice(i, 0, ch);
			usedChars.pop();
		}
	}
	var permArr = [],
		usedChars = [];
	fn(input);
	return permArr
};

var combine = function(a, min) {
    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i = min; i < a.length; i++) {
        fn(i, a, [], all);
    }
    all.push(a);
    return all;
}

function func1(strs) {
	var cnts = combine(conts, 1);
	var combo = 0;
	
	cnts.map( (cnt) => {
		var vol = 0;
		cnt.map( (prt) => {
			vol += prt;
		});
		if (vol == liters)
		{
			combo++;
		}
	});
	
	return combo;
}

function func2(strs) {
	var cnts = combine(conts, 1);
	var combo = [];
	
	cnts.map( (cnt) => {
		var vol = 0;
		cnt.map( (prt) => {
			vol += prt;
		});
		if (vol == liters)
		{
			combo.push(cnt.length);
		}
	});
	
	var min = combo.reduce( (a, b) => b < a ? b : a);
	combo = combo.filter( cnt => cnt == min).length;
	
	return combo;
}

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

var liters = 150;
var conts = [
33,
14,
18,
20,
45,
35,
16,
35,
1 ,
13,
18,
13,
50,
44,
48,
6 ,
24,
41,
30,
42
	];
var input = ``;
window.onload = function() {
	var lines = input.split("\n").map( (line) => line.split(" "));
	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);
}