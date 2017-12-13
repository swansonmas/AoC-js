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

function func1(strs) {
	var arrs = strs.map(function (str) {
		return str.split('\t').map(function (numstr) {
			return parseInt(numstr, 10);
		});
	});
	
	var diffs = arrs.map(function (arr) {
		var arrmin = arr.reduce(function (cur, min) {
			return Math.min(min, cur);
		});
		var arrmax = arr.reduce(function (cur, min) {
			return Math.max(min, cur);
		});
		return arrmax - arrmin;
	});
	
	return diffs.reduce(function (a, b) {
		return a + b;
	}, 0);
}

function func2(strs) {
	var arrs = strs.map(function (str) {
		return str.split('\t').map(function (numstr) {
			return parseInt(numstr, 10);
		});
	});
	
	var divs = arrs.map(function (arr, i) {
		return arr.map(function (elem, j, arr) {
			for (var k = 1; k < arr.length; k++)
			{
				if (arrs[i][j] % arrs[i][(j+k)%arr.length] == 0)
				{
					return arrs[i][j] / arrs[i][(j+k)%arr.length];
				}
			}
			return 0;
		});
	});
	
	return divs.reduce(function (a, b) {
		return a + b.reduce(function (a, b) {
			return a + b;
		}, 0);
	}, 0);
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

window.onload = function() {
	var input = "";
	
	//var val1 = func1(input);
	//showDoneMessage("input1", "Part 1: ", val1);
	
	//var val2 = func2(input);
	//showDoneMessage("input2", "Part 2: ", val2);
}