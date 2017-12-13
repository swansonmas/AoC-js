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

var alpha = "abcdefghijklmnopqrstuvwxyz".split("");
var aLen = alpha.length;
var badA = [alpha.indexOf("i"), alpha.indexOf("o"), alpha.indexOf("l")]

function toNum(strArr) {
	return strArr.map(function (ltr)
	{
		return alpha.indexOf(ltr);
	});
}

function incrementPass(old) {
	var inc = [(old.pop(1) + 1) % aLen];
	var add = (inc == 0);
	var again = false;

	while(old.length > 0)
	{
		inc.unshift((old.pop(1) + (add ? 1 : 0)) % aLen);
		if (badA.includes(inc[0]))
		{
			inc[0] = (inc[0] + 1) % aLen;
			inc.fill(0, 1);
		}
		
		if (add && !(inc[0] == 0))
		{
			add = false;
		}
	}
		
	return inc;
}

function checkPass(nextPass) {
	var three = 0;
	var pairs = [];
	
	for (var i = 0; i < nextPass.length; i++)
	{
		if ((i > 5) && (pairs == 0) && (three == 0))
		{
			break;
		}
		
		if (nextPass[i] == nextPass[i+1])
		{
			if (!pairs.includes(nextPass[i]))
			{
				pairs.push(nextPass[i]);
			}
		}
		
		if (i < (nextPass.length - 2))
		{
			if ((nextPass[i] + 1 == nextPass[i+1]) && (nextPass[i+1] + 1 == nextPass[i+2]))
			{
				three++;
			}
		}
	}
	
	if ((three >= 1) && (pairs.length >= 2))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function nextPass(strs) {
	
	var nextPass = toNum(strs.split(""));
	var passFound = false;
	
	while(!passFound)
	{		
		nextPass = incrementPass(nextPass);
		
		passFound = checkPass(nextPass);
	}
	
	var psStrs = nextPass.map(function (ltr)
	{
		return alpha[ltr];
	}).join("");

	return psStrs;
}

function func1(strs) {
	return nextPass(strs);
}

function func2(strs) {
	return nextPass(strs);
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
	var input = "cqjxjnds";
	
	var val1 = func1(input);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(val1);
	showDoneMessage("input2", "Part 2: ", val2);
}