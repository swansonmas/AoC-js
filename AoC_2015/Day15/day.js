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

function buildCookies() {
	var cks = [];
	for (var i = 0; i < tsps + 1; i++)
	{
		for (var j = 0; j < tsps + 1; j++)
		{
			for (var k = 0; k < tsps + 1; k++)
			{
				for (var l = 0; l < tsps + 1; l++)
				{
					if ((i + j + k + l) == tsps)
					{
						var ck = [0,0,0,0];
						ck[3] = i;
						ck[2] = j;
						ck[1] = k;
						ck[0] = l;
						cks.push(ck);
					}
				}
			}
		}
	}
	
	return cks;
}

function buildToppings(topStrs) {
	var tps = [];
	topStrs.map( (line) => tps.push(
		[
		parseInt(line[2], 10), 
		parseInt(line[4], 10),
		parseInt(line[6], 10),
		parseInt(line[8], 10),
		parseInt(line[10], 10)
		]
		));
	
	return tps;
}

function func1(strs) {
	var cookies = buildCookies();
	var toppings = buildToppings(strs);
	
	var scores = cookies.map( (ck) => {
		var score = [0,0,0,0];
		toppings[0].map( (prop, i) => {
			if (i >= 4) { return; }
			ck.map( (tp, j) => {
				score[i] += (toppings[j][i] * tp);
			});
			if (score[i] < 0)
			{
				score[i] = 0;
			}
		});
		return score.reduce( (scr, tp) => scr *= tp);
	});
	
	return scores.reduce( (high, scr) => scr > high ? scr : high);
}

function func2(strs) {
	var cookies = buildCookies();
	var toppings = buildToppings(strs);
	
	var scores = cookies.map( (ck) => {
		var score = [0,0,0,0,0];
		toppings[0].map( (prop, i) => {
			ck.map( (tp, j) => {
				score[i] += (toppings[j][i] * tp);
			});
			if (score[i] < 0)
			{
				score[i] = 0;
			}
			else if (i == 4 && score[i] != cals)
			{
				score[i] = 0;
			}
		});
		return score.reduce( (scr, tp) => scr *= tp);
	});
	
	return scores.reduce( (high, scr) => scr > high ? scr : high) / cals;
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

var input = `Frosting: capacity 4, durability -2, flavor 0, texture 0, calories 5
Candy: capacity 0, durability 5, flavor -1, texture 0, calories 8
Butterscotch: capacity -1, durability 0, flavor 5, texture 0, calories 6
Sugar: capacity 0, durability 0, flavor -2, texture 2, calories 1`;
var tsps = 100;
var cals = 500;
window.onload = function() {
	var lines = input.split("\n").map( (line) => line.split(" "));

	var val1 = func1(lines);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(lines);
	showDoneMessage("input2", "Part 2: ", val2);

}