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

var permArr = [],
	usedChars = [];
function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};

function func1(strs) {
	var citRts = {};
	var cities = [];
	
	strs.map(function (str) {
		var sbs = str.split(" ");
		if (!(sbs[0] in citRts))
		{
			citRts[sbs[0]] = {};
		}
		citRts[sbs[0]][sbs[2]] = parseInt(sbs[4], 10);
		if (!(sbs[2] in citRts))
		{
			citRts[sbs[2]] = {};
		}
		citRts[sbs[2]][sbs[0]] = parseInt(sbs[4], 10);
	});
	
	for (var city in citRts)
	{
		cities.push(city)
	}
	
	var routes = permute(cities);
	
	var dists = routes.map(function (rte, n, rts) {
		return rte.map(function (cty, i ,cts) {
			if (i == cts.length - 1)
			{
				return 0;
			}
			else
			{
				var origCity = citRts[cty];
				var rtDist = origCity[cts[i+1]];
				return citRts[cty][cts[i+1]];
			}
		}).reduce(function (a, b) {
			return a + b;
		}, 0)
	});
	
	var mindist = dists.reduce(function (a, b) {
			return (a < b ? a : b);
	});
	
	return mindist;
}

function func2(strs) {
	var citRts = {};
	var cities = [];
	
	strs.map(function (str) {
		var sbs = str.split(" ");
		if (!(sbs[0] in citRts))
		{
			citRts[sbs[0]] = {};
		}
		citRts[sbs[0]][sbs[2]] = parseInt(sbs[4], 10);
		if (!(sbs[2] in citRts))
		{
			citRts[sbs[2]] = {};
		}
		citRts[sbs[2]][sbs[0]] = parseInt(sbs[4], 10);
	});
	
	for (var city in citRts)
	{
		cities.push(city)
	}
	
	var routes = permute(cities);
	
	var dists = routes.map(function (rte, n, rts) {
		return rte.map(function (cty, i ,cts) {
			if (i == cts.length - 1)
			{
				return 0;
			}
			else
			{
				var origCity = citRts[cty];
				var rtDist = origCity[cts[i+1]];
				return citRts[cty][cts[i+1]];
			}
		}).reduce(function (a, b) {
			return a + b;
		}, 0)
	});
	
	var mindist = dists.reduce(function (a, b) {
			return (a > b ? a : b);
	});
	
	return mindist;
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
}