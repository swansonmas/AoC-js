function showDoneMessage(id, message, variable) {
	var newP = document.createElement("p");
	var newMsg = document.createTextNode(message + variable);
	newP.appendChild(newMsg);
	document.getElementById(id).after(newP);
}

function setLights(lights, c0, c1, val) {
	if (c1[0] < c0[0])
	{
		console.log("Corner 1: " + c0 + " Corner 2: " + c1);
	}
	else if (c1[1] < c0[1])
	{
		console.log("Corner 1: " + c0 + " Corner 2: " + c1);
	}
	for (var i = c0[0]; i <= c1[0]; i++)
	{
		for (var j = c0[1]; j <= c1[1]; j++)
		{
			if (val == -1)
			{
				lights[i][j] = (lights[i][j] == 0 ? 1 : 0);
			}
			else
			{
				lights[i][j] = val;
			}
		}
	}
}

function incrementLights(lights, c0, c1, val) {
	for (var i = c0[0]; i <= c1[0]; i++)
	{
		for (var j = c0[1]; j <= c1[1]; j++)
		{
			lights[i][j] += val;
			
			if (lights[i][j] < 0)
			{
				lights[i][j] = 0;
			}
		}
	}
}

function countLights(lights) {
	var litLights = 0;
	for (var i = 0; i < lights.length; i++)
	{
		for (var j = 0; j < lights[0].length; j++)
		{
			litLights += lights[i][j];
		}
	}
	
	return litLights;
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function day1(files) {
	var lights = createArray(1000, 1000);
	setLights(lights, [0,0], [999,999], 0);
	
	if (files && files[0])
	{
		var file = files[0];
		var reader = new FileReader();
		
		reader.onload = (function(f) {
			return function(e) {
				var strings = e.target.result.split("\r\n");
				var instrs = /([^0-9,]*)\s/;
				var coords = /\d+/g;
				
				for (var i = 0; i < strings.length; i++)
				{
					var instruction = instrs.exec(strings[i])[1];
					var coordinates = strings[i].match(coords);
					var coord1 = [parseInt(coordinates[0], 10), parseInt(coordinates[1], 10)];
					var coord2 = [parseInt(coordinates[2], 10), parseInt(coordinates[3], 10)];
					
					switch (instruction)
					{
						case "turn on":
							setLights(lights, coord1, coord2, 1);
							break;
						case "turn off":
							setLights(lights, coord1, coord2, 0);
							break;
						case "toggle":
							setLights(lights, coord1, coord2, -1);
							break;
						
						default:
							console.log("Bad Instruction!");
							break;
					}
				}
				
				showDoneMessage("input1", "Lit Lights: ", countLights(lights));
			};
		})(file);
		
		reader.readAsText(file);
	}
}

function day2(files) {
	var lights = createArray(1000, 1000);
	setLights(lights, [0,0], [999,999], 0);
	
	if (files && files[0])
	{
		var file = files[0];
		var reader = new FileReader();
		
		reader.onload = (function(f) {
			return function(e) {
				var strings = e.target.result.split("\r\n");
				var instrs = /([^0-9,]*)\s/;
				var coords = /\d+/g;
				
				for (var i = 0; i < strings.length; i++)
				{
					var instruction = instrs.exec(strings[i])[1];
					var coordinates = strings[i].match(coords);
					var coord1 = [parseInt(coordinates[0], 10), parseInt(coordinates[1], 10)];
					var coord2 = [parseInt(coordinates[2], 10), parseInt(coordinates[3], 10)];
					
					switch (instruction)
					{
						case "turn on":
							incrementLights(lights, coord1, coord2, 1);
							break;
						case "turn off":
							incrementLights(lights, coord1, coord2, -1);
							break;
						case "toggle":
							incrementLights(lights, coord1, coord2, 2);
							break;
						
						default:
							console.log("Bad Instruction!");
							break;
					}
				}
				
				showDoneMessage("input2", "Lights Brightness: ", countLights(lights));
			};
		})(file);
		
		reader.readAsText(file);
	}
}

window.onload = function() {
}