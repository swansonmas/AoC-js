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
	var happy = {};
	var guests = [];
	strs.map(function (line) {
		line = line.split(" ");
		if (happy.hasOwnProperty(line[0]))
		{
			happy[line[0]][line[10].slice(0,-1)] = parseInt(line[3], 10) * (line[2] == 'gain' ? 1 : -1);
		}
		else
		{
			guests.push(line[0]);
			happy[line[0]] = {};
			happy[line[0]][line[10].slice(0,-1)] = parseInt(line[3], 10) * (line[2] == 'gain' ? 1 : -1);
		}
	});
	
	var permGuests = permute(guests).map( (tbl) => {tbl.unshift(tbl[7]); tbl.push(tbl[1]); return tbl;});
	//permGuests = [permGuests[0]];
	var tables = permGuests.map(function (tbl) {
		var hpns = 0;
		var stHpns = tbl.map(function (seat, i, tbl) {
			if (i == 0 || i == 9) { return 0;}
			else
			{
				var hpyL = happy[seat][tbl[(i-1)]];
				var hpyR = happy[seat][tbl[(i+1)]]
				return  hpyL+hpyR;
			}
		});
		return stHpns.reduce( (a,b) => a + b);
	});
	
	return tables.reduce( (a,b) => (a > b ? a : b));
}

function func2(strs) {
	var happy = {};
	var guests = [];
	strs.map(function (line) {
		line = line.split(" ");
		if (happy.hasOwnProperty(line[0]))
		{
			happy[line[0]][line[10].slice(0,-1)] = parseInt(line[3], 10) * (line[2] == 'gain' ? 1 : -1);
		}
		else
		{
			guests.push(line[0]);
			happy[line[0]] = {};
			happy[line[0]][line[10].slice(0,-1)] = parseInt(line[3], 10) * (line[2] == 'gain' ? 1 : -1);
		}
	});
	guests.map( (guest) => happy[guest]["Mark"] = 0);
	happy["Mark"] = {};
	guests.map( (guest) => happy["Mark"][guest] = 0);
	guests.push("Mark");
	
	var permGuests = permute(guests).map( (tbl) => {
		tbl.unshift(tbl[tbl.length-1]);
		tbl.push(tbl[1]);
		return tbl
	});
	
	//permGuests = [permGuests[0]];
	var tables = permGuests.map(function (tbl) {
		var hpns = 0;
		var stHpns = tbl.map(function (seat, i, tbl) {
			if (i == 0 || i > (guests.length)) { return 0;}
			else
			{
				var hpyL = happy[seat][tbl[(i-1)]];
				var hpyR = happy[seat][tbl[(i+1)]]
				return  hpyL+hpyR;
			}
		});
		return stHpns.reduce( (a,b) => a + b);
	});
	
	return tables.reduce( (a,b) => (a > b ? a : b));
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
	/*
	var val1 = func1(input);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(val1);
	showDoneMessage("input2", "Part 2: ", val2);
	*/
}