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

//0:32:13
function func1(strs) {
	var lines = input.split("\n").map( (line) => line.split(" "));
	
	var deers = {};
	lines.map(function (line) {
		deers[line[0]] = [
			parseInt(line[3],10),
			parseInt(line[6], 10),
			parseInt(line[13], 10),
			parseInt(line[6], 10)+parseInt(line[13], 10),
			parseInt(line[3], 10)*parseInt(line[6], 10)
			];
	});
	var dist = 0;
	for (var deer in deers) {
		if (deers.hasOwnProperty(deer))
		{
			var cycs = Math.floor(time / deers[deer][3]);
			var rem = time % deers[deer][3];
			var remd = 0;
			if (rem > deers[deer][1])
			{
				remd = deers[deer][4];
			}
			else
			{
				remd = deers[deer][0] * rem;
			}
			var dd = (cycs * deers[deer][4]) + remd;
			dist = dd > dist ? dd : dist;
		}
	}
	
	return dist;
}


function func2(strs) {
	var lines = input.split("\n").map( (line) => line.split(" "));
	
	var deers = {};
	lines.map(function (line) {
		deers[line[0]] = [
			parseInt(line[3],10),
			parseInt(line[6], 10),
			parseInt(line[13], 10),
			parseInt(line[6], 10)+parseInt(line[13], 10),
			parseInt(line[3], 10)*parseInt(line[6], 10),
			0,
			0
			];
	});
	
	for (var i = 0; i < time; i++)
	{
		var dist = 0;
		for (var deer in deers) {
			if (deers.hasOwnProperty(deer))
			{
				var cycs = Math.floor((i+1) / deers[deer][3]);
				var rem = (i+1) % deers[deer][3];
				var remd = 0;
				if (rem > deers[deer][1])
				{
					remd = deers[deer][4];
				}
				else
				{
					remd = deers[deer][0] * rem;
				}
				var dd = (cycs * deers[deer][4]) + remd;
				if (dd > dist)
				{
					dist = dd;
					deers[deer][5] = dd;
				}
			}
		}
		
		for (var deer in deers) {
			if (deers.hasOwnProperty(deer))
			{
				if (deers[deer][5] == dist)
				{
				deers[deer][6] = deers[deer][6] + 1;
				}
				
				deers[deer][5] = 0;
			}
		}
	}
	
	var maxP = 0;
	for (var deer in deers) {
		if (deers.hasOwnProperty(deer))
		{
			if (deers[deer][6] > maxP)
			{
				maxP = deers[deer][6];
			}
		}
	}
	
	return maxP;
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

var input = `Rudolph can fly 22 km/s for 8 seconds, but then must rest for 165 seconds.
Cupid can fly 8 km/s for 17 seconds, but then must rest for 114 seconds.
Prancer can fly 18 km/s for 6 seconds, but then must rest for 103 seconds.
Donner can fly 25 km/s for 6 seconds, but then must rest for 145 seconds.
Dasher can fly 11 km/s for 12 seconds, but then must rest for 125 seconds.
Comet can fly 21 km/s for 6 seconds, but then must rest for 121 seconds.
Blitzen can fly 18 km/s for 3 seconds, but then must rest for 50 seconds.
Vixen can fly 20 km/s for 4 seconds, but then must rest for 75 seconds.
Dancer can fly 7 km/s for 20 seconds, but then must rest for 119 seconds.`;
var time = 2503;
window.onload = function() {
	var val1 = func1(input);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(val1);
	showDoneMessage("input2", "Part 2: ", val2);
}