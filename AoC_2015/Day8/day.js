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

function calcLiteral(quotedStrings) {
	return quotedStrings.map(function(str) {
			return str.length;
		}).reduce(function (a,b) {
			return a + b;
		}, 0);
}

function calcStringMemory(string) {
	var hex = /\\x[\w\d]{2}/g;
	var esc = /\\[^x]/g;
	var strMemory = string;
	
	strMemory = strMemory.slice(1, -1); // ", "
	
	strMemory = strMemory.replace(esc, "E");
	
	strMemory = strMemory.replace(hex, "H");
	
	return strMemory.length;
}

function calcMemory(quotedStrings) {
	return quotedStrings.map(function(str) {
			return calcStringMemory(str);
		}).reduce(function (a,b) {
			return a + b;
		}, 0);
}

function calcStringEncode(string) {
	var hex = /\\x[\w\d]{2}/g;
	var esc = /\\[^x]/g;
	var strEncode = string;
	
	strEncode = strEncode.replace(esc, "EEEE");
	
	strEncode = strEncode.replace(hex, "HHHHH");
	
	strEncode = "\"\\\"" + strEncode.slice(1, -1) + "\\\"\""; // "\"..., ...\""
	
	return strEncode.length;
}

function calcEncode(quotedStrings) {
	return quotedStrings.map(function(str) {
			return calcStringEncode(str);
	}).reduce(function (a,b) {
		return a + b;
	}, 0);
}

function day1(files) {
	var read1 = readlines(files);
	read1.then(function (strings) {
		var literalSize = calcLiteral(strings);
		var memorySize = calcMemory(strings);
		
		showDoneMessage("input1", "Literal Overhead: ", literalSize - memorySize);
	});
}

function day2(files) {
	var read2 = readlines(files);
	read2.then(function (strings) {
		var literalSize = calcLiteral(strings);
		var encodeSize = calcEncode(strings);
		
		showDoneMessage("input2", "Encode Overhead: ", encodeSize - literalSize);
	});
}

window.onload = function() {
}