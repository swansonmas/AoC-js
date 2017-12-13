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

function countRepeats(strings) {
	var numbers = strings[0].split("");
	numbers = numbers.map(function (num) {
		return parseInt(num, 10);
	});
	
	var sum = 0;
	for(var i = 0; i < numbers.length-1; i++)
	{
		if (numbers[i] == numbers[i+1])
		{
			sum += numbers[i];
		}
	}
	if (numbers[numbers.length - 1] == numbers[0])
	{
		sum += numbers[0]
	}
	
	return sum;
}

function countRepeatsHalfway(strings) {
	var numbers = strings[0].split("");
	numbers = numbers.map(function (num) {
		return parseInt(num, 10);
	});
	var length = numbers.length;
	
	var sum = 0;
	for(var i = 0; i < numbers.length; i++)
	{
		var halfindex = (i + (length/2)) % length;
		if (numbers[i] == numbers[halfindex])
		{
			sum += numbers[i];
		}
	}
	
	return sum;
}

function part1(files) {
	var read1 = readlines(files);
	read1.then(function (strings) {
		var count = countRepeats(strings);
		
		showDoneMessage("input1", "Part 1: ", count);
	});
}

function part2(files) {
	var read2 = readlines(files);
	read2.then(function (strings) {
		var count2 = countRepeatsHalfway(strings);
		
		showDoneMessage("input2", "Part 2: ", count2);
	});
}

window.onload = function() {
}