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
	var sqr = Math.ceil(Math.sqrt(input));
	sqr += (sqr % 2 == 0 ? 1 : 0);
	var diff = (sqr*sqr) - input;
	var sides = Math.floor(diff / (sqr - 1));
	var rem = diff - (sides * (sqr - 1));
	var spaces = (sqr - 1) - rem;
	return spaces;
}

function func2(strs) {
	return "Excel";
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

var input = 289326;
window.onload = function() {
	//var lines = input.split("\n").map( (line) => line.split(" "));
	var val1 = func1(input);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(input);
	showDoneMessage("input2", "Part 2: ", val2);
	/*
	*/
}