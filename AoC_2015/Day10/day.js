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

function arrlas(arr) {
	var idx = 0;
	var nxtidx = 0;
	var cnt = 0;
	var lasarr = [];
	nxtidx = arr.findIndex(function (elem, eidx) { return (elem !== arr[idx]) && (eidx > idx) });
	while((nxtidx) < arr.length)
	{
		cnt = nxtidx - idx;
		lasarr.push(cnt, arr[idx]);
		idx = nxtidx;
		while(arr[nxtidx] == arr[idx])
		{
			nxtidx++;
		}
	}
	lasarr.push(arr.length - idx, arr[idx]);
	
	return lasarr;
}

function lasRepeat(strs, cnt) {
	var strsarr = strs.split("").map(function (chr) { return parseInt(chr, 10)});
	
	for (var i = 0; i < cnt; i++)
	{
		strsarr = arrlas(strsarr);
		console.log(i);
	}
	
	return strsarr.length;
}

function func1(strs) {
	return lasRepeat(strs, 40);
}

function func2(strs) {
	return lasRepeat(strs, 50);
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
	var input = "1113222113";
	
	var val1 = func1(input);
	showDoneMessage("input1", "Part 1: ", val1);
	
	var val2 = func2(input);
	showDoneMessage("input2", "Part 2: ", val2);
}